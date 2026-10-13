/**
 * Gothwad Portal Worker — AI search for gothwadtech.com.
 *
 * Why this exists: the OpenRouter API key must never reach the browser. The
 * portal (a static Cloudflare Pages app) POSTs the query here, this Worker
 * calls OpenRouter, and only the answer + cited sources come back.
 *
 * Endpoints:
 *   POST /api/search   { q }  -> { query, answer, sources[], cached, model }
 *   GET  /api/health         -> { ok, configured }
 */

interface Env {
  SEARCH_CACHE: KVNamespace;
  OPENROUTER_API_KEY: string;
  ROOT_DOMAIN: string;
  ALLOWED_ORIGINS: string;
  SEARCH_MODEL: string;
  SEARCH_MAX_RESULTS: string;
  CACHE_TTL_SECONDS: string;
  DAILY_QUERY_LIMIT: string;
  SEARCH_MODE: string;
}

interface SearchSource {
  title: string;
  url: string;
  snippet?: string;
}

interface SearchResponse {
  query: string;
  answer: string;
  sources: SearchSource[];
  cached?: boolean;
  model?: string;
}

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

const SYSTEM_PROMPT = [
  'You are the answer engine for Gothwad Search.',
  'Answer the question in 2-4 short paragraphs. Be factual, direct and current.',
  'Reference sources inline with [1], [2] and so on, matching the web results you were given.',
  'If the web results do not contain the answer, say so plainly instead of guessing.',
  'Never invent URLs, statistics, quotes or dates.',
].join(' ');

const json = (body: unknown, status = 200, headers: HeadersInit = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...headers },
  });

/** Only the portal (and any explicitly allowed origins) may call this API. */
function corsHeaders(req: Request, env: Env): HeadersInit {
  const origin = req.headers.get('Origin') || '';
  const allowed = new Set(
    [
      `https://${env.ROOT_DOMAIN}`,
      `https://www.${env.ROOT_DOMAIN}`,
      ...(env.ALLOWED_ORIGINS || '')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
    ].filter(Boolean),
  );
  // Allow same-origin Workers/Pages preview traffic with no Origin header.
  const allowOrigin = allowed.has(origin) ? origin : `https://${env.ROOT_DOMAIN}`;
  return {
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    Vary: 'Origin',
  };
}

function normalizeQuery(q: string): string {
  return q.trim().toLowerCase().replace(/\s+/g, ' ').slice(0, 300);
}

const utcDay = () => new Date().toISOString().slice(0, 10);

/** Very small per-IP daily budget. Web search is billed, free models or not. */
async function withinDailyLimit(req: Request, env: Env): Promise<boolean> {
  const limit = Number(env.DAILY_QUERY_LIMIT || 0);
  if (!limit) return true;

  const ip = req.headers.get('CF-Connecting-IP') || 'unknown';
  const key = `rl:${ip}:${utcDay()}`;
  const used = Number((await env.SEARCH_CACHE.get(key)) || '0');
  if (used >= limit) return false;

  await env.SEARCH_CACHE.put(key, String(used + 1), {
    expirationTtl: 60 * 60 * 24,
  });
  return true;
}

interface OpenRouterMessage {
  role: string;
  content: string;
  annotations?: Array<{
    type: string;
    url_citation?: {
      url?: string;
      title?: string;
      content?: string;
    };
  }>;
}

interface OpenRouterBody {
  choices?: Array<{ message?: OpenRouterMessage }>;
  model?: string;
  error?: { message?: string };
}

/** Pull the real, search-engine-supplied URLs out of the annotations. */
function extractSources(message: OpenRouterMessage): SearchSource[] {
  const seen = new Set<string>();
  const out: SearchSource[] = [];

  for (const ann of message.annotations || []) {
    const citation = ann?.url_citation;
    const url = citation?.url;
    if (!url || !/^https?:\/\//i.test(url)) continue;
    if (seen.has(url)) continue;
    seen.add(url);
    out.push({
      title: citation?.title?.trim() || new URL(url).hostname.replace(/^www\./, ''),
      url,
      snippet: citation?.content?.trim() || undefined,
    });
  }
  return out;
}

async function callOpenRouter(
  query: string,
  env: Env,
): Promise<{ answer: string; sources: SearchSource[]; model?: string }> {
  const maxResults = Number(env.SEARCH_MAX_RESULTS || 10);
  const useServerTool = (env.SEARCH_MODE || 'online') === 'server_tool';
  const baseModel = (env.SEARCH_MODEL || 'openai/gpt-oss-20b:free').replace(
    /:online$/,
    '',
  );

  const body: Record<string, unknown> = {
    // ":online" is the documented shortcut that activates the web plugin and
    // works with :free models. The newer approach is the server tool below.
    model: useServerTool ? baseModel : `${baseModel}:online`,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: query },
    ],
    max_tokens: 900,
  };

  if (useServerTool) {
    body.tools = [{ type: 'openrouter:web_search' }];
  } else {
    body.plugins = [{ id: 'web', max_results: maxResults }];
  }

  const res = await fetch(OPENROUTER_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': `https://${env.ROOT_DOMAIN}`,
      'X-Title': 'Gothwad Search',
    },
    body: JSON.stringify(body),
  });

  const data = (await res.json().catch(() => null)) as OpenRouterBody | null;

  if (!res.ok) {
    const msg = data?.error?.message || `OpenRouter returned ${res.status}`;
    throw Object.assign(new Error(msg), { status: res.status === 429 ? 429 : 502 });
  }

  const message = data?.choices?.[0]?.message;
  if (!message?.content) throw new Error('Empty response from OpenRouter.');

  return {
    answer: message.content.trim(),
    sources: extractSources(message).slice(0, maxResults),
    model: data?.model,
  };
}

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const cors = corsHeaders(req, env);
    const url = new URL(req.url);

    if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });

    if (url.pathname === '/api/health') {
      return json(
        { ok: true, configured: Boolean(env.OPENROUTER_API_KEY) },
        200,
        cors,
      );
    }

    if (url.pathname !== '/api/search') {
      return json({ error: 'Not found' }, 404, cors);
    }
    if (req.method !== 'POST') {
      return json({ error: 'Use POST' }, 405, cors);
    }
    if (!env.OPENROUTER_API_KEY) {
      return json(
        {
          error: 'Search is not configured: OPENROUTER_API_KEY is not set.',
          code: 'not_configured',
        },
        503,
        cors,
      );
    }

    let payload: { q?: unknown };
    try {
      payload = await req.json();
    } catch {
      return json({ error: 'Invalid JSON body.' }, 400, cors);
    }

    const query = typeof payload.q === 'string' ? payload.q.trim() : '';
    if (!query) {
      return json({ error: 'Missing "q".', code: 'bad_request' }, 400, cors);
    }
    if (query.length > 300) {
      return json({ error: 'Query too long.', code: 'bad_request' }, 400, cors);
    }

    if (!(await withinDailyLimit(req, env))) {
      return json(
        {
          error: 'Daily search limit reached. Try again tomorrow.',
          code: 'rate_limited',
        },
        429,
        cors,
      );
    }

    // Cache first — a repeated query costs nothing.
    const cacheKey = `s:${normalizeQuery(query)}`;
    const ttl = Number(env.CACHE_TTL_SECONDS || 21600);
    const cached = await env.SEARCH_CACHE.get<SearchResponse>(cacheKey, 'json');
    if (cached) {
      return json({ ...cached, cached: true }, 200, cors);
    }

    try {
      const { answer, sources, model } = await callOpenRouter(query, env);
      const result: SearchResponse = { query, answer, sources, model };
      await env.SEARCH_CACHE.put(cacheKey, JSON.stringify(result), {
        expirationTtl: ttl,
      });
      return json(result, 200, cors);
    } catch (err) {
      const status = (err as { status?: number }).status;
      const code =
        status === 429 ? 'rate_limited' : status === 400 ? 'bad_request' : 'upstream_error';
      return json(
        { error: (err as Error).message || 'Search failed.', code },
        status && status >= 400 && status < 500 ? status : 502,
        cors,
      );
    }
  },
};

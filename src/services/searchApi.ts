import { SEARCH_API } from '../data/portalConfig';
import type { SearchResponse, SearchError } from '../types/search';

export class SearchApiError extends Error {
  code: SearchError['code'];
  constructor(message: string, code?: SearchError['code']) {
    super(message);
    this.name = 'SearchApiError';
    this.code = code;
  }
}

/**
 * Calls this repo's Cloudflare Worker, which holds the OpenRouter key.
 * The key is never exposed to the browser — that's the whole reason the
 * Worker exists.
 */
export async function runSearch(
  q: string,
  signal?: AbortSignal,
): Promise<SearchResponse> {
  let res: Response;
  try {
    res = await fetch(SEARCH_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ q }),
      signal,
    });
  } catch (err) {
    if ((err as Error)?.name === 'AbortError') throw err;
    throw new SearchApiError('Could not reach the search service.');
  }

  const body = (await res.json().catch(() => null)) as
    | (SearchResponse & SearchError)
    | null;

  if (!res.ok) {
    throw new SearchApiError(
      body?.error || `Search failed (${res.status}).`,
      body?.code,
    );
  }
  if (!body || !Array.isArray(body.sources)) {
    throw new SearchApiError('Unexpected response from the search service.');
  }

  return body as SearchResponse;
}

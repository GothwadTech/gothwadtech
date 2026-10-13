/** Shape of one cited web result returned by the search Worker. */
export interface SearchSource {
  title: string;
  url: string;
  snippet?: string;
}

/** Shape of `POST /api/search` — matches Worker/src/index.ts. */
export interface SearchResponse {
  query: string;
  /** The AI-written summary rendered above the links. */
  answer: string;
  /** Real URLs, taken from OpenRouter url_citation annotations. */
  sources: SearchSource[];
  /** True when the answer came from the KV cache (no search spend). */
  cached?: boolean;
  /** Which model answered, for debugging. */
  model?: string;
}

export interface SearchError {
  error: string;
  /** 'not_configured' = Worker has no OPENROUTER_API_KEY yet. */
  code?: 'not_configured' | 'rate_limited' | 'upstream_error' | 'bad_request';
}

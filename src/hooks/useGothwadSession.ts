import { useEffect, useState } from "react";
import { fetchGothwadSession, getCurrentAuthuser, type FetchMeResult } from "../lib/gothwadSso";

/**
 * Resolves the Gothwad Account session for the current page.
 * Starts as anonymous while loading — the navbar shows a skeleton until it settles.
 */
export function useGothwadSession() {
  const [data, setData] = useState<FetchMeResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      const result = await fetchGothwadSession(getCurrentAuthuser());
      if (cancelled) return;
      setData(result);
      setLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return {
    data,
    loading,
    authuser: data?.authuser ?? getCurrentAuthuser(),
    authenticated: data?.authenticated ?? false,
  };
}

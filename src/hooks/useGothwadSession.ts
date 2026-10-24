import { useEffect, useState, useCallback } from "react";
import { fetchGothwadSession, getCurrentAuthuser, type FetchMeResult } from "../lib/gothwadSso";
import { preloadGothwadAccountMenu } from "../lib/accountMenuWidget";

export function useGothwadSession() {
  const [data, setData] = useState<FetchMeResult | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const authuser = getCurrentAuthuser();
    setLoading(true);
    const res = await fetchGothwadSession(authuser);
    setData(res);
    setLoading(false);
    if (res.authenticated) preloadGothwadAccountMenu();
  }, []);

  useEffect(() => {
    void refresh();
    // preload widget even before auth resolves, so first click is 0ms
    preloadGothwadAccountMenu();
  }, [refresh]);

  return { data, loading, refresh, authuser: data?.authuser ?? getCurrentAuthuser(), authenticated: data?.authenticated ?? false };
}

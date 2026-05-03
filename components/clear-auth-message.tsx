"use client";

import { useEffect } from "react";

export function ClearAuthMessage({ clear }: { clear: boolean }) {
  useEffect(() => {
    if (!clear) return;

    const url = new URL(window.location.href);
    url.searchParams.delete("message");
    url.searchParams.delete("signup");
    window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
  }, [clear]);

  return null;
}

"use client";

import { createBrowserClient } from "@supabase/ssr";

export function createSupabaseBrowserClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    const missing = [
      !url ? "NEXT_PUBLIC_SUPABASE_URL" : null,
      !anonKey ? "NEXT_PUBLIC_SUPABASE_ANON_KEY" : null
    ].filter(Boolean);

    throw new Error(
      `Supabase is not configured. Missing ${missing.join(
        " and "
      )}. Add these values to the project environment, then restart the Next.js server.`
    );
  }

  return createBrowserClient(url, anonKey);
}

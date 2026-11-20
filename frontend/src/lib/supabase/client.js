import { createBrowserClient } from '@supabase/ssr';

let client;

/**
 * Supabase client for the browser (admin page, feedback form).
 * Keeps the admin's login session in cookies.
 */
export function getSupabaseBrowser() {
  if (!client) {
    client = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
    );
  }
  return client;
}

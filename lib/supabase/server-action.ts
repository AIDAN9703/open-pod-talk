import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getSupabasePublishableKey, getSupabaseUrl } from "./public-env";

/**
 * Use from **Server Actions only** (forms, `useActionState`, etc.).
 * Writes auth cookies without swallowing errors — required for
 * `signInWithPassword` so the session actually persists.
 *
 * Do **not** import from Server Components; use `createClient()` in `server.ts`
 * for those (read-heavy paths that may run where cookies are read-only).
 */
export async function createSupabaseServerActionClient() {
  const url = getSupabaseUrl();
  const key = getSupabasePublishableKey();
  if (!url || !key) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or a public key (NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY / NEXT_PUBLIC_SUPABASE_ANON_KEY)."
    );
  }

  const cookieStore = await cookies();

  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          cookieStore.set(name, value, options);
        });
      },
    },
  });
}

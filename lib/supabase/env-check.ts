import { getSupabasePublishableKey, getSupabaseUrl } from "./public-env";

/** Non-secret checks for debugging misconfigured .env.local */
export function getPublicSupabaseEnvIssues(): string[] {
  const issues: string[] = [];
  const url = getSupabaseUrl().trim();
  const key = getSupabasePublishableKey();

  if (!url) issues.push("NEXT_PUBLIC_SUPABASE_URL is missing or empty.");

  if (!key) {
    issues.push(
      "No Supabase browser key: set NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY."
    );
  } else if (!key.startsWith("eyJ") && !key.startsWith("sb_publishable_")) {
    issues.push(
      "Public key format looks unusual — expect a JWT starting with eyJ (anon) or sb_publishable_ from Supabase → Project Settings → API."
    );
  }

  return issues;
}
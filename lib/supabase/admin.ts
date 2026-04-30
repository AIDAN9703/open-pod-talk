import { createClient } from "@supabase/supabase-js";
import { getSupabaseUrl } from "./public-env";

// Service-role client — server only, never import in client components.
// Bypasses RLS for admin writes.
export function createAdminClient() {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set");
  }
  return createClient(
    getSupabaseUrl(),
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}

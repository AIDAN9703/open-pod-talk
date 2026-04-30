import { createClient } from "@/lib/supabase/server";
import { getSupabasePublishableKey, getSupabaseUrl } from "@/lib/supabase/public-env";

/** Public read: works for visitors (anon) when RLS allows SELECT. */
export async function getBroadcastLive(): Promise<boolean> {
  const url = getSupabaseUrl();
  const key = getSupabasePublishableKey();
  if (!url || !key) return false;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("broadcast_status")
      .select("is_live")
      .eq("id", 1)
      .maybeSingle();

    if (error) return false;
    return Boolean(data?.is_live);
  } catch {
    return false;
  }
}

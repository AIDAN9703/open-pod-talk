import { createClient } from "@/lib/supabase/server";
import { getSupabasePublishableKey, getSupabaseUrl } from "@/lib/supabase/public-env";

export type BroadcastStatus = {
  isLive: boolean;
  currentTopic: string | null;
};

/** Public read: works for visitors (anon) when RLS allows SELECT. */
export async function getBroadcastStatus(): Promise<BroadcastStatus> {
  const url = getSupabaseUrl();
  const key = getSupabasePublishableKey();
  if (!url || !key) return { isLive: false, currentTopic: null };

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("broadcast_status")
      .select("is_live, current_topic")
      .eq("id", 1)
      .maybeSingle();

    if (error) return { isLive: false, currentTopic: null };
    return {
      isLive: Boolean(data?.is_live),
      currentTopic: data?.current_topic?.trim() || null,
    };
  } catch {
    return { isLive: false, currentTopic: null };
  }
}

/** Public read: works for visitors (anon) when RLS allows SELECT. */
export async function getBroadcastLive(): Promise<boolean> {
  const status = await getBroadcastStatus();
  return status.isLive;
}

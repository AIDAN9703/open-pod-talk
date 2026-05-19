import { createClient } from "@/lib/supabase/server";
import { getSupabasePublishableKey, getSupabaseUrl } from "@/lib/supabase/public-env";

/** Public site-wide studio status set from admin dashboard. */
export type BroadcastShowState = "live" | "recording" | "off";

export type BroadcastStatus = {
  showState: BroadcastShowState;
  currentTopic: string | null;
  /** Livestream / streaming on YouTube (not in-studio-only recording mode). */
  isLiveStreaming: boolean;
};

const STATES = new Set<BroadcastShowState>(["live", "recording", "off"]);

function coerceState(value: unknown): BroadcastShowState {
  if (value === "live" || value === "recording" || value === "off") return value;
  return "off";
}

/** Public read: works for visitors (anon) when RLS allows SELECT. */
export async function getBroadcastStatus(): Promise<BroadcastStatus> {
  const url = getSupabaseUrl();
  const key = getSupabasePublishableKey();
  if (!url || !key) {
    return { showState: "off", currentTopic: null, isLiveStreaming: false };
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("broadcast_status")
      .select("broadcast_state, current_topic")
      .eq("id", 1)
      .maybeSingle();

    if (error) return { showState: "off", currentTopic: null, isLiveStreaming: false };

    let showState: BroadcastShowState = coerceState(data?.broadcast_state);

    if (!STATES.has(showState)) showState = "off";

    return {
      showState,
      currentTopic: data?.current_topic?.trim() || null,
      isLiveStreaming: showState === "live",
    };
  } catch {
    return { showState: "off", currentTopic: null, isLiveStreaming: false };
  }
}

/** @deprecated Prefer getBroadcastStatus().isLiveStreaming */
export async function getBroadcastLive(): Promise<boolean> {
  const status = await getBroadcastStatus();
  return status.isLiveStreaming;
}

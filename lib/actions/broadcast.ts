"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerActionClient } from "@/lib/supabase/server-action";

export async function setBroadcastLive(isLive: boolean) {
  let supabase: Awaited<ReturnType<typeof createSupabaseServerActionClient>>;
  try {
    supabase = await createSupabaseServerActionClient();
  } catch {
    return {
      ok: false as const,
      error: "Missing NEXT_PUBLIC_SUPABASE_URL or anon/publishable key in .env.local.",
    };
  }
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { ok: false as const, error: "Not signed in." };
  }

  const { error } = await supabase
    .from("broadcast_status")
    .update({
      is_live: isLive,
      updated_at: new Date().toISOString(),
    })
    .eq("id", 1);

  if (error) {
    return {
      ok: false as const,
      error:
        error.message.includes("does not exist") || error.code === "42P01"
          ? "Run the broadcast_status migration in Supabase (see supabase/migrations)."
          : error.message,
    };
  }

  revalidatePath("/", "layout");
  revalidatePath("/submit");
  revalidatePath("/admin");
  return { ok: true as const };
}

export async function setBroadcastTopic(topic: string) {
  let supabase: Awaited<ReturnType<typeof createSupabaseServerActionClient>>;
  try {
    supabase = await createSupabaseServerActionClient();
  } catch {
    return {
      ok: false as const,
      error: "Missing NEXT_PUBLIC_SUPABASE_URL or anon/publishable key in .env.local.",
    };
  }
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { ok: false as const, error: "Not signed in." };
  }

  const cleanedTopic = topic.trim().slice(0, 160);
  const { error } = await supabase
    .from("broadcast_status")
    .update({
      current_topic: cleanedTopic.length > 0 ? cleanedTopic : null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", 1);

  if (error) {
    return {
      ok: false as const,
      error:
        error.message.includes("does not exist") || error.code === "42P01"
          ? "Run the broadcast_status migrations in Supabase (see supabase/migrations)."
          : error.message,
    };
  }

  revalidatePath("/", "layout");
  revalidatePath("/submit");
  revalidatePath("/admin");
  return { ok: true as const };
}

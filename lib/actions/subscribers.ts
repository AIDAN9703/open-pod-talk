"use server";

import { Resend } from "resend";
import { createAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerActionClient } from "@/lib/supabase/server-action";

export type SubscribeState = { status: "idle" | "success" | "error"; message?: string };

export async function subscribeToRecordingNotice(
  _prev: SubscribeState,
  formData: FormData
): Promise<SubscribeState> {
  const raw = (formData.get("email") as string | null) ?? "";
  const email = raw.trim().toLowerCase();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  const supabase = createAdminClient();
  const { error } = await supabase.from("subscribers").insert({ email });

  if (error) {
    if (error.code === "23505") {
      return { status: "success" };
    }
    console.error("Subscribe insert error:", error);
    return { status: "error", message: "Something went wrong. Please try again." };
  }

  return { status: "success" };
}

export async function sendRecordingNotice(): Promise<{ ok: boolean; sent?: number; error?: string }> {
  const supabase = await createSupabaseServerActionClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Not signed in." };

  const adminClient = createAdminClient();
  const { data: subscribers, error: fetchError } = await adminClient
    .from("subscribers")
    .select("email, token")
    .is("unsubscribed_at", null);

  if (fetchError) return { ok: false, error: fetchError.message };
  if (!subscribers || subscribers.length === 0) {
    return { ok: false, error: "No active subscribers." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM || "Open Pod Talk <noreply@openpodtalk.com>";
  if (!apiKey) return { ok: false, error: "RESEND_API_KEY is not set." };

  const resend = new Resend(apiKey);
  const BATCH = 100;
  let sent = 0;

  for (let i = 0; i < subscribers.length; i += BATCH) {
    const chunk = subscribers.slice(i, i + BATCH);
    const { error } = await resend.batch.send(
      chunk.map(({ email, token }) => ({
        from,
        to: email,
        subject: "🎙️ Open Pod Talk — We're Recording Tonight!",
        html: buildRecordingEmail(token),
      }))
    );
    if (error) return { ok: false, error: error.message };
    sent += chunk.length;
  }

  return { ok: true, sent };
}

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://openpodtalk.com";

function buildRecordingEmail(token: string) {
  const unsubLink = `${SITE_URL}/api/unsubscribe?t=${token}`;
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#050505;font-family:system-ui,-apple-system,sans-serif;color:#fff">
  <div style="max-width:540px;margin:0 auto;padding:40px 24px">
    <p style="font-size:22px;font-weight:900;text-transform:uppercase;letter-spacing:.04em;margin:0 0 4px">
      Open Pod Talk
    </p>
    <p style="font-size:12px;color:#777;text-transform:uppercase;letter-spacing:.12em;margin:0 0 32px">
      All Views, Just Bring It!
    </p>
    <div style="background:#0d0d0d;border:1px solid #222;border-radius:16px;padding:32px 28px">
      <p style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#ff6600;margin:0 0 12px">
        🎙️ Recording Notice
      </p>
      <p style="font-size:22px;font-weight:800;color:#fff;margin:0 0 16px;line-height:1.25">
        We're recording tonight.
      </p>
      <p style="font-size:15px;color:#aaa;line-height:1.65;margin:0 0 28px">
        No scripts, no hand-picked guests — just real voices and real topics.
        Submit your story, debate, or hot take and you might be on air.
      </p>
      <a href="${SITE_URL}/submit"
         style="display:inline-block;background:#ff6600;color:#fff;font-weight:700;font-size:15px;padding:14px 28px;border-radius:100px;text-decoration:none">
        Put Me On Air →
      </a>
    </div>
    <p style="font-size:11px;color:#444;margin:28px 0 0;text-align:center;line-height:1.6">
      You signed up for recording notices at openpodtalk.com.<br>
      <a href="${unsubLink}" style="color:#666;text-decoration:underline">Unsubscribe</a>
    </p>
  </div>
</body>
</html>`;
}

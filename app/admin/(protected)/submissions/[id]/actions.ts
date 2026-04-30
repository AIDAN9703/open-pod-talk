"use server";

import { createSupabaseServerActionClient } from "@/lib/supabase/server-action";
import { createAdminClient } from "@/lib/supabase/admin";
import { Resend } from "resend";

export async function updateSubmission(
  id: string,
  updates: Partial<{
    status: string;
    host_notes: string;
    rating: number;
    riverside_link: string;
  }>
) {
  try {
    // Use regular auth client for writes — RLS allows authenticated admins to update
    const supabase = await createSupabaseServerActionClient();

    const patch: Record<string, unknown> = {
      ...updates,
      updated_at: new Date().toISOString(),
    };

    if (updates.status === "contacted") {
      patch.contacted_at = new Date().toISOString();
    }
    if (updates.status === "aired") {
      patch.aired_at = new Date().toISOString();
    }

    const { error } = await supabase
      .from("submissions")
      .update(patch)
      .eq("id", id);

    if (error) throw error;

    // If a Riverside link was saved, send invite email to the caller
    if (updates.riverside_link && updates.riverside_link.length > 0) {
      await sendRiversideInvite(id, updates.riverside_link);
    }

    return { error: null };
  } catch (err) {
    console.error("updateSubmission error", err);
    return { error: "Failed to save. Please try again." };
  }
}

async function sendRiversideInvite(submissionId: string, link: string) {
  if (!process.env.RESEND_API_KEY) return;

  const supabase = await createSupabaseServerActionClient();
  const { data: sub } = await supabase
    .from("submissions")
    .select("name, email, topic")
    .eq("id", submissionId)
    .single();

  if (!sub) return;

  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from: process.env.EMAIL_FROM ?? "noreply@openpodtalk.com",
    to: sub.email,
    subject: `You're invited to OpenPodTalk — studio link inside`,
    html: `
      <h2>You've been selected, ${sub.name}!</h2>
      <p>We'd love to have you on OpenPodTalk to talk about: <strong>${sub.topic}</strong></p>

      <h3>Your Riverside studio link</h3>
      <p><a href="${link}">${link}</a></p>

      <h3>Tech requirements (please read)</h3>
      <ul>
        <li><strong>Browser:</strong> Chrome or Edge on desktop/laptop only. No Firefox, Safari, mobile, or Brave.</li>
        <li><strong>Headphones:</strong> Wired headphones required. AirPods/Bluetooth will downgrade your mic quality and may cause echo.</li>
        <li><strong>Connection:</strong> Ethernet preferred. At least 10 Mbps upload.</li>
        <li><strong>Room:</strong> Quiet space — turn off HVAC and notifications.</li>
        <li><strong>Join early:</strong> Please join the lobby 10 minutes before your scheduled time for a soundcheck.</li>
      </ul>

      <p>We'll follow up shortly with your scheduled episode date and time.</p>
      <p>— The OpenPodTalk team</p>
    `,
  });
}

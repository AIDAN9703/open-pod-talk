"use server";

import { createClient } from "@/lib/supabase/server";

const ALLOWED_EMAILS = (process.env.HOST_EMAILS ?? "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

type State =
  | { status: "idle" }
  | { status: "sent"; email: string }
  | { status: "error"; message: string };

export async function sendMagicLink(_prev: State, formData: FormData): Promise<State> {
  const email = (formData.get("email") as string)?.toLowerCase().trim();
  if (!email) return { status: "error", message: "Email is required." };

  if (ALLOWED_EMAILS.length > 0 && !ALLOWED_EMAILS.includes(email)) {
    // Return "sent" even for disallowed emails to avoid enumeration
    return { status: "sent", email };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://openpodtalk.com"}/auth/callback`,
      },
    });
    if (error) throw error;
    return { status: "sent", email };
  } catch {
    return { status: "error", message: "Failed to send sign-in email. Please try again." };
  }
}

"use server";

import { headers } from "next/headers";
import { createHash } from "crypto";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";
import { checkRateLimit } from "@/lib/rate-limit";
import { verifyTurnstile } from "@/lib/turnstile";
import {
  sendSubmissionNotification,
  sendConfirmationEmail,
} from "@/lib/email";

const RELEASE_VERSION = "v1.0";

const schema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email(),
  phone: z.string().max(30).optional(),
  location: z.string().max(120).optional(),
  timezone: z.string().max(80).optional(),
  topic: z.string().min(3).max(200),
  topic_details: z.string().max(5000).optional(),
  source: z.string().max(200).optional(),
  instagram: z.string().max(120).optional(),
  twitter: z.string().max(120).optional(),
  tiktok: z.string().max(120).optional(),
  video_url: z.string().url("Must be a valid URL").max(500).optional().or(z.literal("")),
  age_confirmed: z.literal("on"),
  release_accepted: z.literal("on"),
  "cf-turnstile-response": z.string().min(1, "Please complete the CAPTCHA"),
  website: z.string().max(0).optional(), // honeypot — must be empty
});

export type FormState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string; errors?: Record<string, string[]> };

export async function submitCaller(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const userAgent = headersList.get("user-agent") ?? "";

  // Honeypot check — silently succeed so bots don't know they were caught
  if (formData.get("website")) {
    return { status: "success" };
  }

  // Rate limit
  const rl = await checkRateLimit(ip);
  if (!rl.success) {
    return {
      status: "error",
      message: "Too many submissions. Please try again in a few minutes.",
    };
  }

  // Parse and validate
  const raw = Object.fromEntries(formData.entries());
  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please fix the errors below.",
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const data = parsed.data;

  // Turnstile verification
  const turnstileOk = await verifyTurnstile(
    data["cf-turnstile-response"],
    ip
  );
  if (!turnstileOk) {
    return { status: "error", message: "CAPTCHA verification failed. Please try again." };
  }

  // Hash the IP (sha256 + salt) — never store raw IP
  const ipSalt = process.env.IP_HASH_SALT ?? "default-dev-salt";
  const ipHash = createHash("sha256").update(ip + ipSalt).digest("hex");

  const social_handles = {
    instagram: data.instagram ?? null,
    twitter: data.twitter ?? null,
    tiktok: data.tiktok ?? null,
  };

  try {
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return {
        status: "error",
        message:
          "Submissions are not configured yet. Add SUPABASE_SERVICE_ROLE_KEY to .env.local and restart the dev server.",
      };
    }

    const supabase = createAdminClient();
    const { error } = await supabase.from("submissions").insert({
      name: data.name,
      email: data.email,
      phone: data.phone ?? null,
      location: data.location ?? null,
      timezone: data.timezone ?? null,
      topic: data.topic,
      topic_details: data.topic_details ?? null,
      source: data.source ?? null,
      video_url: data.video_url || null,
      social_handles,
      ip_hash: ipHash,
      user_agent: userAgent,
      turnstile_ok: true,
      age_confirmed: true,
      release_version: RELEASE_VERSION,
      request_type: "stream",
    });

    if (error) throw error;

    await Promise.allSettled([
      sendSubmissionNotification({
        name: data.name,
        email: data.email,
        topic: data.topic,
        request_type: "stream",
      }),
      sendConfirmationEmail({
        to: data.email,
        name: data.name,
        topic: data.topic,
        request_type: "stream",
      }),
    ]);

    return { status: "success" };
  } catch (err) {
    console.error("submission error", err);
    return { status: "error", message: "Something went wrong. Please try again." };
  }
}

const inPersonSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().email(),
  phone: z
    .string()
    .trim()
    .min(7, "Add a phone number we can reach you at")
    .max(30),
  location: z.string().trim().min(1).max(120),
  topic: z.string().trim().min(3).max(200),
  availability: z
    .string()
    .trim()
    .min(10, "Tell us roughly when you're able to come in")
    .max(2500),
  logistics_notes: z.string().trim().max(2500).optional().or(z.literal("")),
  age_confirmed: z.literal("on"),
  release_accepted: z.literal("on"),
  "cf-turnstile-response": z.string().min(1, "Please complete the CAPTCHA"),
  website: z.string().max(0).optional(),
});

/** In-studio / in-person visitor request — separate intake from remote callers */
export async function submitInPerson(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const userAgent = headersList.get("user-agent") ?? "";

  if (formData.get("website")) {
    return { status: "success" };
  }

  const rl = await checkRateLimit(ip);
  if (!rl.success) {
    return {
      status: "error",
      message: "Too many submissions. Please try again in a few minutes.",
    };
  }

  const raw = Object.fromEntries(formData.entries());
  const parsed = inPersonSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please fix the errors below.",
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const data = parsed.data;

  const turnstileOk = await verifyTurnstile(data["cf-turnstile-response"], ip);
  if (!turnstileOk) {
    return { status: "error", message: "CAPTCHA verification failed. Please try again." };
  }

  const ipSalt = process.env.IP_HASH_SALT ?? "default-dev-salt";
  const ipHash = createHash("sha256").update(ip + ipSalt).digest("hex");

  const logistics = data.logistics_notes?.trim();
  const topic_details = [
    `Availability:\n${data.availability}`,
    ...(logistics ? [`Studio / logistics:\n${logistics}`] : []),
  ].join("\n\n");

  try {
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return {
        status: "error",
        message:
          "Submissions are not configured yet. Add SUPABASE_SERVICE_ROLE_KEY to .env.local and restart the dev server.",
      };
    }

    const supabase = createAdminClient();
    const { error } = await supabase.from("submissions").insert({
      name: data.name,
      email: data.email,
      phone: data.phone,
      location: data.location,
      timezone: null,
      topic: data.topic,
      topic_details,
      source: "marketing_in_person",
      video_url: null,
      social_handles: {},
      ip_hash: ipHash,
      user_agent: userAgent,
      turnstile_ok: true,
      age_confirmed: true,
      release_version: RELEASE_VERSION,
      request_type: "in_person",
    });

    if (error) throw error;

    await Promise.allSettled([
      sendSubmissionNotification({
        name: data.name,
        email: data.email,
        topic: data.topic,
        request_type: "in_person",
      }),
      sendConfirmationEmail({
        to: data.email,
        name: data.name,
        topic: data.topic,
        request_type: "in_person",
      }),
    ]);

    return { status: "success" };
  } catch (err) {
    console.error("in-person submission error", err);
    return { status: "error", message: "Something went wrong. Please try again." };
  }
}

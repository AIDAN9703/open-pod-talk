"use client";

import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { submitCaller, type FormState } from "./actions";

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

const RELEASE_TEXT = `CALLER RELEASE AGREEMENT — v1.0

By submitting this form and appearing on OpenPodTalk, you grant OpenPodTalk and its hosts a perpetual, irrevocable, worldwide, royalty-free license to use, reproduce, edit, distribute, and create derivative works from your name, likeness, voice, and statements in all media now known or hereafter developed, including AI-assisted transcription and captioning. You waive any claim against OpenPodTalk arising from such use, except fabrication of statements you did not make. This agreement is governed by applicable law in the host's state of residence.`;

function TurnstileWidget() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!SITE_KEY || !ref.current) return;
    // Load Turnstile script if not already loaded
    if (!document.querySelector("#cf-turnstile-script")) {
      const script = document.createElement("script");
      script.id = "cf-turnstile-script";
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
  }, []);

  if (!SITE_KEY) {
    // Dev fallback — inject a dummy token so the form can be tested locally
    return <input type="hidden" name="cf-turnstile-response" value="dev-bypass" />;
  }

  return (
    <div
      ref={ref}
      className="cf-turnstile"
      data-sitekey={SITE_KEY}
      data-theme="dark"
    />
  );
}

const TIMEZONES = [
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "America/Phoenix",
  "America/Anchorage",
  "Pacific/Honolulu",
];

export function SubmissionForm() {
  const initial: FormState = { status: "idle" };
  const [state, action, pending] = useActionState(submitCaller, initial);

  useEffect(() => {
    if (state.status === "error") {
      toast.error(state.message);
    }
  }, [state]);

  if (state.status === "success") {
    return (
      <div className="px-4 py-16 text-center">
        <div className="mb-6 text-5xl drop-shadow-[0_0_20px_rgba(255,102,0,0.4)]">
          🎙️
        </div>
        <h2 className="mb-3 font-[family-name:var(--font-opt)] text-2xl font-bold text-white">
          You&apos;re in the queue!
        </h2>
        <p className="mx-auto max-w-md text-white/60">
          We received your submission. If selected, we&apos;ll reach out with a
          Riverside guest link at least 48 hours before the episode.
        </p>
        <p className="mt-4 text-sm text-white/35">
          Check your inbox for a confirmation email.
        </p>
      </div>
    );
  }

  const err = state.status === "error" ? state.errors ?? {} : {};

  return (
    <form action={action} className="space-y-8">
      {/* Basic info */}
      <section className="space-y-5">
        <h2 className="border-b border-white/10 pb-2 font-[family-name:var(--font-opt)] text-lg font-bold text-white">
          About you
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Full name *" error={err.name?.[0]}>
            <input name="name" required maxLength={120} className={input()} placeholder="Jane Smith" />
          </Field>
          <Field label="Email *" error={err.email?.[0]}>
            <input name="email" type="email" required className={input()} placeholder="jane@example.com" />
          </Field>
          <Field label="Phone (optional)" error={err.phone?.[0]}>
            <input name="phone" type="tel" maxLength={30} className={input()} placeholder="+1 555 000 0000" />
          </Field>
          <Field label="Location (city, state)" error={err.location?.[0]}>
            <input name="location" maxLength={120} className={input()} placeholder="Austin, TX" />
          </Field>
          <Field label="Your timezone" error={err.timezone?.[0]}>
            <select name="timezone" className={input()}>
              <option value="">Select…</option>
              {TIMEZONES.map((tz) => (
                <option key={tz} value={tz}>{tz.replace("_", " ")}</option>
              ))}
            </select>
          </Field>
          <Field label="How did you hear about us?" error={err.source?.[0]}>
            <input name="source" maxLength={200} className={input()} placeholder="YouTube, friend, etc." />
          </Field>
        </div>
      </section>

      {/* Social handles */}
      <section className="space-y-5">
        <h2 className="border-b border-white/10 pb-2 font-[family-name:var(--font-opt)] text-lg font-bold text-white">
          Social handles (optional)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <Field label="Instagram" error={err.instagram?.[0]}>
            <input name="instagram" maxLength={120} className={input()} placeholder="@yourhandle" />
          </Field>
          <Field label="X / Twitter" error={err.twitter?.[0]}>
            <input name="twitter" maxLength={120} className={input()} placeholder="@yourhandle" />
          </Field>
          <Field label="TikTok" error={err.tiktok?.[0]}>
            <input name="tiktok" maxLength={120} className={input()} placeholder="@yourhandle" />
          </Field>
        </div>
      </section>

      {/* Topic */}
      <section className="space-y-5">
        <h2 className="border-b border-white/10 pb-2 font-[family-name:var(--font-opt)] text-lg font-bold text-white">
          Your topic
        </h2>
        <Field label="Topic headline *" error={err.topic?.[0]}>
          <input
            name="topic"
            required
            minLength={3}
            maxLength={200}
            className={input()}
            placeholder="One sentence: what do you want to talk about?"
          />
        </Field>
        <Field label="Tell us more (optional)" error={err.topic_details?.[0]}>
          <textarea
            name="topic_details"
            maxLength={5000}
            rows={5}
            className={input("resize-none")}
            placeholder="Background, relevant experience, what you hope listeners take away…"
          />
        </Field>
      </section>

      {/* Release and consent */}
      <section className="space-y-5">
        <h2 className="border-b border-white/10 pb-2 font-[family-name:var(--font-opt)] text-lg font-bold text-white">
          Legal & consent
        </h2>

        <div className="max-h-40 overflow-y-auto rounded-lg border border-white/10 bg-black/40 p-4 font-mono text-xs whitespace-pre-wrap text-white/55">
          {RELEASE_TEXT}
        </div>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="release_accepted"
            required
            className="mt-1 h-4 w-4 rounded border-white/25 accent-[#ff6600]"
          />
          <span className="text-sm text-white/75">
            I have read and agree to the Caller Release Agreement above.
          </span>
        </label>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="age_confirmed"
            required
            className="mt-1 h-4 w-4 rounded border-white/25 accent-[#ff6600]"
          />
          <span className="text-sm text-white/75">
            I confirm I am 18 years of age or older.
          </span>
        </label>
      </section>

      {/* Honeypot — hidden from humans via CSS */}
      <div className="hidden" aria-hidden>
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {/* Turnstile */}
      <TurnstileWidget />

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-[#ff6600] px-8 py-3.5 font-[family-name:var(--font-opt)] font-bold text-white shadow-[0_0_24px_rgba(255,102,0,0.35)] transition hover:bg-[#ff781a] disabled:opacity-60 sm:w-auto"
      >
        {pending ? "Submitting…" : "Submit my topic →"}
      </button>
    </form>
  );
}

function Field({
  label,
  children,
  error,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-white/80">{label}</label>
      {children}
      {error && <p className="text-xs text-[#ff8566]">{error}</p>}
    </div>
  );
}

function input(extra?: string) {
  return [
    "block w-full rounded-lg border border-white/15 bg-[#050505] px-3 py-2.5 text-sm text-white shadow-inner",
    "placeholder:text-white/35 focus:border-[#ff6600]/50 focus:outline-none focus:ring-2 focus:ring-[#ff6600]/40 focus:ring-offset-0 focus:ring-offset-transparent",
    extra,
  ]
    .filter(Boolean)
    .join(" ");
}

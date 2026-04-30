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
      data-theme="light"
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
      <div className="text-center py-16 px-4">
        <div className="text-5xl mb-6">🎙️</div>
        <h2 className="text-2xl font-bold text-slate-900 mb-3">
          You&apos;re in the queue!
        </h2>
        <p className="text-slate-600 max-w-md mx-auto">
          We received your submission. If selected, we&apos;ll reach out with a
          Riverside guest link at least 48 hours before the episode.
        </p>
        <p className="mt-4 text-sm text-slate-400">
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
        <h2 className="text-lg font-semibold text-slate-900 border-b pb-2">About you</h2>

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
        <h2 className="text-lg font-semibold text-slate-900 border-b pb-2">Social handles (optional)</h2>
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
        <h2 className="text-lg font-semibold text-slate-900 border-b pb-2">Your topic</h2>
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
        <h2 className="text-lg font-semibold text-slate-900 border-b pb-2">Legal & consent</h2>

        <div className="rounded-lg bg-slate-50 border border-slate-200 p-4 text-xs text-slate-600 font-mono whitespace-pre-wrap max-h-40 overflow-y-auto">
          {RELEASE_TEXT}
        </div>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="release_accepted"
            required
            className="mt-1 h-4 w-4 rounded border-slate-300 accent-red-600"
          />
          <span className="text-sm text-slate-700">
            I have read and agree to the Caller Release Agreement above.
          </span>
        </label>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="age_confirmed"
            required
            className="mt-1 h-4 w-4 rounded border-slate-300 accent-red-600"
          />
          <span className="text-sm text-slate-700">
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
        className="w-full sm:w-auto px-8 py-3 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 disabled:opacity-60 transition-colors"
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
      <label className="text-sm font-medium text-slate-700">{label}</label>
      {children}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}

function input(extra?: string) {
  return [
    "block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm",
    "placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent",
    extra,
  ]
    .filter(Boolean)
    .join(" ");
}

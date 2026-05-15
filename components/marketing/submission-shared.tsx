"use client";

import { useEffect, useRef, type ReactNode } from "react";

export const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

export const RELEASE_TEXT = `CALLER RELEASE AGREEMENT — v1.0

By submitting this form and appearing on OpenPodTalk, you grant OpenPodTalk and its hosts a perpetual, irrevocable, worldwide, royalty-free license to use, reproduce, edit, distribute, and create derivative works from your name, likeness, voice, and statements in all media now known or hereafter developed, including AI-assisted transcription and captioning. You waive any claim against OpenPodTalk arising from such use, except fabrication of statements you did not make. This agreement is governed by applicable law in the host's state of residence.`;

export function TurnstileWidget() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!SITE_KEY || !ref.current) return;
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
    return <input type="hidden" name="cf-turnstile-response" value="dev-bypass" />;
  }

  return (
    <div ref={ref} className="cf-turnstile" data-sitekey={SITE_KEY} data-theme="dark" />
  );
}

/** `text-base` avoids iOS Safari auto-zoom-on-focus on inputs (<16px). */
export function submissionInputClass(extra?: string) {
  return [
    "block w-full rounded-lg border border-white/15 bg-[#050505] px-3 py-2.5 text-base text-white",
    "placeholder:text-white/35 focus:border-[#ff6600]/50 focus:outline-none focus:ring-2 focus:ring-[#ff6600]/40",
    extra,
  ]
    .filter(Boolean)
    .join(" ");
}

export function SubmissionField({
  label,
  children,
  error,
}: {
  label: string;
  children: ReactNode;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-white/75">{label}</label>
      {children}
      {error && <p className="text-xs text-[#ff8566]">{error}</p>}
    </div>
  );
}

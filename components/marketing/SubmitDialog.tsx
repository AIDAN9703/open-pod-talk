"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { submitCaller, type FormState } from "@/app/(marketing)/submit/actions";
import { CITIES } from "@/lib/cities";

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

const RELEASE_TEXT = `CALLER RELEASE AGREEMENT — v1.0

By submitting this form and appearing on OpenPodTalk, you grant OpenPodTalk and its hosts a perpetual, irrevocable, worldwide, royalty-free license to use, reproduce, edit, distribute, and create derivative works from your name, likeness, voice, and statements in all media now known or hereafter developed, including AI-assisted transcription and captioning. You waive any claim against OpenPodTalk arising from such use, except fabrication of statements you did not make. This agreement is governed by applicable law in the host's state of residence.`;

function TurnstileWidget() {
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

function inp(extra?: string) {
  return [
    "block w-full rounded-lg border border-white/15 bg-[#050505] px-3 py-2.5 text-sm text-white",
    "placeholder:text-white/35 focus:border-[#ff6600]/50 focus:outline-none focus:ring-2 focus:ring-[#ff6600]/40",
    extra,
  ]
    .filter(Boolean)
    .join(" ");
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
      <label className="text-sm font-medium text-white/75">{label}</label>
      {children}
      {error && <p className="text-xs text-[#ff8566]">{error}</p>}
    </div>
  );
}

function SubmitForm({
  onSuccess,
  currentTopic,
}: {
  onSuccess: () => void;
  currentTopic: string | null;
}) {
  const initial: FormState = { status: "idle" };
  const [state, action, pending] = useActionState(submitCaller, initial);
  const [topicType, setTopicType] = useState<"current" | "new">("current");

  useEffect(() => {
    if (state.status === "error") toast.error(state.message);
    if (state.status === "success") onSuccess();
  }, [state, onSuccess]);

  const err = state.status === "error" ? state.errors ?? {} : {};

  return (
    <form action={action} className="space-y-5 px-6 pb-8 pt-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Full name *" error={err.name?.[0]}>
          <input name="name" required maxLength={120} className={inp()} placeholder="Jane Smith" />
        </Field>
        <Field label="Email *" error={err.email?.[0]}>
          <input name="email" type="email" required className={inp()} placeholder="jane@example.com" />
        </Field>
      </div>

      <Field label="Your Location *" error={err.location?.[0]}>
        <input
          name="location"
          maxLength={120}
          list="cities-list"
          autoComplete="off"
          className={inp()}
          placeholder="Pittsburgh, PA"
        />
        <datalist id="cities-list">
          {CITIES.map((city) => (
            <option key={city} value={city} />
          ))}
        </datalist>
      </Field>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-white/75">Topic *</p>
        <div className="flex gap-3">
          {(["current", "new"] as const).map((type) => (
            <label
              key={type}
              className={[
                "flex flex-1 cursor-pointer items-center gap-2.5 rounded-lg border px-4 py-3 transition",
                topicType === type
                  ? "border-[#ff6600]/70 bg-[#ff6600]/12 text-white"
                  : "border-white/15 bg-[#050505] text-white/55 hover:border-white/25",
              ].join(" ")}
            >
              <input
                type="radio"
                name="topic_type"
                value={type}
                checked={topicType === type}
                onChange={() => setTopicType(type)}
                className="accent-[#ff6600]"
              />
              <span className="text-sm font-medium">
                {type === "current" ? "Current Topic" : "New Topic"}
              </span>
            </label>
          ))}
        </div>

        {topicType === "current" ? (
          <>
            <input type="hidden" name="topic" value={currentTopic ?? ""} />
            <p className={[
              "rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-sm",
              currentTopic ? "text-white/80" : "italic text-white/35",
            ].join(" ")}>
              {currentTopic || "No current topic set yet."}
            </p>
          </>
        ) : (
          <>
            {err.topic?.[0] && (
              <p className="text-xs text-[#ff8566]">{err.topic[0]}</p>
            )}
            <input
              name="topic"
              required
              minLength={3}
              maxLength={200}
              className={inp()}
              placeholder="What's on your mind?"
            />
          </>
        )}
      </div>

      {/* Honeypot */}
      <div className="hidden" aria-hidden>
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {/* Legal */}
      <div className="space-y-4 rounded-xl border border-white/10 bg-black/30 p-4">
        <div className="max-h-32 overflow-y-auto font-mono text-xs whitespace-pre-wrap text-white/45">
          {RELEASE_TEXT}
        </div>
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            name="release_accepted"
            required
            className="mt-0.5 h-4 w-4 rounded accent-[#ff6600]"
          />
          <span className="text-sm text-white/70">
            I have read and agree to the Caller Release Agreement above.
          </span>
        </label>
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            name="age_confirmed"
            required
            className="mt-0.5 h-4 w-4 rounded accent-[#ff6600]"
          />
          <span className="text-sm text-white/70">I confirm I am 18 years of age or older.</span>
        </label>
      </div>

      <TurnstileWidget />

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-[#ff6600] py-3 font-[family-name:var(--font-opt)] font-bold text-white shadow-[0_0_24px_rgba(255,102,0,0.35)] transition hover:bg-[#ff781a] disabled:opacity-60"
      >
        {pending ? "Submitting…" : "Submit my topic →"}
      </button>
    </form>
  );
}

function SuccessView({ onClose }: { onClose: () => void }) {
  return (
    <div className="px-6 pb-10 pt-8 text-center">
      <div className="mb-4 text-5xl">🎙️</div>
      <h3 className="font-[family-name:var(--font-opt)] text-2xl font-bold text-white">
        You&apos;re in the queue!
      </h3>
      <p className="mx-auto mt-3 max-w-xs text-sm text-white/60">
        Good luck!
      </p>
      <button
        onClick={onClose}
        className="mt-8 rounded-full border border-white/20 px-6 py-2.5 text-sm text-white/80 transition hover:bg-white/5"
      >
        Close
      </button>
    </div>
  );
}

interface SubmitDialogProps {
  label?: string;
  variant?: "primary" | "outline";
  className?: string;
  currentTopic?: string | null;
}

export function SubmitDialog({
  label = "Put me on air",
  variant = "primary",
  className,
  currentTopic = null,
}: SubmitDialogProps) {
  const [open, setOpen] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  function handleOpenChange(v: boolean) {
    setOpen(v);
    if (!v) setTimeout(() => setSucceeded(false), 300);
  }

  const triggerClass =
    variant === "primary"
      ? "inline-flex items-center justify-center rounded-full bg-[#ff6600] px-8 py-3.5 text-base font-semibold text-white shadow-[0_0_32px_rgba(255,102,0,0.4)] transition hover:bg-[#ff781a] hover:shadow-[0_0_40px_rgba(255,102,0,0.55)]"
      : "inline-flex items-center justify-center rounded-full border border-[#ff6600]/45 bg-[#ff6600]/10 px-6 py-3 text-sm font-semibold text-[#ffb380] transition hover:border-[#ff6600] hover:bg-[#ff6600]/20]";

  const inner = succeeded ? (
    <SuccessView onClose={() => handleOpenChange(false)} />
  ) : (
    <SubmitForm onSuccess={() => setSucceeded(true)} currentTopic={currentTopic} />
  );

  const title = "Put Me On Air";

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <button className={className ?? triggerClass}>{label}</button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription className="sr-only">
              Submit your name, email, location, and topic to be considered as an Open Pod Talk caller.
            </DialogDescription>
          </DialogHeader>
          {inner}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <DrawerTrigger asChild>
        <button className={className ?? triggerClass}>{label}</button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
        </DrawerHeader>
        {inner}
      </DrawerContent>
    </Drawer>
  );
}

"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { submitPanelist, type FormState } from "@/app/(marketing)/submit/actions";
import { CITIES } from "@/lib/cities";
import {
  RELEASE_TEXT,
  SubmissionField,
  submissionInputClass,
  TurnstileWidget,
} from "@/components/marketing/submission-shared";

type Lean = "conservative" | "liberal" | "other";

const LEAN_OPTIONS: { value: Lean; label: string; activeClass: string }[] = [
  { value: "conservative", label: "I lean right", activeClass: "border-side-red/70 bg-side-red/15 text-white" },
  { value: "liberal", label: "I lean left", activeClass: "border-side-blue/70 bg-side-blue/15 text-white" },
  { value: "other", label: "Somewhere else", activeClass: "border-[#ff6600]/70 bg-[#ff6600]/12 text-white" },
];

/** The panel application, rendered inline on /casting. */
export function CastingForm() {
  const initial: FormState = { status: "idle" };
  const [state, action, pending] = useActionState(submitPanelist, initial);
  const [lean, setLean] = useState<Lean | null>(null);
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.status === "error") toast.error(state.message);
    if (state.status === "success") topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [state]);

  if (state.status === "success") {
    return (
      <div ref={topRef} className="rounded-2xl border border-white/10 bg-[#0a0a0a] p-8 text-center sm:p-10">
        <h2 className="font-[family-name:var(--font-opt)] text-2xl font-bold text-white">Application received</h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/60">
          Thanks for applying. We read every application, and if it&apos;s a fit we&apos;ll reach out
          to set up a short call.
        </p>
      </div>
    );
  }

  const err = state.status === "error" ? state.errors ?? {} : {};

  return (
    <div ref={topRef}>
      <form
        action={action}
        className="space-y-5 rounded-2xl border border-white/10 bg-[#0a0a0a] p-6 sm:p-8"
      >
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-white/75">Which side are you on? *</p>
          {err.lean?.[0] && <p className="text-xs text-[#ff8566]">Pick a side.</p>}
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {LEAN_OPTIONS.map((opt) => (
              <label
                key={opt.value}
                className={[
                  "flex cursor-pointer items-center justify-center rounded-lg border px-3 py-3 text-center text-sm font-medium transition",
                  lean === opt.value
                    ? opt.activeClass
                    : "border-white/15 bg-[#050505] text-white/55 hover:border-white/25",
                ].join(" ")}
              >
                <input
                  type="radio"
                  name="lean"
                  value={opt.value}
                  required
                  checked={lean === opt.value}
                  onChange={() => setLean(opt.value)}
                  className="sr-only"
                />
                {opt.label}
              </label>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <SubmissionField label="Full name *" error={err.name?.[0]}>
            <input name="name" required maxLength={120} autoComplete="name" className={submissionInputClass()} />
          </SubmissionField>
          <SubmissionField label="Email *" error={err.email?.[0]}>
            <input name="email" type="email" required autoComplete="email" className={submissionInputClass()} />
          </SubmissionField>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <SubmissionField label="Phone *" error={err.phone?.[0]}>
            <input name="phone" type="tel" required maxLength={30} autoComplete="tel" className={submissionInputClass()} />
          </SubmissionField>
          <SubmissionField label="City *" error={err.location?.[0]}>
            <input
              name="location"
              required
              maxLength={120}
              list="cities-list-casting"
              autoComplete="off"
              className={submissionInputClass()}
              placeholder="Pittsburgh, PA"
            />
            <datalist id="cities-list-casting">
              {CITIES.map((city) => (
                <option key={city} value={city} />
              ))}
            </datalist>
          </SubmissionField>
        </div>

        <SubmissionField label="Tell us about yourself and the issues you care about *" error={err.pitch?.[0]}>
          <textarea
            name="pitch"
            required
            minLength={20}
            maxLength={2500}
            rows={4}
            className={submissionInputClass("min-h-[104px] resize-y")}
          />
        </SubmissionField>

        <SubmissionField label="When are you usually free? *" error={err.availability?.[0]}>
          <input
            name="availability"
            required
            minLength={5}
            maxLength={2500}
            className={submissionInputClass()}
            placeholder="e.g. Weeknights after 6pm"
          />
        </SubmissionField>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <SubmissionField label="Instagram (optional)" error={err.instagram?.[0]}>
            <input name="instagram" maxLength={120} className={submissionInputClass()} placeholder="@handle" />
          </SubmissionField>
          <SubmissionField label="TikTok (optional)" error={err.tiktok?.[0]}>
            <input name="tiktok" maxLength={120} className={submissionInputClass()} placeholder="@handle" />
          </SubmissionField>
        </div>

        <SubmissionField label="Link to a video of you talking (optional)" error={err.video_url?.[0]}>
          <input name="video_url" type="url" maxLength={500} className={submissionInputClass()} placeholder="https://" />
        </SubmissionField>

        <div className="hidden" aria-hidden>
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="space-y-4 rounded-xl border border-white/10 bg-black/30 p-4">
          <div className="max-h-28 overflow-y-auto font-mono text-xs whitespace-pre-wrap text-white/45">
            {RELEASE_TEXT}
          </div>
          <label className="flex cursor-pointer items-start gap-3">
            <input type="checkbox" name="release_accepted" required className="mt-0.5 h-4 w-4 rounded accent-[#ff6600]" />
            <span className="text-sm text-white/70">I agree to the release agreement above.</span>
          </label>
          <label className="flex cursor-pointer items-start gap-3">
            <input type="checkbox" name="age_confirmed" required className="mt-0.5 h-4 w-4 rounded accent-[#ff6600]" />
            <span className="text-sm text-white/70">I&apos;m 18 or older.</span>
          </label>
        </div>

        <TurnstileWidget />

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-full bg-[#ff6600] py-3.5 font-[family-name:var(--font-opt)] text-base font-bold text-white shadow-[0_0_24px_rgba(255,102,0,0.35)] transition hover:bg-[#ff781a] disabled:opacity-60"
        >
          {pending ? "Sending…" : "Submit application"}
        </button>
      </form>
    </div>
  );
}

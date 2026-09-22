"use client";

import { useActionState, useEffect, useState } from "react";
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
import { submitPanelist, type FormState } from "@/app/(marketing)/submit/actions";
import { CITIES } from "@/lib/cities";
import {
  RELEASE_TEXT,
  SubmissionField,
  submissionInputClass,
  TurnstileWidget,
} from "@/components/marketing/submission-shared";

export type PanelLean = "conservative" | "liberal" | "other";

const LEAN_OPTIONS: { value: PanelLean; label: string; activeClass: string }[] = [
  {
    value: "conservative",
    label: "Conservative",
    activeClass: "border-side-red/70 bg-side-red/15 text-white",
  },
  {
    value: "liberal",
    label: "Liberal",
    activeClass: "border-side-blue/70 bg-side-blue/15 text-white",
  },
  {
    value: "other",
    label: "Independent / other",
    activeClass: "border-[#ff6600]/70 bg-[#ff6600]/12 text-white",
  },
];

function PanelForm({
  onSuccess,
  defaultLean,
}: {
  onSuccess: () => void;
  defaultLean: PanelLean;
}) {
  const initial: FormState = { status: "idle" };
  const [state, action, pending] = useActionState(submitPanelist, initial);
  const [lean, setLean] = useState<PanelLean>(defaultLean);

  useEffect(() => {
    if (state.status === "error") toast.error(state.message);
    if (state.status === "success") onSuccess();
  }, [state, onSuccess]);

  const err = state.status === "error" ? state.errors ?? {} : {};

  return (
    <form action={action} className="space-y-5 px-6 pb-8 pt-5">
      <p className="text-sm leading-relaxed text-white/55">
        Panels are recorded in person in Pittsburgh. Pay is $35 an hour, about
        $105 for the recording, with food and drinks included, and we invite
        good panelists back. We cast every seat by hand to keep the table
        balanced — tell us where you stand and why you can hold your ground.
      </p>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-white/75">Where do you land? *</p>
        {err.lean?.[0] && <p className="text-xs text-[#ff8566]">{err.lean[0]}</p>}
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {LEAN_OPTIONS.map((opt) => (
            <label
              key={opt.value}
              className={[
                "flex cursor-pointer items-center justify-center gap-2 rounded-lg border px-3 py-3 text-center text-sm font-medium transition",
                lean === opt.value
                  ? opt.activeClass
                  : "border-white/15 bg-[#050505] text-white/55 hover:border-white/25",
              ].join(" ")}
            >
              <input
                type="radio"
                name="lean"
                value={opt.value}
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
          <input name="name" required maxLength={120} className={submissionInputClass()} placeholder="Jane Smith" />
        </SubmissionField>
        <SubmissionField label="Email *" error={err.email?.[0]}>
          <input
            name="email"
            type="email"
            required
            className={submissionInputClass()}
            placeholder="jane@example.com"
          />
        </SubmissionField>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <SubmissionField label="Mobile phone *" error={err.phone?.[0]}>
          <input
            name="phone"
            type="tel"
            required
            maxLength={30}
            autoComplete="tel"
            className={submissionInputClass()}
            placeholder="412-555-0100"
          />
        </SubmissionField>
        <SubmissionField label="City / area *" error={err.location?.[0]}>
          <input
            name="location"
            required
            maxLength={120}
            list="cities-list-panel"
            autoComplete="off"
            className={submissionInputClass()}
            placeholder="Pittsburgh, PA"
          />
          <datalist id="cities-list-panel">
            {CITIES.map((city) => (
              <option key={city} value={city} />
            ))}
          </datalist>
        </SubmissionField>
      </div>

      <SubmissionField
        label="Why you? What do you believe, and can you defend it? *"
        error={err.pitch?.[0]}
      >
        <textarea
          name="pitch"
          required
          minLength={20}
          maxLength={2500}
          rows={4}
          className={submissionInputClass("min-h-[104px] resize-y")}
          placeholder="The takes you'd bring to the table, and why you won't fold when the other side pushes back."
        />
      </SubmissionField>

      <SubmissionField
        label="Which evenings could you make? *"
        error={err.availability?.[0]}
      >
        <textarea
          name="availability"
          required
          minLength={5}
          maxLength={2500}
          rows={3}
          className={submissionInputClass("min-h-[88px] resize-y")}
          placeholder="e.g. Weeknights after 6pm, or any night with two weeks notice."
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

      <SubmissionField label="Video of you talking (optional)" error={err.video_url?.[0]}>
        <input
          name="video_url"
          type="url"
          maxLength={500}
          className={submissionInputClass()}
          placeholder="https://youtube.com/watch?v=…"
        />
        <p className="text-xs text-white/40">
          A clip of you speaking or debating helps us cast faster — any link works.
        </p>
      </SubmissionField>

      <div className="hidden" aria-hidden>
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

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
        className="w-full rounded-2xl bg-[#ff6600] py-4 font-[family-name:var(--font-opt)] text-base font-bold text-white shadow-[0_0_24px_rgba(255,102,0,0.35)] transition hover:bg-[#ff781a] disabled:opacity-60 md:rounded-full md:py-3"
      >
        {pending ? "Sending…" : "Apply for the panel →"}
      </button>
    </form>
  );
}

function PanelSuccess({ onClose }: { onClose: () => void }) {
  return (
    <div className="px-6 pb-10 pt-8 text-center">
      <div className="mb-4 text-5xl">🍺</div>
      <h3 className="font-[family-name:var(--font-opt)] text-2xl font-bold text-white">
        Application in
      </h3>
      <p className="mx-auto mt-3 max-w-sm text-sm text-white/60">
        We cast each recording by hand to keep the sides even. If you make a panel,
        we&apos;ll reach out with the date and everything you need to know.
      </p>
      <button
        onClick={onClose}
        className="mx-auto mt-8 w-full max-w-sm rounded-2xl border border-white/20 py-3.5 text-sm font-medium text-white/80 transition hover:bg-white/5 md:mx-0 md:w-auto md:max-w-none md:rounded-full md:px-8 md:py-2.5"
      >
        Close
      </button>
    </div>
  );
}

export function PanelApplyDialog({
  label = "Apply for the panel",
  defaultLean = "other",
  className,
}: {
  label?: string;
  defaultLean?: PanelLean;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  function handleOpenChange(v: boolean) {
    setOpen(v);
    if (!v) setTimeout(() => setSucceeded(false), 300);
  }

  const triggerClass =
    className ??
    [
      "flex w-full items-center justify-center rounded-2xl bg-[#ff6600] py-4 text-base font-semibold text-white shadow-[0_0_32px_rgba(255,102,0,0.4)] transition hover:bg-[#ff781a] hover:shadow-[0_0_40px_rgba(255,102,0,0.55)] active:scale-[0.99]",
      "md:inline-flex md:w-auto md:rounded-full md:px-8 md:py-3.5 md:active:scale-100",
    ].join(" ");

  const inner = succeeded ? (
    <PanelSuccess onClose={() => handleOpenChange(false)} />
  ) : (
    <PanelForm onSuccess={() => setSucceeded(true)} defaultLean={defaultLean} />
  );

  const title = "Join the panel";

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <button type="button" className={triggerClass}>
            {label}
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription className="sr-only">
              Apply to be a panelist on the Open Pod Talk panel. Tell us your
              perspective, your pitch, and your availability.
            </DialogDescription>
          </DialogHeader>
          {inner}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer
      open={open}
      onOpenChange={handleOpenChange}
      repositionInputs={false}
      fixed
      shouldScaleBackground={false}
    >
      <DrawerTrigger asChild>
        <button type="button" className={triggerClass}>
          {label}
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
          <p className="sr-only">
            Apply to be a panelist on the Open Pod Talk panel. Tell us your
            perspective, your pitch, and your availability.
          </p>
        </DrawerHeader>
        {inner}
      </DrawerContent>
    </Drawer>
  );
}

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
import { submitInPerson, type FormState } from "@/app/(marketing)/submit/actions";
import { CITIES } from "@/lib/cities";
import {
  RELEASE_TEXT,
  SubmissionField,
  submissionInputClass,
  TurnstileWidget,
} from "@/components/marketing/submission-shared";

function InPersonForm({ onSuccess }: { onSuccess: () => void }) {
  const initial: FormState = { status: "idle" };
  const [state, action, pending] = useActionState(submitInPerson, initial);

  useEffect(() => {
    if (state.status === "error") toast.error(state.message);
    if (state.status === "success") onSuccess();
  }, [state, onSuccess]);

  const err = state.status === "error" ? state.errors ?? {} : {};

  return (
    <form action={action} className="space-y-5 px-6 pb-8 pt-5">
      <p className="text-sm leading-relaxed text-white/55">
        OPT is located in the Pittsburgh area. If you're interested in appearing in the studio, fill out the form below.
        hit <span className="text-white/80">Stream me in! </span> if you&apos;re joining remotely.
      </p>

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
        <p className="text-xs text-white/35">So we can text or call about timing and logistics.</p>
      </SubmissionField>

      <SubmissionField label="City / area you’re traveling from *" error={err.location?.[0]}>
        <input
          name="location"
          required
          maxLength={120}
          list="cities-list-inperson"
          autoComplete="off"
          className={submissionInputClass()}
          placeholder="Pittsburgh, PA"
        />
        <datalist id="cities-list-inperson">
          {CITIES.map((city) => (
            <option key={city} value={city} />
          ))}
        </datalist>
      </SubmissionField>

      <SubmissionField label="What do you want to talk about on the show? *" error={err.topic?.[0]}>
        <input
          name="topic"
          required
          minLength={3}
          maxLength={200}
          className={submissionInputClass()}
          placeholder="Headline for your angle or debate"
        />
      </SubmissionField>

      <SubmissionField
        label="When could you realistically be in the studio? *"
        error={err.availability?.[0]}
      >
        <textarea
          name="availability"
          required
          minLength={10}
          maxLength={2500}
          rows={4}
          className={submissionInputClass("min-h-[104px] resize-y")}
          placeholder="e.g. Weekday evenings after 5pm, or Saturday afternoons — give a few options if you can."
        />
      </SubmissionField>

      <SubmissionField label="Anything else we should know? (optional)" error={err.logistics_notes?.[0]}>
        <textarea
          name="logistics_notes"
          maxLength={2500}
          rows={3}
          className={submissionInputClass("min-h-[88px] resize-y")}
          placeholder="Parking needs, bringing a guest, accessibility, etc."
        />
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
        className="w-full rounded-2xl border border-[#ff6600]/55 bg-[#ff6600]/15 py-4 font-[family-name:var(--font-opt)] text-base font-bold text-[#ffb380] shadow-[0_0_20px_rgba(255,102,0,0.2)] transition hover:border-[#ff6600] hover:bg-[#ff6600]/25 disabled:opacity-60 md:rounded-full md:py-3"
      >
        {pending ? "Sending…" : "Send my in-studio request →"}
      </button>
    </form>
  );
}

function InPersonSuccess({ onClose }: { onClose: () => void }) {
  return (
    <div className="px-6 pb-10 pt-8 text-center">
      <div className="mb-4 text-5xl">🏠</div>
      <h3 className="font-[family-name:var(--font-opt)] text-2xl font-bold text-white">
        Request received
      </h3>
      <p className="mx-auto mt-3 max-w-sm text-sm text-white/60">
        If we can host you, we&apos;ll reach out with studio details and timing. Thanks for wanting to be here in
        person.
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

const triggerClass = [
  "flex w-full items-center justify-center rounded-2xl border border-[#ff6600]/45 bg-[#ff6600]/10 py-4 text-base font-semibold text-[#ffb380] transition hover:border-[#ff6600] hover:bg-[#ff6600]/20 active:scale-[0.99]",
  "md:inline-flex md:w-auto md:min-w-0 md:rounded-full md:px-6 md:py-3.5 md:active:scale-100",
].join(" ");

export function InPersonRequestDialog({
  label = "Request in-person",
  className,
}: {
  label?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  function handleOpenChange(v: boolean) {
    setOpen(v);
    if (!v) setTimeout(() => setSucceeded(false), 300);
  }

  const inner = succeeded ? (
    <InPersonSuccess onClose={() => handleOpenChange(false)} />
  ) : (
    <InPersonForm onSuccess={() => setSucceeded(true)} />
  );

  const title = "Request an in-studio spot";

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <button type="button" className={className ?? triggerClass}>
            {label}
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription className="sr-only">
              Request to join Open Pod Talk in person at the studio. Include contact details, topic, and when you can
              travel.
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
        <button type="button" className={className ?? triggerClass}>
          {label}
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
          <p className="sr-only">
            Request to join Open Pod Talk in person at the studio. Include contact details, topic, and when you can
            travel.
          </p>
        </DrawerHeader>
        {inner}
      </DrawerContent>
    </Drawer>
  );
}

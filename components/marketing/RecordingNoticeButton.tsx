"use client";

import { useActionState, useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { subscribeToRecordingNotice, type SubscribeState } from "@/lib/actions/subscribers";
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

const initial: SubscribeState = { status: "idle" };

function SubscribeForm() {
  const [state, action, pending] = useActionState(subscribeToRecordingNotice, initial);

  if (state.status === "success") {
    return (
      <div className="px-6 pb-8 pt-4 text-center">
        <p className="text-3xl">🎙️</p>
        <p className="mt-3 font-semibold text-white">You&apos;re on the list!</p>
        <p className="mt-1.5 text-sm text-white/55">We&apos;ll email you before we record.</p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-4 px-6 pb-8 pt-4">
      <p className="text-sm text-white/60">
        We&apos;ll only email you about upcoming recordings — nothing else.
      </p>
      <div className="flex flex-col gap-1.5">
        <input
          name="email"
          type="email"
          required
          autoFocus
          placeholder="your@email.com"
          className="block w-full rounded-lg border border-white/15 bg-[#050505] px-3 py-2.5 text-sm text-white placeholder:text-white/35 focus:border-[#ff6600]/50 focus:outline-none focus:ring-2 focus:ring-[#ff6600]/40"
        />
        {state.status === "error" && <p className="text-xs text-[#ff8566]">{state.message}</p>}
      </div>
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-2xl bg-[#ff6600] py-4 text-sm font-bold text-white shadow-[0_0_20px_rgba(255,102,0,0.3)] transition hover:bg-[#ff781a] disabled:opacity-60 md:rounded-full md:py-2.5"
      >
        {pending ? "Signing up…" : "Notify me →"}
      </button>
    </form>
  );
}

const defaultTrigger =
  "flex w-full items-center justify-center rounded-2xl border border-white/15 bg-white/[0.06] py-4 text-sm font-medium text-white/85 transition hover:border-white/25 hover:bg-white/10 hover:text-white md:inline-flex md:w-auto md:rounded-lg md:px-4 md:py-2";

/** Desktop: modal dialog · Mobile (< md): bottom drawer */
export function RecordingNoticeButton({
  triggerClassName,
  label = "Recording Notice",
}: {
  triggerClassName?: string;
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const triggerCn = triggerClassName ?? defaultTrigger;

  const headerDesktop = (
    <DialogHeader>
      <DialogTitle>Recording notices</DialogTitle>
      <DialogDescription>
        Add your email — we&apos;ll send a short heads-up before the next time we record.
      </DialogDescription>
    </DialogHeader>
  );

  const headerMobile = (
    <DrawerHeader>
      <DrawerTitle>Recording notices</DrawerTitle>
      <p className="mt-2 px-1 text-center text-sm text-white/55">
        Add your email — we&apos;ll send a short heads-up before the next time we record.
      </p>
    </DrawerHeader>
  );

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button type="button" className={triggerCn}>
            {label}
          </button>
        </DialogTrigger>
        <DialogContent>
          {headerDesktop}
          <SubscribeForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <button type="button" className={triggerCn}>
          {label}
        </button>
      </DrawerTrigger>
      <DrawerContent>
        {headerMobile}
        <SubscribeForm />
      </DrawerContent>
    </Drawer>
  );
}

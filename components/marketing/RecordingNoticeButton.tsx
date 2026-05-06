"use client";

import { useActionState, useEffect } from "react";
import { subscribeToRecordingNotice, type SubscribeState } from "@/lib/actions/subscribers";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const initial: SubscribeState = { status: "idle" };

function SubscribeForm() {
  const [state, action, pending] = useActionState(subscribeToRecordingNotice, initial);

  if (state.status === "success") {
    return (
      <div className="px-6 pb-8 pt-4 text-center">
        <p className="text-3xl">🎙️</p>
        <p className="mt-3 font-semibold text-white">You're on the list!</p>
        <p className="mt-1.5 text-sm text-white/55">
          We'll email you before we record.
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="px-6 pb-8 pt-4 space-y-4">
      <p className="text-sm text-white/60">
        Get an email the next time we're about to record.
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
        {state.status === "error" && (
          <p className="text-xs text-[#ff8566]">{state.message}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-[#ff6600] py-2.5 text-sm font-bold text-white shadow-[0_0_20px_rgba(255,102,0,0.3)] transition hover:bg-[#ff781a] disabled:opacity-60"
      >
        {pending ? "Signing up…" : "Notify me →"}
      </button>
    </form>
  );
}

export function RecordingNoticeButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center gap-1.5 rounded-full border border-[#ff6600]/50 bg-[#ff6600]/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#ffb380] transition hover:border-[#ff6600] hover:bg-[#ff6600]/20">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ff6600] opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#ff6600]" />
          </span>
          Recording Notice
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Recording Notice</DialogTitle>
        </DialogHeader>
        <SubscribeForm />
      </DialogContent>
    </Dialog>
  );
}

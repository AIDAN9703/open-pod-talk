"use client";

import { useActionState } from "react";
import { subscribeToRecordingNotice, type SubscribeState } from "@/lib/actions/subscribers";

const initial: SubscribeState = { status: "idle" };

export function RecordingNoticeSignup() {
  const [state, action, pending] = useActionState(subscribeToRecordingNotice, initial);

  if (state.status === "success") {
    return (
      <div className="mt-6 rounded-xl border border-emerald-500/30 bg-emerald-950/40 px-4 py-4 text-center sm:mt-8">
        <p className="text-sm font-semibold text-emerald-100">You&apos;re on the list</p>
        <p className="mt-1 text-xs text-emerald-200/80">
          We&apos;ll email you before we record. You can unsubscribe from any message.
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="mt-6 w-full sm:mt-8">
      <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-stretch sm:gap-3">
        <label htmlFor="recording-notice-email" className="sr-only">
          Email address
        </label>
        <input
          id="recording-notice-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          placeholder="you@example.com"
          className="min-h-[48px] w-full min-w-0 flex-1 rounded-xl border border-white/15 bg-[#0a0a0a] px-4 py-3 text-base text-white placeholder:text-white/35 focus:border-[#ff6600]/50 focus:outline-none focus:ring-2 focus:ring-[#ff6600]/35 sm:min-h-0 sm:text-sm"
        />
        <button
          type="submit"
          disabled={pending}
          className="min-h-[48px] w-full shrink-0 rounded-xl bg-[#ff6600] px-6 text-base font-semibold text-white shadow-[0_0_24px_rgba(255,102,0,0.22)] transition hover:bg-[#ff781a] disabled:opacity-60 sm:w-auto sm:text-sm md:min-w-[9.5rem]"
        >
          {pending ? "Sending…" : "Get alerts"}
        </button>
      </div>
      {state.status === "error" && (
        <p className="mt-2 text-left text-xs text-[#ff8566]">{state.message}</p>
      )}
    </form>
  );
}

"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { setBroadcastState } from "@/lib/actions/broadcast";
import type { BroadcastShowState } from "@/lib/broadcast";

const OPTIONS: {
  state: BroadcastShowState;
  label: string;
}[] = [
  { state: "live", label: "On air" },
  { state: "recording", label: "Recording" },
  { state: "off", label: "Off air" },
];

export function BroadcastToggle({ initialState }: { initialState: BroadcastShowState }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [state, setState] = useState<BroadcastShowState>(initialState);

  useEffect(() => {
    setState(initialState);
  }, [initialState]);

  function apply(next: BroadcastShowState) {
    const prev = state;
    setState(next);
    startTransition(async () => {
      const result = await setBroadcastState(next);
      if (!result.ok) {
        setState(prev);
        alert(result.error);
        return;
      }
      router.refresh();
    });
  }

  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
      <span className="text-[10px] font-semibold uppercase tracking-wider text-white/40">
        Site
      </span>
      <div className="flex flex-wrap rounded-full border border-white/15 bg-black/40 p-0.5">
        {OPTIONS.map(({ state: opt, label }) => {
          const active = state === opt;
          const greenActive = active && opt !== "off";
          const redActive = active && opt === "off";
          return (
            <button
              key={opt}
              type="button"
              disabled={pending}
              aria-pressed={active}
              onClick={() => apply(opt)}
              className={[
                "rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide transition-colors sm:px-3",
                greenActive
                  ? "bg-emerald-600 text-white shadow-[0_0_14px_rgba(16,185,129,0.45)]"
                  : redActive
                    ? "bg-red-600 text-white shadow-[0_0_12px_rgba(220,38,38,0.45)]"
                    : "text-white/50 hover:text-white/80",
              ].join(" ")}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

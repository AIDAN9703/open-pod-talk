"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { setBroadcastLive } from "@/lib/actions/broadcast";

export function BroadcastToggle({ initialLive }: { initialLive: boolean }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [live, setLive] = useState(initialLive);

  useEffect(() => {
    setLive(initialLive);
  }, [initialLive]);

  function apply(next: boolean) {
    const prev = live;
    setLive(next);
    startTransition(async () => {
      const result = await setBroadcastLive(next);
      if (!result.ok) {
        setLive(prev);
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
      <div className="flex rounded-full border border-white/15 bg-black/40 p-0.5">
        <button
          type="button"
          disabled={pending}
          aria-pressed={live}
          onClick={() => apply(true)}
          className={[
            "rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide transition-colors",
            live
              ? "bg-emerald-600 text-white shadow-[0_0_14px_rgba(16,185,129,0.45)]"
              : "text-white/50 hover:text-white/80",
          ].join(" ")}
        >
          On air
        </button>
        <button
          type="button"
          disabled={pending}
          aria-pressed={!live}
          onClick={() => apply(false)}
          className={[
            "rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide transition-colors",
            !live
              ? "bg-red-600 text-white shadow-[0_0_12px_rgba(220,38,38,0.45)]"
              : "text-white/50 hover:text-white/80",
          ].join(" ")}
        >
          Off air
        </button>
      </div>
    </div>
  );
}

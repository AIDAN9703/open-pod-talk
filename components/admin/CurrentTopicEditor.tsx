"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { setBroadcastTopic } from "@/lib/actions/broadcast";

export function CurrentTopicEditor({ initialTopic }: { initialTopic: string | null }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [topic, setTopic] = useState(initialTopic ?? "");

  useEffect(() => {
    setTopic(initialTopic ?? "");
  }, [initialTopic]);

  function saveTopic() {
    startTransition(async () => {
      const result = await setBroadcastTopic(topic);
      if (!result.ok) {
        alert(result.error);
        return;
      }
      router.refresh();
    });
  }

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="current-topic" className="text-[10px] font-semibold uppercase tracking-wider text-white/40">
        Current topic
      </label>
      <input
        id="current-topic"
        value={topic}
        onChange={(event) => setTopic(event.target.value)}
        placeholder="Set current topic"
        maxLength={160}
        className="w-56 rounded-lg border border-white/15 bg-[#0a0a0a] px-3 py-1.5 text-xs text-white placeholder:text-white/35 focus:border-[#ff6600]/40 focus:outline-none focus:ring-2 focus:ring-[#ff6600]/35"
      />
      <button
        type="button"
        disabled={pending}
        onClick={saveTopic}
        className="rounded-full border border-[#ff6600]/45 bg-[#ff6600]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#ffb380] transition hover:border-[#ff6600] hover:bg-[#ff6600]/20 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Save
      </button>
    </div>
  );
}

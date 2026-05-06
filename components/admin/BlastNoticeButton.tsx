"use client";

import { useState } from "react";
import { sendRecordingNotice } from "@/lib/actions/subscribers";

export function BlastNoticeButton() {
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function handleClick() {
    if (!confirm("Send a recording notice email to all subscribers?")) return;
    setState("loading");
    const result = await sendRecordingNotice();
    if (result.ok) {
      setState("success");
      setMsg(`Sent to ${result.sent} subscriber${result.sent === 1 ? "" : "s"}.`);
    } else {
      setState("error");
      setMsg(result.error ?? "Unknown error.");
    }
    setTimeout(() => setState("idle"), 5000);
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleClick}
        disabled={state === "loading"}
        className="flex items-center gap-1.5 rounded-full border border-[#ff6600]/40 bg-[#ff6600]/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#ffb380] transition hover:border-[#ff6600] hover:bg-[#ff6600]/20 disabled:opacity-50"
      >
        <span className="relative flex h-2 w-2 shrink-0">
          <span className={["absolute inline-flex h-full w-full rounded-full bg-[#ff6600] opacity-60", state === "loading" ? "animate-ping" : ""].join(" ")} />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#ff6600]" />
        </span>
        {state === "loading" ? "Sending…" : "Send Recording Notice"}
      </button>
      {state === "success" && (
        <span className="text-xs text-emerald-400">{msg}</span>
      )}
      {state === "error" && (
        <span className="text-xs text-red-400">{msg}</span>
      )}
    </div>
  );
}

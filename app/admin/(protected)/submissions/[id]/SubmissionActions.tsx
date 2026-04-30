"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateSubmission } from "./actions";

type Submission = {
  id: string;
  status: string;
  rating: number | null;
  host_notes: string | null;
  riverside_link?: string | null;
};

export function SubmissionActions({
  submission,
  statusFlow,
}: {
  submission: Submission;
  statusFlow: string[];
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [notes, setNotes] = useState(submission.host_notes ?? "");
  const [rating, setRating] = useState(submission.rating ?? 0);
  const [riversideLink, setRiversideLink] = useState(submission.riverside_link ?? "");

  async function save(updates: Partial<{ status: string; host_notes: string; rating: number; riverside_link: string }>) {
    startTransition(async () => {
      const result = await updateSubmission(submission.id, updates);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Saved");
        router.refresh();
      }
    });
  }

  return (
    <div className="space-y-6 border-t border-white/10 pt-6">
      {/* Status */}
      <div>
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-white/40">
          Status
        </h2>
        <div className="flex flex-wrap gap-2">
          {statusFlow.map((s) => (
            <button
              key={s}
              disabled={isPending || submission.status === s}
              onClick={() => save({ status: s })}
              className={[
                "rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                submission.status === s
                  ? "bg-[#ff6600] text-white shadow-[0_0_16px_rgba(255,102,0,0.35)]"
                  : "border border-white/15 bg-white/5 text-white/70 hover:border-white/25 hover:bg-white/10",
              ].join(" ")}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div>
        <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-white/40">
          Rating
        </h2>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => {
                setRating(n);
                save({ rating: n });
              }}
              className={`text-2xl transition-colors ${
                n <= rating ? "text-amber-400" : "text-white/25"
              } hover:text-amber-400`}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      {/* Host notes */}
      <div>
        <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-white/40">
          Host notes
        </h2>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          onBlur={() => save({ host_notes: notes })}
          rows={4}
          placeholder="Private notes visible only to hosts…"
          className="w-full resize-none rounded-lg border border-white/15 bg-[#050505] px-3 py-2 text-sm text-white placeholder:text-white/35 focus:border-[#ff6600]/40 focus:outline-none focus:ring-2 focus:ring-[#ff6600]/35"
        />
        <p className="mt-1 text-xs text-white/35">Auto-saves on blur</p>
      </div>

      {/* Riverside link */}
      <div>
        <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-white/40">
          Riverside guest link
        </h2>
        <p className="mb-2 text-xs text-white/45">
          Manually copy from Riverside → studio → invite, then paste and save.
        </p>
        <div className="flex gap-2">
          <input
            type="url"
            value={riversideLink}
            onChange={(e) => setRiversideLink(e.target.value)}
            placeholder="https://riverside.fm/studio/…"
            className="flex-1 rounded-lg border border-white/15 bg-[#050505] px-3 py-2 text-sm text-white placeholder:text-white/35 focus:border-[#ff6600]/40 focus:outline-none focus:ring-2 focus:ring-[#ff6600]/35"
          />
          <button
            type="button"
            onClick={() => save({ riverside_link: riversideLink })}
            disabled={isPending}
            className="rounded-full bg-[#ff6600] px-4 py-2 text-sm font-semibold text-white shadow-[0_0_16px_rgba(255,102,0,0.35)] hover:bg-[#ff781a] disabled:opacity-60"
          >
            Save & send invite
          </button>
        </div>
      </div>
    </div>
  );
}

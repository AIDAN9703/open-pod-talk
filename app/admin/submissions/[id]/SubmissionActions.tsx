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
    <div className="space-y-6 border-t pt-6">
      {/* Status */}
      <div>
        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
          Status
        </h2>
        <div className="flex flex-wrap gap-2">
          {statusFlow.map((s) => (
            <button
              key={s}
              disabled={isPending || submission.status === s}
              onClick={() => save({ status: s })}
              className={[
                "px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                submission.status === s
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200",
              ].join(" ")}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div>
        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">
          Rating
        </h2>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              onClick={() => {
                setRating(n);
                save({ rating: n });
              }}
              className={`text-2xl ${n <= rating ? "text-yellow-400" : "text-slate-300"} hover:text-yellow-400 transition-colors`}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      {/* Host notes */}
      <div>
        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">
          Host notes
        </h2>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          onBlur={() => save({ host_notes: notes })}
          rows={4}
          placeholder="Private notes visible only to hosts…"
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
        />
        <p className="text-xs text-slate-400 mt-1">Auto-saves on blur</p>
      </div>

      {/* Riverside link */}
      <div>
        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">
          Riverside guest link
        </h2>
        <p className="text-xs text-slate-500 mb-2">
          Manually copy from Riverside → studio → invite, then paste and save.
        </p>
        <div className="flex gap-2">
          <input
            type="url"
            value={riversideLink}
            onChange={(e) => setRiversideLink(e.target.value)}
            placeholder="https://riverside.fm/studio/…"
            className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <button
            onClick={() => save({ riverside_link: riversideLink })}
            disabled={isPending}
            className="px-4 py-2 rounded-md bg-slate-900 text-white text-sm hover:bg-slate-700 disabled:opacity-60"
          >
            Save & send invite
          </button>
        </div>
      </div>
    </div>
  );
}

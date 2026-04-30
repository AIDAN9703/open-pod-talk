import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { StatusBadge } from "@/components/StatusBadge";
import { createClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";
import { SubmissionActions } from "./SubmissionActions";

export const metadata: Metadata = {
  title: "Submission — Open Pod Talk Admin",
};

const STATUS_FLOW = [
  "pending",
  "reviewed",
  "selected",
  "contacted",
  "scheduled",
  "aired",
  "archived",
  "rejected",
] as const;

export default async function SubmissionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: sub, error } = await supabase
    .from("submissions")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !sub) notFound();

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/admin"
          className="text-sm text-[#ffb380] hover:text-[#ff8533]"
        >
          ← Back
        </Link>
      </div>

      <div className="space-y-6 rounded-2xl border border-white/10 bg-[#0a0a0a] p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="font-[family-name:var(--font-opt)] text-xl font-bold text-white">
              {sub.name}
            </h1>
            <div className="mt-0.5 text-sm text-white/45">{sub.email}</div>
            {sub.phone && <div className="text-sm text-white/45">{sub.phone}</div>}
          </div>
          <StatusBadge status={sub.status} />
        </div>

        <div>
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-white/40">
            Topic
          </h2>
          <p className="font-medium text-white">{sub.topic}</p>
          {sub.topic_details && (
            <p className="mt-2 whitespace-pre-wrap text-sm text-white/65">
              {sub.topic_details}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-3">
          {sub.location && (
            <div>
              <span className="text-white/45">Location</span>
              <div className="font-medium text-white">{sub.location}</div>
            </div>
          )}
          {sub.timezone && (
            <div>
              <span className="text-white/45">Timezone</span>
              <div className="font-medium text-white">{sub.timezone}</div>
            </div>
          )}
          {sub.source && (
            <div>
              <span className="text-white/45">Source</span>
              <div className="font-medium text-white">{sub.source}</div>
            </div>
          )}
          <div>
            <span className="text-white/45">Submitted</span>
            <div className="font-medium text-white">{formatDate(sub.created_at)}</div>
          </div>
          <div>
            <span className="text-white/45">Release</span>
            <div className="font-medium text-white">{sub.release_version}</div>
          </div>
          <div>
            <span className="text-white/45">Turnstile</span>
            <div
              className={`font-medium ${
                sub.turnstile_ok ? "text-emerald-400" : "text-[#ff8566]"
              }`}
            >
              {sub.turnstile_ok ? "Passed" : "Failed"}
            </div>
          </div>
        </div>

        {sub.social_handles && Object.values(sub.social_handles).some(Boolean) && (
          <div>
            <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-white/40">
              Social
            </h2>
            <div className="flex flex-wrap gap-4 text-sm">
              {Object.entries(sub.social_handles as Record<string, string>).map(
                ([platform, handle]) =>
                  handle ? (
                    <span key={platform} className="text-white/70">
                      {platform}: {handle}
                    </span>
                  ) : null
              )}
            </div>
          </div>
        )}

        <SubmissionActions submission={sub} statusFlow={[...STATUS_FLOW]} />
      </div>
    </div>
  );
}

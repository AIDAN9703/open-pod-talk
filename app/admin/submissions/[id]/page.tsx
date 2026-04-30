import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { formatDate } from "@/lib/utils";
import { StatusBadge } from "@/components/StatusBadge";
import { SubmissionActions } from "./SubmissionActions";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Submission — OpenPodTalk Admin" };

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
        <a href="/admin" className="text-sm text-slate-500 hover:text-slate-700">
          ← Back
        </a>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900">{sub.name}</h1>
            <div className="text-sm text-slate-500 mt-0.5">{sub.email}</div>
            {sub.phone && <div className="text-sm text-slate-500">{sub.phone}</div>}
          </div>
          <StatusBadge status={sub.status} />
        </div>

        {/* Topic */}
        <div>
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">Topic</h2>
          <p className="text-slate-900 font-medium">{sub.topic}</p>
          {sub.topic_details && (
            <p className="mt-2 text-slate-600 text-sm whitespace-pre-wrap">{sub.topic_details}</p>
          )}
        </div>

        {/* Meta */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
          {sub.location && (
            <div>
              <span className="text-slate-500">Location</span>
              <div className="font-medium">{sub.location}</div>
            </div>
          )}
          {sub.timezone && (
            <div>
              <span className="text-slate-500">Timezone</span>
              <div className="font-medium">{sub.timezone}</div>
            </div>
          )}
          {sub.source && (
            <div>
              <span className="text-slate-500">Source</span>
              <div className="font-medium">{sub.source}</div>
            </div>
          )}
          <div>
            <span className="text-slate-500">Submitted</span>
            <div className="font-medium">{formatDate(sub.created_at)}</div>
          </div>
          <div>
            <span className="text-slate-500">Release</span>
            <div className="font-medium">{sub.release_version}</div>
          </div>
          <div>
            <span className="text-slate-500">Turnstile</span>
            <div className={sub.turnstile_ok ? "text-green-700 font-medium" : "text-red-600 font-medium"}>
              {sub.turnstile_ok ? "Passed" : "Failed"}
            </div>
          </div>
        </div>

        {/* Social handles */}
        {sub.social_handles && Object.values(sub.social_handles).some(Boolean) && (
          <div>
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">Social</h2>
            <div className="flex gap-4 text-sm">
              {Object.entries(sub.social_handles as Record<string, string>).map(
                ([platform, handle]) =>
                  handle ? (
                    <span key={platform} className="text-slate-700">
                      {platform}: {handle}
                    </span>
                  ) : null
              )}
            </div>
          </div>
        )}

        {/* Actions */}
        <SubmissionActions submission={sub} statusFlow={[...STATUS_FLOW]} />
      </div>
    </div>
  );
}

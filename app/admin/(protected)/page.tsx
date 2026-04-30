import { createClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";
import { StatusBadge } from "@/components/StatusBadge";
import Link from "next/link";

const STATUS_OPTIONS = [
  "pending",
  "reviewed",
  "selected",
  "contacted",
  "scheduled",
  "aired",
  "archived",
  "rejected",
] as const;

type SearchParams = {
  status?: string;
  q?: string;
};

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const supabase = await createClient();

  let query = supabase
    .from("submissions")
    .select("id, name, email, topic, status, created_at, rating")
    .order("created_at", { ascending: false })
    .limit(200);

  if (params.status && params.status !== "all") {
    query = query.eq("status", params.status);
  }

  const { data: submissions, error } = await query;

  if (error) {
    return <p className="text-[#ff8566]">Error loading submissions: {error.message}</p>;
  }

  // Client-side text search filter (small dataset for now)
  const filtered = params.q
    ? (submissions ?? []).filter((s) => {
        const q = params.q!.toLowerCase();
        return (
          s.name.toLowerCase().includes(q) ||
          s.email.toLowerCase().includes(q) ||
          s.topic.toLowerCase().includes(q)
        );
      })
    : (submissions ?? []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="font-[family-name:var(--font-opt)] text-2xl font-bold text-white">Submissions</h1>
        <a
          href="/submit"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-[#ffb380] hover:text-[#ff8533]"
        >
          View submission form ↗
        </a>
      </div>

      {/* Filters */}
      <form method="GET" className="flex flex-col sm:flex-row gap-3">
        <input
          name="q"
          defaultValue={params.q}
          placeholder="Search name, email, topic…"
          className="flex-1 rounded-lg border border-white/15 bg-[#0a0a0a] px-3 py-2 text-sm text-white placeholder:text-white/35 focus:border-[#ff6600]/40 focus:outline-none focus:ring-2 focus:ring-[#ff6600]/35"
        />
        <select
          name="status"
          defaultValue={params.status ?? "pending"}
          className="rounded-lg border border-white/15 bg-[#0a0a0a] px-3 py-2 text-sm text-white focus:border-[#ff6600]/40 focus:outline-none focus:ring-2 focus:ring-[#ff6600]/35"
        >
          <option value="all">All statuses</option>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="rounded-full bg-[#ff6600] px-5 py-2 text-sm font-semibold text-white shadow-[0_0_20px_rgba(255,102,0,0.25)] hover:bg-[#ff781a]"
        >
          Filter
        </button>
      </form>

      <p className="text-sm text-white/45">{filtered.length} result{filtered.length !== 1 ? "s" : ""}</p>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a]">
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-white/40">No submissions found.</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.03] text-left text-white/50">
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium hidden sm:table-cell">Topic</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium hidden md:table-cell">Rating</th>
                <th className="px-4 py-3 font-medium hidden md:table-cell">Submitted</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {filtered.map((sub) => (
                <tr key={sub.id} className="transition-colors hover:bg-white/[0.03]">
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/submissions/${sub.id}`}
                      className="font-medium text-white hover:text-[#ffb380]"
                    >
                      {sub.name}
                    </Link>
                    <div className="text-xs text-white/40">{sub.email}</div>
                  </td>
                  <td className="hidden max-w-xs truncate px-4 py-3 text-white/55 sm:table-cell">
                    {sub.topic}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={sub.status} />
                  </td>
                  <td className="hidden px-4 py-3 text-white/55 md:table-cell">
                    {sub.rating ? "★".repeat(sub.rating) + "☆".repeat(5 - sub.rating) : "—"}
                  </td>
                  <td className="hidden whitespace-nowrap px-4 py-3 text-white/40 md:table-cell">
                    {formatDate(sub.created_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

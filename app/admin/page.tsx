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
    return <p className="text-red-600">Error loading submissions: {error.message}</p>;
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
        <h1 className="text-2xl font-bold text-slate-900">Submissions</h1>
        <a
          href="/submit"
          target="_blank"
          className="text-sm text-slate-500 hover:text-slate-700"
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
          className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <select
          name="status"
          defaultValue={params.status ?? "pending"}
          className="rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
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
          className="px-4 py-2 rounded-md bg-slate-900 text-white text-sm hover:bg-slate-700"
        >
          Filter
        </button>
      </form>

      <p className="text-sm text-slate-500">{filtered.length} result{filtered.length !== 1 ? "s" : ""}</p>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-slate-400">No submissions found.</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 text-left">
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium hidden sm:table-cell">Topic</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium hidden md:table-cell">Rating</th>
                <th className="px-4 py-3 font-medium hidden md:table-cell">Submitted</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((sub) => (
                <tr key={sub.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/submissions/${sub.id}`}
                      className="font-medium text-slate-900 hover:text-red-600"
                    >
                      {sub.name}
                    </Link>
                    <div className="text-slate-400 text-xs">{sub.email}</div>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell text-slate-600 max-w-xs truncate">
                    {sub.topic}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={sub.status} />
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-slate-600">
                    {sub.rating ? "★".repeat(sub.rating) + "☆".repeat(5 - sub.rating) : "—"}
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-slate-500 whitespace-nowrap">
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

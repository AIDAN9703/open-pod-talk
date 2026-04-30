const COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  reviewed: "bg-blue-100 text-blue-800",
  selected: "bg-green-100 text-green-800",
  contacted: "bg-purple-100 text-purple-800",
  scheduled: "bg-indigo-100 text-indigo-800",
  aired: "bg-slate-100 text-slate-700",
  archived: "bg-slate-100 text-slate-500",
  rejected: "bg-red-100 text-red-700",
};

export function StatusBadge({ status }: { status: string }) {
  const color = COLORS[status] ?? "bg-slate-100 text-slate-600";
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${color}`}>
      {status}
    </span>
  );
}

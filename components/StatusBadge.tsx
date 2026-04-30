const COLORS: Record<string, string> = {
  pending: "border-yellow-500/30 bg-yellow-500/15 text-yellow-100",
  reviewed: "border-sky-500/30 bg-sky-500/15 text-sky-100",
  selected: "border-emerald-500/30 bg-emerald-500/15 text-emerald-100",
  contacted: "border-violet-500/30 bg-violet-500/15 text-violet-100",
  scheduled: "border-indigo-500/30 bg-indigo-500/15 text-indigo-100",
  aired: "border-white/20 bg-white/10 text-white",
  archived: "border-white/15 bg-white/5 text-white/50",
  rejected: "border-red-500/35 bg-red-500/15 text-red-200",
};

export function StatusBadge({ status }: { status: string }) {
  const color =
    COLORS[status] ??
    "border-white/15 bg-white/10 text-white/70";
  return (
    <span
      className={`inline-flex items-center rounded border px-2 py-0.5 text-xs font-medium ${color}`}
    >
      {status}
    </span>
  );
}

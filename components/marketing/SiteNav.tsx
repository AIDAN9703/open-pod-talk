import { CurrentTopicMarquee } from "@/components/marketing/CurrentTopicMarquee";
import type { BroadcastShowState } from "@/lib/broadcast";

export function SiteNav({
  showState,
  currentTopic,
}: {
  showState: BroadcastShowState;
  currentTopic: string | null;
}) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050505]/90 backdrop-blur-md">
      <div className="mx-auto flex h-auto min-h-16 max-w-6xl items-center justify-between gap-3 px-4 py-2.5 sm:h-16 sm:px-6 sm:py-0">
        <div className="shrink-0">
          <AirBadge showState={showState} />
        </div>
        <div className="flex min-w-0 flex-1 items-start justify-end gap-x-2 text-right max-md:gap-x-3 sm:items-center md:gap-x-3">
          <span className="max-md:leading-snug shrink-0 select-none whitespace-nowrap font-semibold text-white">
            Current Topic:
          </span>
          <CurrentTopicMarquee value={currentTopic || "-"} />
        </div>
      </div>
    </header>
  );
}

function AirBadge({ showState }: { showState: BroadcastShowState }) {
  if (showState === "live") {
    return (
      <span
        className="flex items-center gap-1.5 rounded-full border border-emerald-500/50 bg-emerald-950/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-100 shadow-[0_0_14px_rgba(16,185,129,0.25)] sm:text-[11px]"
        title="Website status: live stream (set in admin)"
      >
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
          <span className="relative inline-flex h-2 w-2 shrink-0 rounded-full bg-emerald-400" />
        </span>
        <span className="hidden sm:inline">On air</span>
        <span className="sm:hidden">Live</span>
      </span>
    );
  }

  if (showState === "recording") {
    return (
      <span
        className="flex items-center gap-1.5 rounded-full border border-emerald-500/50 bg-emerald-950/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-100 shadow-[0_0_12px_rgba(16,185,129,0.22)] sm:text-[11px]"
        title="Website status: recording (not streaming live)"
      >
        <span className="relative inline-flex h-2 w-2 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
        <span className="hidden sm:inline">Recording</span>
        <span className="sm:hidden">REC</span>
      </span>
    );
  }

  return (
    <span className="inline-flex shrink-0 items-center rounded-full border border-red-600/55 bg-red-950/65 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-red-100 shadow-[0_0_12px_rgba(239,68,68,0.2)] sm:px-2.5 sm:text-[11px]">
      Off air
    </span>
  );
}

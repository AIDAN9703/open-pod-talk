import { RecordingNoticeButton } from "@/components/marketing/RecordingNoticeButton";

export function SiteNav({
  isLive,
  currentTopic,
}: {
  isLive: boolean;
  currentTopic: string | null;
}) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050505]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <RecordingNoticeButton />
        <div className="flex min-w-0 items-center gap-3 text-base text-white/90">
          <AirBadge isLive={isLive} />
          <div className="min-w-0">
            <span className="font-semibold text-white">Current Topic:</span>{" "}
            <span className="inline-block max-w-[14rem] truncate align-bottom font-bold text-orange-400 sm:max-w-[20rem]">
              {currentTopic || "-"}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

function AirBadge({ isLive }: { isLive: boolean }) {
  if (isLive) {
    return (
      <span
        className="flex items-center gap-1.5 rounded-full border border-emerald-500/50 bg-emerald-950/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-100 shadow-[0_0_14px_rgba(16,185,129,0.25)] sm:text-[11px]"
        title="Website status: live (set in admin)"
      >
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
        </span>
        <span className="hidden sm:inline">On air</span>
        <span className="sm:hidden">Live</span>
      </span>
    );
  }
  return (
    <span className="inline-flex shrink-0 items-center rounded-full border border-red-600/55 bg-red-950/65 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-red-100 shadow-[0_0_12px_rgba(239,68,68,0.2)] sm:px-2.5 sm:text-[11px]">
      Off air
    </span>
  );
}

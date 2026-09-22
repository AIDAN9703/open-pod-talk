import Link from "next/link";
import { CurrentTopicMarquee } from "@/components/marketing/CurrentTopicMarquee";
import type { BroadcastShowState } from "@/lib/broadcast";

const NAV_LINKS = [
  { label: "Watch", href: "/watch" },
  { label: "Casting", href: "/casting" },
  { label: "Episodes", href: "/episodes" },
  { label: "About", href: "/about" },
] as const;

export function SiteNav({
  showState,
  currentTopic,
}: {
  showState: BroadcastShowState;
  currentTopic: string | null;
}) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#060606]/90 backdrop-blur-md">
      {/* Launch banner */}
      <div className="bg-[#ff6600] px-4 py-1 text-center font-[family-name:var(--font-opt)] text-[11px] font-bold uppercase tracking-[0.2em] text-black">
        Coming fall 2026 · applications open now
      </div>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:h-[4.5rem] sm:px-6">
        <Link
          href="/"
          aria-label="Mark Raymond, Open Pod Talk podcast, home"
          className="group inline-flex shrink-0 flex-col leading-none text-white transition hover:text-[#ffb380]"
        >
          <span className="mb-0.5 font-[family-name:var(--font-opt)] text-[9px] font-bold uppercase tracking-[0.28em] text-[#ff6600] sm:text-[10px]">
            Mark Raymond
          </span>
          <span className="opt-display flex items-baseline text-xl sm:text-2xl">
            <span className="text-[1.25em] text-[#ff6600]">O</span>PEN
            <span className="ml-[0.28em] text-[1.25em] text-[#ff6600]">P</span>OD
            <span className="ml-[0.28em] text-[1.25em] text-[#ff6600]">T</span>ALK
          </span>
          {/* One word stretched to the full width of the line above */}
          <span
            aria-hidden
            className="mt-0.5 flex w-full justify-between font-[family-name:var(--font-opt)] text-[10px] font-extrabold uppercase text-white/55 transition group-hover:text-[#ffb380]/70 sm:text-[11px]"
          >
            {"PODCAST".split("").map((ch, i) => (
              <span key={i}>{ch}</span>
            ))}
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-white/60 md:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="shrink-0">
          <AirBadge showState={showState} />
        </div>
      </div>

      {/* Topic ticker strip */}
      <div className="border-t border-white/[0.06] bg-black/40">
        <div className="mx-auto flex min-w-0 max-w-6xl items-center gap-3 px-4 py-1.5 sm:px-6">
          <span className="shrink-0 select-none font-[family-name:var(--font-opt)] text-[10px] font-bold uppercase tracking-[0.22em] text-white/40 sm:text-[11px]">
            Current topic
          </span>
          <CurrentTopicMarquee value={currentTopic || "-"} />
        </div>
      </div>

      {/* Mobile nav row */}
      <nav className="flex items-center gap-5 overflow-x-auto border-t border-white/[0.06] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white/55 md:hidden">
        {NAV_LINKS.map((link) => (
          <Link key={link.href} href={link.href} className="shrink-0 transition hover:text-white">
            {link.label}
          </Link>
        ))}
      </nav>
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
    <span className="inline-flex shrink-0 items-center rounded-full border border-white/15 bg-white/[0.04] px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white/50 sm:px-2.5 sm:text-[11px]">
      Off air
    </span>
  );
}

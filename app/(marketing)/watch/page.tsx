import type { Metadata } from "next";
import Link from "next/link";
import { getBroadcastStatus } from "@/lib/broadcast";
import { getYoutubeEmbedSrc } from "@/lib/youtube-embed";

export const metadata: Metadata = {
  title: "Watch — Open Pod Talk",
  description:
    "Watch Open Pod Talk live on YouTube. Live call-in episodes and Tee & Tap 5v5 bar debates.",
};

export default async function WatchPage() {
  const broadcast = await getBroadcastStatus();
  const embedSrc = getYoutubeEmbedSrc();
  const channelUrl = process.env.NEXT_PUBLIC_YOUTUBE_URL?.trim() || null;

  const iframeSrc = embedSrc
    ? embedSrc.includes("?")
      ? `${embedSrc}&rel=0`
      : `${embedSrc}?rel=0`
    : null;

  return (
    <div className="relative py-16 sm:py-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(ellipse_60%_60%_at_50%_0%,rgba(255,102,0,0.12),transparent)]" />
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        <Link href="/" className="text-sm font-medium text-[#ffb380]/90 hover:text-[#ff8533]">
          ← Back home
        </Link>

        <div className="mt-6">
          <p className="opt-eyebrow">The stream</p>
          <h1 className="opt-display mt-3 text-4xl text-white sm:text-5xl">
            Watch live
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/60">
            {broadcast.showState === "live" ? (
              <>
                We&apos;re <span className="text-emerald-300/90">on air</span> right
                now — the player below is the same public YouTube stream.
              </>
            ) : broadcast.showState === "recording" ? (
              <>
                We&apos;re <span className="text-emerald-300/90">recording</span> a
                session — not streaming live right now. The player may show a
                replay or idle state; episodes still land on YouTube and in the
                podcast feed.
              </>
            ) : (
              <>
                We&apos;re off air at the moment. When we go live, the player fills
                in automatically — until then, catch replays and subscribe for
                alerts on YouTube.
              </>
            )}
          </p>
        </div>

        {iframeSrc ? (
          <div className="mt-8 overflow-hidden rounded-2xl border border-white/15 bg-black shadow-[0_0_48px_rgba(255,102,0,0.14)]">
            <div className="aspect-video w-full">
              <iframe
                title="Open Pod Talk livestream on YouTube"
                src={iframeSrc}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="h-full w-full border-0"
              />
            </div>
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-white/10 bg-[#0a0a0a] p-10 text-center">
            <div className="mb-4 text-4xl drop-shadow-[0_0_16px_rgba(255,102,0,0.35)]">📺</div>
            <h2 className="font-[family-name:var(--font-opt)] text-xl font-bold text-white">
              The stream lives on YouTube
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/55">
              The embedded player isn&apos;t set up yet. Every live session and
              replay is on our YouTube channel, and the recording-notice list at
              the bottom of this page gets an email before we go into session.
            </p>
          </div>
        )}

        {channelUrl ? (
          <p className="mt-6 text-sm text-white/55">
            <a
              href={channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#ffb380] underline decoration-[#ff6600]/40 underline-offset-2 transition hover:text-white hover:decoration-[#ff6600]"
            >
              Open our YouTube channel ↗
            </a>
            {!iframeSrc
              ? " — live streams and episodes live there."
              : " — subscribe for premiere notifications."}
          </p>
        ) : null}

        <div className="mt-12 flex flex-col gap-3 rounded-2xl border border-[#ff6600]/25 bg-[#ff6600]/8 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-[family-name:var(--font-opt)] text-lg font-bold text-white">
              Rather be on the show than watch it?
            </h2>
            <p className="mt-1 text-sm text-white/55">
              Call in from anywhere, or take a seat at a Tee &amp; Tap panel.
            </p>
          </div>
          <Link
            href="/#tee-and-tap"
            className="inline-flex shrink-0 items-center justify-center rounded-full bg-[#ff6600] px-6 py-3 text-sm font-bold text-white shadow-[0_0_24px_rgba(255,102,0,0.35)] transition hover:bg-[#ff781a]"
          >
            Get on air →
          </Link>
        </div>
      </div>
    </div>
  );
}

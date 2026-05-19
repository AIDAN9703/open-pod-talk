import type { BroadcastShowState } from "@/lib/broadcast";
import { getYoutubeEmbedSrc } from "@/lib/youtube-embed";

export function WatchLiveSection({ showState }: { showState: BroadcastShowState }) {
  const embedSrc = getYoutubeEmbedSrc();
  const channelUrl = process.env.NEXT_PUBLIC_YOUTUBE_URL?.trim() || null;

  if (!embedSrc && !channelUrl) return null;

  const iframeSrc = embedSrc
    ? embedSrc.includes("?")
      ? `${embedSrc}&rel=0`
      : `${embedSrc}?rel=0`
    : null;

  return (
    <section
      id="watch"
      role="region"
      aria-labelledby="watch-heading"
      className="scroll-mt-20 border-b border-white/10 bg-[#050505] py-14 sm:py-16"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mb-6 text-center sm:text-left">
          <h2
            id="watch-heading"
            className="font-[family-name:var(--font-opt)] text-2xl font-bold text-white sm:text-3xl"
          >
            Watch live on YouTube
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-white/60 sm:mx-0 sm:text-base">
            {showState === "live" ? (
              <>
                We&apos;re marked <span className="text-emerald-300/90">on air</span> on the site — the player
                below is the same public YouTube stream.
              </>
            ) : showState === "recording" ? (
              <>
                We&apos;re marked <span className="text-emerald-300/90">recording</span> — not streaming live right
                now. The embed may show a replay or idle state; episodes still land on YouTube and in the podcast
                feed.
              </>
            ) : (
              <>
                When we go live, the player fills in automatically (if you use the channel live embed). Otherwise
                catch replays and subscribe for alerts on YouTube.
              </>
            )}
          </p>
        </div>

        {iframeSrc ? (
          <div className="overflow-hidden rounded-2xl border border-white/15 bg-black shadow-[0_0_48px_rgba(255,102,0,0.14)]">
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
        ) : null}

        {channelUrl ? (
          <p className="mt-5 text-center text-sm text-white/55 sm:text-left">
            <a
              href={channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#ffb380] underline decoration-[#ff6600]/40 underline-offset-2 transition hover:text-white hover:decoration-[#ff6600]"
            >
              Open our YouTube channel ↗
            </a>
            {!iframeSrc ? " — live streams and episodes live there." : " — subscribe for premiere notifications."}
          </p>
        ) : null}
      </div>
    </section>
  );
}

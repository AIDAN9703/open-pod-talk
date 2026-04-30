import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Episodes — Open Pod Talk",
  description:
    "All Open Pod Talk episodes. Real callers, real debates. Listen on Apple Podcasts, Spotify, and wherever you get podcasts.",
};

// Revalidate every 30 minutes — new episodes will appear without a redeploy
export const revalidate = 1800;

type Episode = {
  title: string;
  pubDate: string;
  description: string;
  duration: string;
  enclosureUrl: string;
  guid: string;
  link: string;
};

async function getEpisodes(): Promise<Episode[]> {
  const feedUrl = process.env.TRANSISTOR_RSS_URL;
  if (!feedUrl) return [];

  try {
    const res = await fetch(feedUrl, {
      next: { revalidate: 1800 },
      headers: { "User-Agent": "OpenPodTalk/1.0" },
    });
    if (!res.ok) return [];

    const xml = await res.text();

    // Lightweight XML parse without a dependency — pulls <item> blocks
    const items = xml.match(/<item>([\s\S]*?)<\/item>/g) ?? [];

    return items.map((item) => ({
      title: extractTag(item, "title"),
      pubDate: extractTag(item, "pubDate"),
      description: stripHtml(extractTag(item, "description") || extractTag(item, "itunes:summary")),
      duration: extractTag(item, "itunes:duration"),
      enclosureUrl: extractAttr(item, "enclosure", "url"),
      guid: extractTag(item, "guid"),
      link: extractTag(item, "link"),
    }));
  } catch {
    return [];
  }
}

function extractTag(xml: string, tag: string): string {
  const m = xml.match(new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>|<${tag}[^>]*>([\\s\\S]*?)</${tag}>`));
  return (m?.[1] ?? m?.[2] ?? "").trim();
}

function extractAttr(xml: string, tag: string, attr: string): string {
  const m = xml.match(new RegExp(`<${tag}[^>]*\\s${attr}="([^"]*)"[^>]*>`));
  return m?.[1] ?? "";
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ").trim();
}

function formatPubDate(raw: string): string {
  try {
    return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(new Date(raw));
  } catch {
    return raw;
  }
}

const PLATFORMS = [
  { name: "Apple Podcasts", href: process.env.NEXT_PUBLIC_APPLE_PODCASTS_URL ?? null, icon: "🎵" },
  { name: "Spotify", href: process.env.NEXT_PUBLIC_SPOTIFY_URL ?? null, icon: "🎧" },
  { name: "YouTube", href: process.env.NEXT_PUBLIC_YOUTUBE_URL ?? null, icon: "▶️" },
];

export default async function EpisodesPage() {
  const episodes = await getEpisodes();

  return (
    <div className="relative py-16 sm:py-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(ellipse_60%_60%_at_50%_0%,rgba(255,102,0,0.12),transparent)]" />
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
        <Link href="/" className="text-sm font-medium text-[#ffb380]/90 hover:text-[#ff8533]">
          ← Back home
        </Link>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-[family-name:var(--font-opt)] text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Episodes
            </h1>
            <p className="mt-2 text-white/55">
              {episodes.length > 0
                ? `${episodes.length} episode${episodes.length !== 1 ? "s" : ""} — real callers, real debates.`
                : "Episodes drop soon — submit your topic to be first in the queue."}
            </p>
          </div>

          {/* Platform links */}
          <div className="flex flex-wrap gap-2">
            {PLATFORMS.filter((p) => p.href).map((p) => (
              <a
                key={p.name}
                href={p.href!}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/70 transition hover:border-white/30 hover:text-white"
              >
                <span>{p.icon}</span>
                {p.name}
              </a>
            ))}
          </div>
        </div>

        {episodes.length === 0 ? (
          <ComingSoon />
        ) : (
          <div className="mt-10 space-y-4">
            {episodes.map((ep, i) => (
              <EpisodeCard key={ep.guid || i} episode={ep} number={episodes.length - i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function EpisodeCard({ episode, number }: { episode: Episode; number: number }) {
  return (
    <article className="group rounded-2xl border border-white/10 bg-[#0a0a0a] p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] transition hover:border-white/20">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#ff6600]/30 bg-[#ff6600]/10 font-[family-name:var(--font-opt)] text-sm font-bold text-[#ff6600]">
          {String(number).padStart(2, "0")}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-[family-name:var(--font-opt)] text-base font-bold text-white group-hover:text-[#ffb380] transition-colors">
              {episode.title || "Untitled episode"}
            </h2>
            <div className="flex shrink-0 items-center gap-3 text-xs text-white/40">
              {episode.duration && <span>{episode.duration}</span>}
              {episode.pubDate && <span>{formatPubDate(episode.pubDate)}</span>}
            </div>
          </div>
          {episode.description && (
            <p className="mt-2 line-clamp-2 text-sm text-white/55">
              {episode.description}
            </p>
          )}
          <div className="mt-3 flex flex-wrap gap-2">
            {episode.enclosureUrl && (
              <a
                href={episode.enclosureUrl}
                className="inline-flex items-center gap-1 text-xs font-medium text-[#ffb380] hover:underline"
              >
                ▶ Play
              </a>
            )}
            {episode.link && (
              <a
                href={episode.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-white/40 hover:text-white/70"
              >
                Full episode ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

function ComingSoon() {
  return (
    <div className="mt-16 space-y-8">
      {/* Placeholder skeleton cards */}
      {[1, 2, 3].map((n) => (
        <div
          key={n}
          className="rounded-2xl border border-white/[0.06] bg-[#0a0a0a] p-6 opacity-40"
        >
          <div className="flex items-start gap-4">
            <div className="h-11 w-11 shrink-0 rounded-xl border border-white/10 bg-white/5" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-2/3 rounded-md bg-white/10" />
              <div className="h-3 w-full rounded-md bg-white/5" />
              <div className="h-3 w-1/2 rounded-md bg-white/5" />
            </div>
          </div>
        </div>
      ))}

      <div className="rounded-2xl border border-[#ff6600]/25 bg-[#ff6600]/8 p-8 text-center">
        <div className="mb-4 text-4xl drop-shadow-[0_0_16px_rgba(255,102,0,0.35)]">🎙️</div>
        <h2 className="font-[family-name:var(--font-opt)] text-xl font-bold text-white">
          First episode dropping May 2026
        </h2>
        <p className="mt-3 text-white/55">
          We&apos;re building the caller queue right now. Submit your topic and you
          could be in episode one.
        </p>
        <Link
          href="/submit"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-[#ff6600] px-8 py-3 text-sm font-bold text-white shadow-[0_0_24px_rgba(255,102,0,0.35)] transition hover:bg-[#ff781a]"
        >
          Submit your topic
        </Link>
      </div>
    </div>
  );
}

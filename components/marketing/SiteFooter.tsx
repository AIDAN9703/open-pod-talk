import Link from "next/link";

const YEAR = new Date().getFullYear();

// Platform links — set env vars when accounts are live, otherwise hidden
const platforms = [
  { name: "Apple Podcasts", href: process.env.NEXT_PUBLIC_APPLE_PODCASTS_URL },
  { name: "Spotify", href: process.env.NEXT_PUBLIC_SPOTIFY_URL },
  { name: "YouTube", href: process.env.NEXT_PUBLIC_YOUTUBE_URL },
  { name: "Amazon Music", href: process.env.NEXT_PUBLIC_AMAZON_MUSIC_URL },
].filter((p) => p.href);

const social = [
  { name: "Instagram", href: process.env.NEXT_PUBLIC_INSTAGRAM_URL },
  { name: "TikTok", href: process.env.NEXT_PUBLIC_TIKTOK_URL },
  { name: "X / Twitter", href: process.env.NEXT_PUBLIC_TWITTER_URL },
].filter((p) => p.href);

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#030303]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          {/* Brand */}
          <div className="max-w-xs">
            <p className="font-[family-name:var(--font-opt)] text-lg font-bold tracking-tight text-white">
              <span className="text-[#ff6600]">O</span>
              <span className="text-white/90">PEN </span>
              <span className="text-[#ff6600]">P</span>
              <span className="text-white/90">OD </span>
              <span className="text-[#ff6600]">T</span>
              <span className="text-white/90">ALK</span>
            </p>
            <p className="mt-1 text-base font-semibold leading-snug text-white/85">
              all views, just bring it!
            </p>
            <p className="mt-2 text-sm leading-relaxed text-white/45">
              Live call-in podcast. Real callers, real debates, zero script polish.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-10 text-sm">
            {/* Show */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-white/35">
                Show
              </span>
              <Link href="/episodes" className="text-white/60 hover:text-white transition-colors">
                Episodes
              </Link>
              <Link href="/about" className="text-white/60 hover:text-white transition-colors">
                About
              </Link>
              <Link href="/" className="text-[#ff6600] hover:text-[#ff781a] transition-colors font-medium">
                Call in →
              </Link>
            </div>

            {/* Listen */}
            {platforms.length > 0 && (
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-white/35">
                  Listen
                </span>
                {platforms.map((p) => (
                  <a
                    key={p.name}
                    href={p.href!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    {p.name}
                  </a>
                ))}
              </div>
            )}

            {/* Social */}
            {social.length > 0 && (
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-white/35">
                  Follow
                </span>
                {social.map((s) => (
                  <a
                    key={s.name}
                    href={s.href!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    {s.name}
                  </a>
                ))}
              </div>
            )}

            {/* Legal */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-white/35">
                Legal
              </span>
              <Link href="/privacy" className="text-white/60 hover:text-white transition-colors">
                Privacy & Release
              </Link>
            </div>
          </div>
        </div>

        <p className="mt-10 border-t border-white/5 pt-8 text-center text-xs text-white/30">
          © {YEAR} Open Pod Talk. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

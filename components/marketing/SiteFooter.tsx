import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#030303]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-[family-name:var(--font-opt)] text-lg font-bold tracking-tight text-white">
              <span className="text-[#ff6600]">O</span>
              <span className="text-white/90">PEN </span>
              <span className="text-[#ff6600]">P</span>
              <span className="text-white/90">OD </span>
              <span className="text-[#ff6600]">T</span>
              <span className="text-white/90">ALK</span>
            </p>
            <p className="mt-2 max-w-sm text-base font-semibold leading-snug text-white/85">
              all views, just bring it!
            </p>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/50">
              Submit your topic — you might be on the next episode.
            </p>
          </div>
          <div className="flex flex-wrap gap-8 text-sm">
            <div className="flex flex-col gap-2">
              <span className="font-semibold text-white/40 uppercase tracking-wider text-xs">
                Listen
              </span>
              <span className="text-white/60">Wherever you get podcasts</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-semibold text-white/40 uppercase tracking-wider text-xs">
                Participate
              </span>
              <Link href="/submit" className="text-[#ff6600] hover:underline">
                Submit a topic
              </Link>
              <Link href="/" className="text-white/60 hover:text-white">
                Home
              </Link>
            </div>
          </div>
        </div>
        <p className="mt-10 border-t border-white/5 pt-8 text-center text-xs text-white/35">
          © {new Date().getFullYear()} Open Pod Talk. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

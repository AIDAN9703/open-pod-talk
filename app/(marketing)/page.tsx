import type { Metadata } from "next";
import Image from "next/image";
import { StudioShowcase } from "@/components/marketing/StudioShowcase";
import { SubmitDialog } from "@/components/marketing/SubmitDialog";
import { TeeAndTapSection } from "@/components/marketing/TeeAndTapSection";
import { getBroadcastStatus } from "@/lib/broadcast";

const RIVERSIDE_APP_STORE =
  "https://apps.apple.com/us/app/riverside-podcast-video-maker/id1554443872";
const RIVERSIDE_PLAY_STORE =
  "https://play.google.com/store/apps/details?id=riverside.fm&hl=en";

const linkMobileStore =
  "font-medium text-[#ffb380] underline decoration-[#ff6600]/50 underline-offset-2 transition hover:text-white hover:decoration-[#ff6600]";

export const metadata: Metadata = {
  title: "Open Pod Talk — all views, just bring it!",
  description:
    "Live call-in podcast and Jubilee-style bar debates filmed at Tee & Tap. 5 conservatives, 5 liberals, one table. Submit your topic or apply for the panel.",
};

const TICKER_ITEMS = [
  "Live call-ins",
  "No scripts",
  "No hand-picked guests",
  "5v5 bar debates at Tee & Tap",
  "All views, just bring it",
];

function TickerStrip() {
  const row = TICKER_ITEMS.map((item) => (
    <span key={item} className="mx-6 inline-flex items-center gap-6">
      <span className="font-[family-name:var(--font-opt)] text-sm font-bold uppercase tracking-[0.18em] text-white/50">
        {item}
      </span>
      <span className="h-1.5 w-1.5 rounded-full bg-[#ff6600]/70" aria-hidden />
    </span>
  ));

  return (
    <div
      aria-hidden
      className="relative overflow-hidden border-b border-white/10 bg-black/50 py-3"
    >
      <div className="opt-ticker-track">
        <div className="flex shrink-0">{row}</div>
        <div className="flex shrink-0">{row}</div>
      </div>
    </div>
  );
}

export default async function HomePage() {
  const broadcast = await getBroadcastStatus();

  return (
    <main>
      {/* Hero — full-bleed studio backdrop, editorial left-aligned type */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0" aria-hidden>
          <Image
            src="/studio-set-full-view-1.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-40"
          />
          {/* Keep the left column readable, fade the set in from the right */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#060606] from-25% via-[#060606]/75 to-[#060606]/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060606] via-transparent to-[#060606]/70" />
        </div>

        <div className="relative mx-auto flex min-h-[72vh] max-w-6xl flex-col justify-center px-4 py-24 sm:px-6 sm:py-32">
          <p className="opt-eyebrow">Live call-in podcast · Pittsburgh</p>
          <h1 className="opt-display mt-5 max-w-4xl text-[clamp(3.2rem,12vw,5rem)] text-white lg:text-[6rem] xl:text-[6.75rem]">
            All views.
            <br />
            <span className="text-[#ff6600]">Just bring it.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/65 sm:text-xl">
            No hand-picked guests. No scripts. Real callers live on air — and
            5v5 panel debates filmed inside our own bar.
          </p>
          <div className="mt-9 flex w-full max-w-xl flex-col gap-3 sm:flex-row">
            <SubmitDialog label="Stream me in!" variant="primary" currentTopic={broadcast.currentTopic} />
            <a
              href="#tee-and-tap"
              className="flex w-full items-center justify-center rounded-2xl border border-white/25 bg-black/30 py-4 text-base font-semibold text-white/85 backdrop-blur-sm transition hover:border-white/45 hover:bg-white/5 active:scale-[0.99] sm:w-auto md:rounded-full md:px-7 md:py-3.5"
            >
              Join a bar debate ↓
            </a>
          </div>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/40">
            Calling in from a phone? Grab the Riverside app on the{" "}
            <a
              href={RIVERSIDE_APP_STORE}
              target="_blank"
              rel="noopener noreferrer"
              className={linkMobileStore}
            >
              App&nbsp;Store
            </a>{" "}
            or{" "}
            <a
              href={RIVERSIDE_PLAY_STORE}
              target="_blank"
              rel="noopener noreferrer"
              className={linkMobileStore}
            >
              Google&nbsp;Play
            </a>
            .
          </p>
        </div>
      </section>

      <TickerStrip />

      <TeeAndTapSection />

      <StudioShowcase />
    </main>
  );
}

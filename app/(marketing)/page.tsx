import type { Metadata } from "next";
import Image from "next/image";
import { StudioBentoGrid, TopicThumbnailGrid } from "@/components/marketing/StudioBentoGrid";
import { SubmitDialog } from "@/components/marketing/SubmitDialog";
import { TeeAndTapSection } from "@/components/marketing/TeeAndTapSection";
import { WatchLiveSection } from "@/components/marketing/WatchLiveSection";
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

const HOW_IT_WORKS = [
  {
    num: "01",
    title: "Bring your take",
    body: "Submit a topic, a story, or a fight you want to have on the record. Every submission gets read — nothing is pre-scripted.",
  },
  {
    num: "02",
    title: "Get the call",
    body: "If it fits an upcoming show, you get a link, a quick producer check, and a slot. No rehearsal, no question list.",
  },
  {
    num: "03",
    title: "Go on mic",
    body: "You're live with the hosts — or at a table with nine strangers at Tee & Tap. The exchange is the product.",
  },
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
      {/* Hero */}
      <section className="opt-grain relative overflow-hidden border-b border-white/10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_-10%,rgba(255,102,0,0.2),transparent)]" />
        <div className="pointer-events-none absolute top-1/3 -right-40 hidden h-96 w-96 rounded-full bg-[#ff6600]/10 blur-[110px] lg:block" />
        <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:flex lg:items-center lg:gap-14 lg:py-24">
          <div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left">
            <p className="opt-eyebrow">Live call-in podcast · Pittsburgh</p>
            <h1 className="opt-display mt-4 text-[clamp(3rem,11vw,4.4rem)] text-white lg:text-[4.6rem] xl:text-[5.2rem] [text-shadow:0_2px_34px_rgba(255,120,60,0.4),0_0_68px_rgba(255,102,0,0.24)]">
              All views.
              <br />
              <span className="text-[#ff6600]">Just bring it.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/60 sm:text-xl">
              No hand-picked guests. No scripts. Real callers live on air — and
              now, 5v5 panel debates filmed inside our own bar.
            </p>
            <div className="mt-8 flex w-full max-w-xl flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <SubmitDialog label="Stream me in!" variant="primary" currentTopic={broadcast.currentTopic} />
              <a
                href="#tee-and-tap"
                className="flex w-full items-center justify-center rounded-2xl border border-white/20 py-4 text-base font-semibold text-white/85 transition hover:border-white/40 hover:bg-white/5 active:scale-[0.99] sm:w-auto md:rounded-full md:px-7 md:py-3.5"
              >
                Join a bar debate ↓
              </a>
            </div>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/40">
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
          <div className="mt-12 flex flex-1 justify-center lg:mt-0">
            <div className="relative">
              <div className="absolute inset-0 rounded-3xl bg-[#ff6600]/20 blur-3xl" />
              <Image
                src="/logo-with-name.png"
                alt="Open Pod Talk logo"
                width={420}
                height={160}
                className="relative h-auto w-[min(100%,300px)] rounded-3xl object-contain drop-shadow-[0_0_40px_rgba(255,102,0,0.45)] sm:w-[min(100%,360px)] lg:w-full lg:max-w-md"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <TickerStrip />

      <WatchLiveSection showState={broadcast.showState} />

      <TeeAndTapSection />

      {/* Studio */}
      <section id="studio" className="scroll-mt-20 border-b border-white/10 py-16 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-10 max-w-2xl">
            <p className="opt-eyebrow">The studio</p>
            <h2 className="opt-display mt-3 text-4xl text-white sm:text-5xl">
              Built for the back-and-forth
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/60">
              Your topic gets turned into a real exchange. No script or prep —
              just the mic and whatever you came to say.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,24rem)] lg:items-stretch xl:grid-cols-[minmax(0,1fr)_minmax(20rem,26rem)]">
            <StudioBentoGrid />
            <TopicThumbnailGrid />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-b border-white/10 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="opt-eyebrow">How it works</p>
          <h2 className="opt-display mt-3 max-w-2xl text-4xl text-white sm:text-5xl">
            From your couch to on air
          </h2>
          <div className="mt-10 grid gap-4 sm:gap-5 md:grid-cols-3">
            {HOW_IT_WORKS.map((step) => (
              <div
                key={step.num}
                className="rounded-2xl border border-white/10 bg-[#0a0a0a] p-6 ring-1 ring-white/[0.04]"
              >
                <span className="font-[family-name:var(--font-opt)] text-sm font-black text-[#ff6600]">
                  {step.num}
                </span>
                <h3 className="mt-2 font-[family-name:var(--font-opt)] text-lg font-bold text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="opt-grain relative overflow-hidden py-16 sm:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_50%_110%,rgba(255,102,0,0.18),transparent)]" />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="opt-display text-4xl text-white sm:text-5xl">
            Got a take? <span className="text-[#ff6600]">Prove it.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/55">
            Call into the show from anywhere, or take a seat at the Tee &amp; Tap
            table. Either way — bring it.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <SubmitDialog label="Stream me in!" variant="primary" currentTopic={broadcast.currentTopic} />
            <a
              href="#tee-and-tap"
              className="flex w-full items-center justify-center rounded-2xl border border-white/20 py-4 text-base font-semibold text-white/85 transition hover:border-white/40 hover:bg-white/5 sm:w-auto md:rounded-full md:px-7 md:py-3.5"
            >
              Apply for the panel
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

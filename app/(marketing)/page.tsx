import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { StudioShowcase } from "@/components/marketing/StudioShowcase";
import { SubmitDialog } from "@/components/marketing/SubmitDialog";
import { getBroadcastStatus } from "@/lib/broadcast";

const RIVERSIDE_APP_STORE =
  "https://apps.apple.com/us/app/riverside-podcast-video-maker/id1554443872";
const RIVERSIDE_PLAY_STORE =
  "https://play.google.com/store/apps/details?id=riverside.fm&hl=en";

const inlineLink =
  "font-medium text-[#ffb380] underline decoration-[#ff6600]/50 underline-offset-2 transition hover:text-white hover:decoration-[#ff6600]";

export const metadata: Metadata = {
  title: "Open Pod Talk — all views, just bring it!",
  description:
    "Live call-in podcast from Pittsburgh, plus The Tee & Tap Sessions: a filmed 2v2 debate series at our bar. Call in, or apply for a seat at the table.",
};

const TICKER_ITEMS = [
  "Live call-ins",
  "No scripts",
  "No hand-picked guests",
  "2v2 bar debates at Tee & Tap",
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

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3 text-sm leading-relaxed text-white/60">
      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff6600]" />
      <span>{children}</span>
    </li>
  );
}

export default async function HomePage() {
  const broadcast = await getBroadcastStatus();

  return (
    <main>
      {/* Hero */}
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
          <div className="absolute inset-0 bg-gradient-to-r from-[#060606] from-25% via-[#060606]/75 to-[#060606]/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060606] via-transparent to-[#060606]/70" />
        </div>

        <div className="relative mx-auto flex min-h-[68vh] max-w-6xl flex-col justify-center px-4 py-24 sm:px-6 sm:py-32">
          <p className="opt-eyebrow">Live call-in podcast · Pittsburgh</p>
          <h1 className="opt-display mt-5 max-w-4xl text-[clamp(3.2rem,12vw,5rem)] text-white lg:text-[6rem] xl:text-[6.75rem]">
            All views.
            <br />
            <span className="text-[#ff6600]">Just bring it.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/65 sm:text-xl">
            No hand-picked guests. No scripts. Real callers live on air, and a
            filmed 2v2 debate series at our own bar.
          </p>
          <div className="mt-9 flex w-full max-w-xl flex-col gap-3 sm:flex-row">
            <SubmitDialog label="Stream me in!" variant="primary" currentTopic={broadcast.currentTopic} />
            <Link
              href="/casting"
              className="flex w-full items-center justify-center rounded-2xl border border-white/25 bg-black/30 py-4 text-base font-semibold text-white/85 backdrop-blur-sm transition hover:border-white/45 hover:bg-white/5 active:scale-[0.99] sm:w-auto md:rounded-full md:px-7 md:py-3.5"
            >
              Apply for the panel →
            </Link>
          </div>
        </div>
      </section>

      <TickerStrip />

      {/* Two ways on the show */}
      <section className="border-b border-white/10 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <p className="opt-eyebrow">Two ways on the show</p>
            <h2 className="opt-display mt-3 text-4xl text-white sm:text-5xl">
              Call in, or take a seat
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 md:gap-6">
            {/* Call in */}
            <div className="flex flex-col rounded-2xl border border-white/10 bg-[#0a0a0a] p-7 ring-1 ring-white/[0.04] sm:p-8">
              <p className="opt-eyebrow">The live show · from anywhere</p>
              <h3 className="mt-3 font-[family-name:var(--font-opt)] text-2xl font-bold text-white sm:text-3xl">
                Stream in and say it
              </h3>
              <p className="mt-3 text-base leading-relaxed text-white/60">
                Submit a topic, get a quick producer screen, and come on mic cold
                with the hosts. We don&apos;t share questions in advance. The
                exchange is the product.
              </p>
              <ul className="mt-5 space-y-2.5">
                <Bullet>Runs on Riverside in your browser. No app to install on a laptop.</Bullet>
                <Bullet>Wired headphones and a quiet room are the only requirements.</Bullet>
                <Bullet>If your topic fits, you get a studio link at least 48 hours ahead.</Bullet>
              </ul>
              <div className="mt-auto pt-7">
                <SubmitDialog label="Stream me in!" variant="outline" currentTopic={broadcast.currentTopic} />
              </div>
              <p className="mt-4 text-xs leading-relaxed text-white/40">
                Calling from a phone? Get the Riverside app on the{" "}
                <a href={RIVERSIDE_APP_STORE} target="_blank" rel="noopener noreferrer" className={inlineLink}>
                  App&nbsp;Store
                </a>{" "}
                or{" "}
                <a href={RIVERSIDE_PLAY_STORE} target="_blank" rel="noopener noreferrer" className={inlineLink}>
                  Google&nbsp;Play
                </a>
                .
              </p>
            </div>

            {/* Take a seat */}
            <div className="relative flex flex-col overflow-hidden rounded-2xl border border-[#ff6600]/30 bg-[#0a0a0a] p-7 shadow-[0_0_60px_rgba(255,102,0,0.08)] ring-1 ring-white/[0.04] sm:p-8">
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-side-red/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-side-blue/10 blur-3xl" />
              <p className="opt-eyebrow">The Tee &amp; Tap Sessions · in person</p>
              <h3 className="relative mt-3 font-[family-name:var(--font-opt)] text-2xl font-bold text-white sm:text-3xl">
                <span className="text-side-red">2 conservatives.</span>{" "}
                <span className="text-side-blue">2 liberals.</span> One table.
              </h3>
              <p className="relative mt-3 text-base leading-relaxed text-white/60">
                A filmed debate series inside our bar with Mark moderating. A claim
                goes up, you defend your side, and the other side pushes back.
              </p>
              <ul className="relative mt-5 space-y-2.5">
                <Bullet>Paid $50 an hour, about $150 for the recording. Food and drinks included.</Bullet>
                <Bullet>Cast by hand, both sides at once, so the table stays even.</Bullet>
                <Bullet>Evenings, scheduled with each cast. 18+.</Bullet>
              </ul>
              <div className="relative mt-auto pt-7">
                <Link
                  href="/casting"
                  className="flex w-full items-center justify-center rounded-2xl bg-[#ff6600] py-4 text-base font-semibold text-white shadow-[0_0_32px_rgba(255,102,0,0.4)] transition hover:bg-[#ff781a] active:scale-[0.99] md:inline-flex md:w-auto md:rounded-full md:px-8 md:py-3.5 md:active:scale-100"
                >
                  See the casting call →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <StudioShowcase />
    </main>
  );
}

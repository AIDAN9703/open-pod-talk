import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { StudioShowcase } from "@/components/marketing/StudioShowcase";
import { SubmitDialog } from "@/components/marketing/SubmitDialog";
import { getBroadcastStatus } from "@/lib/broadcast";

export const metadata: Metadata = {
  title: "Open Pod Talk — all views, just bring it!",
  description:
    "A paid, moderated panel recording in Pittsburgh for people who lean right and people who lean left. Apply to be a guest.",
};

const TICKER_ITEMS = [
  "Recorded in person",
  "No scripts",
  "No hand-picked pundits",
  "Paid panel recordings",
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
    <div aria-hidden className="relative overflow-hidden border-b border-white/10 bg-black/50 py-3">
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
            className="object-cover object-center opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#060606]/85 from-10% via-[#060606]/45 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060606] via-transparent to-[#060606]/40" />
        </div>

        <div className="relative mx-auto flex min-h-[68vh] max-w-6xl flex-col justify-center px-4 py-24 sm:px-6 sm:py-32">
          <p className="opt-eyebrow">A podcast recorded in Pittsburgh</p>
          <h1 className="opt-display mt-5 max-w-4xl text-[clamp(3.2rem,12vw,5rem)] text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.6)] lg:text-[6rem] xl:text-[6.75rem]">
            All views.
            <br />
            <span className="text-[#ff6600]">Just bring it.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75 drop-shadow-[0_1px_12px_rgba(0,0,0,0.7)] sm:text-xl">
            A moderated panel recording for people who lean right and people who
            lean left. Real people, real arguments, no script.
          </p>
          <div className="mt-9 flex w-full max-w-xl flex-col gap-3 sm:flex-row">
            <Link
              href="/casting"
              className="flex w-full items-center justify-center rounded-2xl bg-[#ff6600] py-4 text-base font-semibold text-white shadow-[0_0_32px_rgba(255,102,0,0.4)] transition hover:bg-[#ff781a] hover:shadow-[0_0_40px_rgba(255,102,0,0.55)] active:scale-[0.99] sm:w-auto md:rounded-full md:px-8 md:py-3.5 md:active:scale-100"
            >
              Studio sit-in →
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
              Call in or studio visit
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 md:gap-6">
            <div className="flex flex-col rounded-2xl border border-white/10 bg-[#0a0a0a] p-7 ring-1 ring-white/[0.04] sm:p-8">
              <p className="opt-eyebrow">Call in · from anywhere</p>
              <h3 className="mt-3 font-[family-name:var(--font-opt)] text-2xl font-bold text-white sm:text-3xl">
                Stream in and say it
              </h3>
              <ul className="mt-5 space-y-2.5">
                <Bullet>Submit a topic, get a quick producer screen, and come on mic cold with the hosts.</Bullet>
                <Bullet>Runs on Riverside in your browser. Wired headphones and a quiet room are the only requirements.</Bullet>
                <Bullet>If your topic fits, you get a studio link at least 48 hours ahead.</Bullet>
              </ul>
              <div className="mt-auto pt-7">
                <SubmitDialog label="Stream me in!" variant="outline" currentTopic={broadcast.currentTopic} />
              </div>
            </div>

            <div className="relative flex flex-col overflow-hidden rounded-2xl border border-[#ff6600]/30 bg-[#0a0a0a] p-7 shadow-[0_0_60px_rgba(255,102,0,0.08)] ring-1 ring-white/[0.04] sm:p-8">
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-side-red/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-side-blue/10 blur-3xl" />
              <p className="opt-eyebrow">Studio visit · in person</p>
              <h3 className="relative mt-3 font-[family-name:var(--font-opt)] text-2xl font-bold text-white sm:text-3xl">
                <span className="text-side-red">Conservative views.</span>{" "}
                <span className="text-side-blue">Liberal views.</span> One table.
              </h3>
              <ul className="relative mt-5 space-y-2.5">
                <Bullet>A moderated panel recording with Mark in the chair. A topic goes up, you defend your side, the other side pushes back.</Bullet>
                <Bullet>Paid $35 an hour, about $105 for the recording. Food and drinks included.</Bullet>
                <Bullet>Cast by hand, both sides at once. Evenings in Pittsburgh. 18+. Good panelists get invited back.</Bullet>
              </ul>
              <div className="relative mt-auto pt-7">
                <Link
                  href="/casting"
                  className="flex w-full items-center justify-center rounded-2xl bg-[#ff6600] py-4 text-base font-semibold text-white shadow-[0_0_32px_rgba(255,102,0,0.4)] transition hover:bg-[#ff781a] active:scale-[0.99] md:inline-flex md:w-auto md:rounded-full md:px-8 md:py-3.5 md:active:scale-100"
                >
                  Request studio seat →
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

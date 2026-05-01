import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { VersionSwitcher } from "@/components/marketing/VersionSwitcher";

export const metadata: Metadata = {
  title: "Open Pod Talk — all views, just bring it!",
  description:
    "all views, just bring it! Open Pod Talk (OPT): live podcast with real callers. Submit your story, debate, or hot take.",
};

export default function HomePageV3() {
  return (
    <main>

      {/* ── FULL-SCREEN TYPE HERO ── */}
      <section className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden border-b border-white/10 px-4 pb-12 pt-10 sm:px-8 sm:pb-16">

        {/* Subtle orange tint bottom-left */}
        <div className="pointer-events-none absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full bg-[#ff6600]/10 blur-[120px]" />

        {/* Top label row */}
        <div className="relative z-10 flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-white/30">
            Open Pod Talk
          </span>
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-white/30">
            Live podcast — real callers
          </span>
        </div>

        {/* Main stacked headline — fills the screen */}
        <div className="relative z-10 my-auto py-8">
          <h1 className="font-[family-name:var(--font-opt)] font-black uppercase leading-[0.88] tracking-[-0.06em] text-white">
            {/* "ALL" line */}
            <span className="block text-[clamp(4.5rem,18vw,14rem)]">
              ALL
            </span>
            {/* "VIEWS," line — orange */}
            <span className="block text-[clamp(4.5rem,18vw,14rem)] text-[#ff6600] [text-shadow:0_0_80px_rgba(255,102,0,0.35)]">
              VIEWS,
            </span>
            {/* Thin divider line */}
            <span className="my-4 block h-px w-full bg-white/10 sm:my-6" aria-hidden />
            {/* "JUST" line — dimmed */}
            <span className="block text-[clamp(4.5rem,18vw,14rem)] text-white/25">
              JUST
            </span>
            {/* "BRING IT." line */}
            <span className="block text-[clamp(4.5rem,18vw,14rem)]">
              BRING IT.
            </span>
          </h1>
        </div>

        {/* Bottom: tagline + CTA */}
        <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-sm text-base leading-relaxed text-white/50 sm:text-lg">
            The call-in podcast where your take gets put on the mic, not in the
            comments. Live, unscripted, weekly.
          </p>
          <div className="shrink-0">
            <Link
              href="/submit"
              className="group inline-flex items-center gap-3 rounded-full border border-white/20 px-7 py-3.5 text-base font-semibold text-white transition hover:border-[#ff6600] hover:bg-[#ff6600]/10"
            >
              Put me on air
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── FULL-BLEED STUDIO IMAGE ── */}
      <section className="relative border-b border-white/10">
        <div className="relative aspect-[16/7] w-full overflow-hidden">
          <Image
            src="/open-pod-talk-studio.png"
            alt="Open Pod Talk studio — host desk, neon sign, leather chairs"
            fill
            className="object-cover object-center"
          />
          {/* Side vignettes */}
          <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#050505] to-transparent" />
          <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[#050505] to-transparent" />
          {/* Floating caption */}
          <div className="absolute bottom-6 left-8 right-8 flex items-end justify-between">
            <p className="text-xs uppercase tracking-[0.25em] text-white/40">
              The studio
            </p>
            <p className="text-xs uppercase tracking-[0.25em] text-white/40">
              Riverside.fm — live recording
            </p>
          </div>
        </div>
      </section>

      {/* ── THE FORMAT ── */}
      <section className="border-b border-white/10 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-8">
          <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">

            {/* Label */}
            <div className="lg:pt-2">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#ff6600]">
                The format
              </p>
              <h2 className="mt-4 font-[family-name:var(--font-opt)] text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
                A show built on the back-and-forth.
              </h2>
            </div>

            {/* Three rules */}
            <div className="space-y-0 divide-y divide-white/[0.08]">
              {[
                {
                  n: "I",
                  rule: "You come on live.",
                  detail:
                    "No pre-recorded inserts. You're in a Riverside studio link, live with the hosts, streamed to YouTube.",
                },
                {
                  n: "II",
                  rule: "No script. No pre-approval.",
                  detail:
                    "We don't see your talking points. You don't see our questions. The exchange is the product.",
                },
                {
                  n: "III",
                  rule: "One sharp topic.",
                  detail:
                    "Debate, story, hot take, or grievance. As long as you can back it up, we want to hear it.",
                },
              ].map(({ n, rule, detail }) => (
                <div key={n} className="flex gap-6 py-8">
                  <span className="w-8 shrink-0 font-[family-name:var(--font-opt)] text-lg font-black text-[#ff6600]/60">
                    {n}
                  </span>
                  <div>
                    <p className="font-[family-name:var(--font-opt)] text-lg font-bold text-white">
                      {rule}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-white/45">{detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS AS LARGE NUMBERED LIST ── */}
      <section className="border-b border-white/10 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-8">
          <p className="mb-12 text-xs font-bold uppercase tracking-[0.3em] text-white/30">
            How to get on
          </p>
          <div className="grid gap-0 divide-y divide-white/[0.07] sm:grid-cols-2 sm:divide-y-0 sm:divide-x">
            {[
              {
                n: "01",
                title: "Submit",
                body: "Name, timezone, one sharp headline. Fill out the form — it takes 3 minutes.",
              },
              {
                n: "02",
                title: "Get the call",
                body: "If we pick you, you hear back 48 hrs out. A Riverside link and a 10-min tech check.",
              },
              {
                n: "03",
                title: "Tech check",
                body: "Wired headphones, Chrome or Edge on desktop, quiet room. Riverside runs a quick test.",
              },
              {
                n: "04",
                title: "On air",
                body: "Live with the hosts. Clipped and up on YouTube, Apple, Spotify same day.",
              },
            ].map(({ n, title, body }) => (
              <div key={n} className="px-0 py-10 sm:px-10 sm:first:pl-0 sm:last:pr-0">
                <span className="font-[family-name:var(--font-opt)] text-[2.5rem] font-black leading-none text-white/10">
                  {n}
                </span>
                <h3 className="mt-3 font-[family-name:var(--font-opt)] text-xl font-bold text-white">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/45">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA — minimal, just type and a button ── */}
      <section className="py-28 sm:py-36">
        <div className="mx-auto max-w-6xl px-4 sm:px-8">
          <div className="flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="font-[family-name:var(--font-opt)] text-[clamp(2.5rem,7vw,5rem)] font-black uppercase leading-[0.93] tracking-[-0.04em] text-white">
              YOUR TAKE,
              <br />
              <span className="text-[#ff6600]">ON MIC.</span>
            </h2>
            <div className="shrink-0 pb-1">
              <Link
                href="/submit"
                className="group inline-flex items-center gap-4 rounded-full bg-[#ff6600] px-10 py-4 text-base font-bold text-white shadow-[0_0_48px_rgba(255,102,0,0.4)] transition hover:bg-[#ff781a] hover:shadow-[0_0_64px_rgba(255,102,0,0.55)] active:scale-[0.97]"
              >
                Submit your topic
                <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <p className="mt-3 text-center text-xs text-white/30">
                Worst case — silence. Best case — this week.
              </p>
            </div>
          </div>
        </div>
      </section>

      <VersionSwitcher />
    </main>
  );
}

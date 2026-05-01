import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { VersionSwitcher } from "@/components/marketing/VersionSwitcher";

export const metadata: Metadata = {
  title: "Open Pod Talk — all views, just bring it!",
  description:
    "all views, just bring it! Open Pod Talk (OPT): live podcast with real callers. Submit your story, debate, or hot take.",
};

const EXAMPLE_TOPICS = [
  "Is remote work actually killing your career?",
  "My landlord ghosted me for 3 months — what I did next",
  "I voted the wrong party my whole life and I'm changing",
  "The algorithm controls you more than you think",
  "Why I quit a $200k job to start over from zero",
  "Dating apps are destroying how we relate to each other",
  "My city is pricing out the people who built it",
  "I reported my manager and here's what happened",
  "Gen Z doesn't want your hustle culture",
  "AI took my creative job and I'm not ok",
];

export default function HomePageV2() {
  return (
    <main className="overflow-hidden">

      {/* ── HERO: Full-bleed studio photo with overlay ── */}
      <section className="relative min-h-[90vh] flex flex-col justify-end">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/open-pod-talk-studio.png"
            alt=""
            fill
            className="object-cover object-center"
            priority
          />
          {/* Dark gradient overlay — bottom-heavy so text pops */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/75 to-[#050505]/30" />
          {/* Orange side bleed */}
        </div>


        {/* Hero content */}
        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6 sm:pb-24">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[#ff6600]">
            Open Pod Talk
          </p>
          <h1 className="font-[family-name:var(--font-opt)] text-[clamp(3rem,9vw,6.5rem)] font-black uppercase leading-[0.92] tracking-[-0.04em] text-white">
            ALL VIEWS,
            <br />
            <span className="text-[#ff6600] [text-shadow:0_0_60px_rgba(255,102,0,0.5)]">
              JUST BRING IT.
            </span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/65">
            Real callers, live on mic. If your topic is sharp enough, you&apos;re
            not in the comments — you&apos;re in the chair.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/submit"
              className="inline-flex items-center justify-center rounded-full bg-[#ff6600] px-9 py-4 text-base font-bold text-white shadow-[0_0_40px_rgba(255,102,0,0.45)] transition hover:bg-[#ff781a] hover:shadow-[0_0_56px_rgba(255,102,0,0.6)] active:scale-[0.97]"
            >
              Put me on air →
            </Link>
            <Link
              href="/episodes"
              className="inline-flex items-center justify-center rounded-full border border-white/25 px-9 py-4 text-base font-medium text-white/80 backdrop-blur-sm transition hover:border-white/45 hover:bg-white/8"
            >
              Past episodes
            </Link>
          </div>
        </div>
      </section>

      {/* ── SCROLLING TOPIC TICKER ── */}
      <div className="relative border-y border-[#ff6600]/30 bg-[#ff6600]/6 py-3 overflow-hidden">
        <div className="flex animate-[ticker_30s_linear_infinite] whitespace-nowrap">
          {[...EXAMPLE_TOPICS, ...EXAMPLE_TOPICS].map((topic, i) => (
            <span key={i} className="mx-6 text-sm font-medium text-white/55">
              <span className="mr-6 text-[#ff6600]">◆</span>
              {topic}
            </span>
          ))}
        </div>
        <style>{`
          @keyframes ticker {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>

      {/* ── THREE STATS ── */}
      <section className="border-b border-white/10 py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <dl className="grid grid-cols-1 gap-px sm:grid-cols-3">
            {[
              { value: "100%", label: "Real callers — zero actors or plants" },
              { value: "Live", label: "Streamed to YouTube every week" },
              { value: "0", label: "Scripts. No pre-approved talking points." },
            ].map(({ value, label }) => (
              <div
                key={value}
                className="flex flex-col items-center gap-2 px-6 py-8 text-center first:border-b first:border-white/10 sm:border-r sm:border-b-0 sm:last:border-r-0"
              >
                <dt className="font-[family-name:var(--font-opt)] text-5xl font-black text-[#ff6600]">
                  {value}
                </dt>
                <dd className="max-w-[16ch] text-sm leading-snug text-white/50">{label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── HOW TO GET ON ── */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-start">
            {/* Left: steps */}
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-[#ff6600]">
                How to get on the show
              </p>
              <h2 className="font-[family-name:var(--font-opt)] text-3xl font-extrabold text-white sm:text-4xl">
                Four steps from idea to air
              </h2>

              <ol className="mt-10 space-y-0">
                {[
                  {
                    n: "01",
                    title: "Submit your topic",
                    body: "Name, timezone, and one sharp headline. We read everything.",
                  },
                  {
                    n: "02",
                    title: "Get shortlisted",
                    body: "If we pick you, you'll hear back 48 hrs before the episode. No ghosting.",
                  },
                  {
                    n: "03",
                    title: "Quick tech check",
                    body: "10 minutes in Riverside — wired headphones, Chrome or Edge, quiet room.",
                  },
                  {
                    n: "04",
                    title: "You're on air",
                    body: "Live with our hosts. The real exchange. Clipped and published same day.",
                  },
                ].map(({ n, title, body }, i, arr) => (
                  <li key={n} className="flex gap-5">
                    <div className="flex flex-col items-center">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#ff6600]/40 bg-[#ff6600]/10 font-[family-name:var(--font-opt)] text-sm font-black text-[#ff6600]">
                        {n}
                      </div>
                      {i < arr.length - 1 && (
                        <div className="mt-1 h-full w-px bg-gradient-to-b from-[#ff6600]/30 to-transparent" />
                      )}
                    </div>
                    <div className="pb-10">
                      <h3 className="font-[family-name:var(--font-opt)] font-bold text-white">
                        {title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-white/50">{body}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <Link
                href="/submit"
                className="mt-2 inline-flex items-center justify-center rounded-full bg-[#ff6600] px-8 py-3.5 text-sm font-bold text-white shadow-[0_0_28px_rgba(255,102,0,0.35)] transition hover:bg-[#ff781a]"
              >
                Start your submission
              </Link>
            </div>

            {/* Right: logo + tagline */}
            <div className="hidden lg:flex lg:flex-col lg:items-center lg:justify-center">
              <div className="relative w-full max-w-sm">
                <div className="absolute inset-0 rounded-[2rem] bg-[#ff6600]/18 blur-3xl" />
                <Image
                  src="/open-pod-talk-logo.png"
                  alt="Open Pod Talk"
                  width={480}
                  height={200}
                  className="relative h-auto w-full object-contain drop-shadow-[0_0_50px_rgba(255,102,0,0.4)]"
                />
              </div>
              <div className="mt-8 rounded-2xl border border-[#ff6600]/20 bg-[#ff6600]/6 px-6 py-5 text-center">
                <p className="font-[family-name:var(--font-opt)] text-lg font-bold uppercase tracking-wide text-white">
                  All views.
                </p>
                <p className="mt-1 text-sm text-white/50">No filters. No pre-approval. No script.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CLOSING CTA — orange panel ── */}
      <section className="bg-[#ff6600] py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-white/60">
            Open Pod Talk
          </p>
          <h2 className="font-[family-name:var(--font-opt)] text-4xl font-black uppercase leading-[0.95] tracking-[-0.03em] text-white sm:text-5xl">
            YOUR TAKE DESERVES
            <br />
            MORE THAN A COMMENT.
          </h2>
          <p className="mt-5 text-lg font-medium text-white/70">
            Worst case — we pass. Best case — you&apos;re on mic this week.
          </p>
          <Link
            href="/submit"
            className="mt-10 inline-flex items-center justify-center rounded-full bg-black px-12 py-4 text-base font-bold text-white shadow-[0_8px_40px_rgba(0,0,0,0.4)] transition hover:bg-[#111] active:scale-[0.97]"
          >
            Submit your topic →
          </Link>
        </div>
      </section>

      <VersionSwitcher />
    </main>
  );
}

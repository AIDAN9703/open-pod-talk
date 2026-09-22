import type { Metadata } from "next";
import Link from "next/link";
import { CastingSides } from "@/components/marketing/CastingSides";

export const metadata: Metadata = {
  title: "Casting call: panelists who lean right or left",
  description:
    "Open Pod Talk is casting people who lean right and people who lean left for a paid, moderated panel recording in Pittsburgh. $35 an hour, food and drinks included, 18+.",
};

const FACTS = [
  { label: "Pay", value: "$35 an hour" },
  { label: "Typical recording", value: "About 3 hours" },
  { label: "On the house", value: "Food and drinks" },
  { label: "Where", value: "Pittsburgh, in person" },
  { label: "Age", value: "18+" },
  { label: "Repeat panelists", value: "We invite people back" },
] as const;

const STEPS = [
  {
    num: "01",
    title: "Check in",
    body:
      "Arrive 45 minutes before call time with a photo ID. We confirm your paperwork, get you a seat and a mic check, and you show up sober.",
  },
  {
    num: "02",
    title: "Sit down",
    body:
      "Four seats, one table. A topic goes up, you take a side, and you defend it while the other side pushes back. Mark moderates and keeps it fair. Once we're rolling, drinks at the table are fine, and they're on us.",
  },
  {
    num: "03",
    title: "Wrap",
    body:
      "About three hours door to door, paid at $35 an hour for your time on site. The recording goes out on YouTube and the podcast, clips follow, and if you held your own, you'll hear from us about the next one.",
  },
] as const;

const FAQ = [
  {
    q: "Do I need debate experience?",
    a: "No. We cast for conviction and composure, not credentials. If you can say what you believe and hold your ground for ten minutes of pushback without shouting, you're qualified.",
  },
  {
    q: "Is it really paid?",
    a: "Yes. $35 an hour for your time on site, which works out to about $105 for a typical recording, paid after the session. Food and drinks are included.",
  },
  {
    q: "Do you invite people back?",
    a: "Often. Good panelists are the hardest thing to find, so if you hold your own you'll be first on the list for the next recording.",
  },
  {
    q: "Can this help me build a name?",
    a: "If that's what you're after, yes. Every recording goes out on YouTube and the podcast, clips go out on social, and we tag you so you can share them. Plenty of people have used a table like this to get noticed.",
  },
  {
    q: "What do I sign?",
    a: "A standard appearance release, a liability waiver, a code of conduct, and a short confidentiality agreement about not spoiling the episode before it's out. They arrive by e-signature once you're cast, and they're written in plain English.",
  },
  {
    q: "Will my name be on screen?",
    a: "Panelists are on camera; that's the format. You can ask to be shown by first name and last initial. Full anonymity isn't possible for panel recordings.",
  },
  {
    q: "Can I drink?",
    a: "Show up sober. Once recording starts, drinks at the table are fine and on us. If the moderator thinks you've had enough, you're done for the night.",
  },
  {
    q: "When are recordings?",
    a: "Evenings, scheduled with each cast. Tell us which evenings work in your application and we'll match you to a date.",
  },
  {
    q: "How do you pick people?",
    a: "We read every application, do a 15-minute video call with everyone we're considering, and cast both sides at once so the table stays balanced. Not picked this round doesn't mean never; we cast new panels regularly.",
  },
] as const;

export default function CastingPage() {
  return (
    <div>
      {/* Header */}
      <section className="opt-grain relative overflow-hidden border-b border-white/10 py-16 sm:py-24">
        <div className="pointer-events-none absolute -top-32 left-[8%] h-96 w-96 rounded-full bg-side-red/10 blur-[120px]" />
        <div className="pointer-events-none absolute -top-32 right-[8%] h-96 w-96 rounded-full bg-side-blue/10 blur-[120px]" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <Link
            href="/"
            className="text-sm font-medium text-[#ffb380]/90 transition-colors hover:text-[#ff8533]"
          >
            ← Back home
          </Link>

          <div className="mx-auto mt-8 max-w-3xl text-center">
            <p className="opt-eyebrow">Now casting · Pittsburgh</p>
            <h1 className="opt-display mt-4 text-[clamp(2.2rem,6.5vw,4.25rem)] text-white">
              
              <br />
              <span className="text-side-red"></span>
              <br />
              <span className="text-side-blue"></span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/60">
              
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="#apply"
                className="inline-flex w-full items-center justify-center rounded-full bg-[#ff6600] px-8 py-3.5 text-base font-bold text-white shadow-[0_0_24px_rgba(255,102,0,0.35)] transition hover:bg-[#ff781a] sm:w-auto"
              >
                Apply for a seat ↓
              </a>
              <a
                href="#how-it-goes"
                className="inline-flex w-full items-center justify-center rounded-full border border-white/20 px-8 py-3.5 text-base font-medium text-white/80 transition hover:border-white/40 hover:bg-white/5 sm:w-auto"
              >
                How a recording goes
              </a>
            </div>
          </div>

          {/* Facts strip */}
          <dl className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3 lg:grid-cols-6">
            {FACTS.map((f) => (
              <div key={f.label} className="bg-[#0a0a0a] px-5 py-4">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">
                  {f.label}
                </dt>
                <dd className="mt-1 font-[family-name:var(--font-opt)] text-base font-bold text-white sm:text-lg">
                  {f.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* How a recording goes */}
      <section id="how-it-goes" className="scroll-mt-20 border-b border-white/10 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="opt-eyebrow">The night</p>
          <h2 className="opt-display mt-3 text-4xl text-white sm:text-5xl">
            How a recording goes
          </h2>
          <div className="mt-10 grid gap-4 sm:gap-5 md:grid-cols-3">
            {STEPS.map((step) => (
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

      {/* Apply */}
      <section id="apply" className="scroll-mt-20 border-b border-white/10 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="opt-eyebrow">Who we&apos;re casting</p>
            <h2 className="opt-display mt-3 text-4xl text-white sm:text-5xl">
              Pick your side of the table
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/55">
              Every seat is cast by hand and both sides are cast at once, so the
              table stays even. The application takes about three minutes.
            </p>
          </div>
          <div className="mt-12">
            <CastingSides />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="opt-eyebrow">Things to know</p>
          <h2 className="opt-display mt-3 text-4xl text-white sm:text-5xl">
            Before you apply
          </h2>
          <div className="mt-8 divide-y divide-white/[0.08]">
            {FAQ.map(({ q, a }) => (
              <div key={q} className="py-5">
                <h3 className="font-semibold text-white">{q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">{a}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-white/45">
            Questions before you apply? Email{" "}
            <a
              href="mailto:openpodtalk@gmail.com"
              className="font-medium text-[#ffb380] underline decoration-[#ff6600]/40 underline-offset-2 transition hover:text-white"
            >
              openpodtalk@gmail.com
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
}

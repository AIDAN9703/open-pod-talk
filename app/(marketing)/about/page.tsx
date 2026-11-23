import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { StreamInButton } from "@/components/marketing/StreamIn";

export const metadata: Metadata = {
  title: "About — Open Pod Talk",
  description:
    "Open Pod Talk is a stream-in podcast for all views. Anyone can stream in and say their piece. All views, just bring it.",
};

const HOW_IT_WORKS = [
  {
    title: "Anyone can stream in",
    body: "Our studio link is on the home page. Click it, allow your camera and mic, and you're in. No sign-up, no application.",
  },
  {
    title: "All views",
    body: "Left, right, or somewhere in between. Every side gets a turn, and Mark keeps it moving.",
  },
  {
    title: "No script",
    body: "Nobody gets questions in advance. The real back-and-forth is the show.",
  },
  {
    title: "Recorded clean",
    body: "We run on Riverside, which records everyone locally, so the episode sounds good even if your connection hiccups.",
  },
] as const;

const FAQ = [
  {
    q: "Who can stream in?",
    a: "Anyone 18 or older. Click the stream-in link, allow your camera and mic, and Mark brings people on as the conversation goes.",
  },
  {
    q: "What do I need?",
    a: "A phone or computer with a camera and mic, a decent connection, and a quiet spot. Headphones help a lot. It runs in your browser, so there's nothing to download on a computer.",
  },
  {
    q: "Is this scripted?",
    a: "No. There's a moderator and a topic, but no script.",
  },
  {
    q: "Where can I watch or listen?",
    a: "Live on YouTube, with episodes and clips going up after. Links are at the bottom of the page.",
  },
  {
    q: "What happens to my recording?",
    a: "Everything is recorded and may be published. By streaming in, you allow Open Pod Talk to use your voice, likeness, and statements in episodes and clips. The full terms are on our privacy page.",
  },
  {
    q: "How do I reach you?",
    a: "Email openpodtalk@gmail.com.",
  },
] as const;

export default function AboutPage() {
  return (
    <div className="relative py-16 sm:py-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(ellipse_60%_60%_at_50%_0%,rgba(255,102,0,0.14),transparent)]" />
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
        <Link href="/" className="text-sm font-medium text-[#ffb380]/90 hover:text-[#ff8533]">
          ← Back home
        </Link>

        {/* Hero */}
        <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="opt-eyebrow">The show</p>
            <h1 className="opt-display mt-3 text-4xl text-white sm:text-5xl">
              All views. <span className="text-[#ff6600]">Just bring it.</span>
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-white/65">
              Open Pod Talk is a stream-in podcast for all views. Anyone can
              click our link, jump on, and say their piece, with Mark Raymond
              moderating.
            </p>
            <div className="mt-8">
              <StreamInButton />
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-[#ff6600]/15 blur-3xl" />
            <Image
              src="/studio-main-table.webp"
              alt="The Open Pod Talk studio table"
              width={600}
              height={800}
              className="relative max-h-[28rem] w-full rounded-2xl border border-white/10 object-cover shadow-[0_24px_64px_rgba(0,0,0,0.5)]"
            />
          </div>
        </div>

        {/* How it works */}
        <section className="mt-20">
          <p className="opt-eyebrow">Format</p>
          <h2 className="opt-display mt-3 text-3xl text-white">How the show works</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {HOW_IT_WORKS.map((item) => (
              <div key={item.title} className="rounded-xl border border-white/10 bg-[#0a0a0a] p-5">
                <h3 className="font-[family-name:var(--font-opt)] font-bold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-20">
          <p className="opt-eyebrow">FAQ</p>
          <h2 className="opt-display mt-3 text-3xl text-white">Frequently asked questions</h2>
          <div className="mt-6 divide-y divide-white/[0.08]">
            {FAQ.map(({ q, a }) => (
              <div key={q} className="py-5">
                <h3 className="font-semibold text-white">{q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-16 rounded-2xl border border-[#ff6600]/25 bg-[#ff6600]/8 p-8 text-center">
          <h2 className="opt-display text-3xl text-white">Ready to be on the show?</h2>
          <p className="mt-3 text-white/55">The link is open. Click it and you&apos;re in.</p>
          <StreamInButton className="mt-6" />
        </section>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — Open Pod Talk",
  description:
    "What is Open Pod Talk? A live call-in podcast and Jubilee-style bar debate series filmed at Tee & Tap. All views, just bring it.",
};

const FAQ = [
  {
    q: "Who can call in?",
    a: "Anyone 18 or older with a topic, a debate, a story, or a hot take. We read every submission — no topic is too niche or too blunt, as long as you can back it up.",
  },
  {
    q: "What are the Tee & Tap sessions?",
    a: "Our Jubilee-style panel series filmed inside Tee & Tap, the bar we own. We close the whole place for the taping, set a table with two conservatives and two liberals (plus the occasional wildcard), put our moderator Mark at the head of it, and film the debate. Apply at openpodtalk.com/casting — every seat is cast by hand.",
  },
  {
    q: "Do Tee & Tap panelists need debate experience?",
    a: "No. We're casting for conviction and composure, not credentials. If you can state what you believe and hold your ground for ten minutes of pushback without shouting, you're qualified.",
  },
  {
    q: "Do Tee & Tap panelists get paid?",
    a: "Yes. $50 an hour for your time on site, which works out to about $150 for the recording. Food and drinks are included. Show up sober — drinks at the table during the recording are fine — and you'll sign a standard appearance release and liability waiver before you sit down.",
  },
  {
    q: "What do I need to participate remotely?",
    a: "Chrome or Edge on a desktop or laptop, wired headphones (not AirPods or Bluetooth), a quiet room, and at least 10 Mbps upload. We run on Riverside.fm — no app to download, just a browser link.",
  },
  {
    q: "How long does it take to hear back?",
    a: "We review submissions on a rolling basis. If your topic fits an upcoming episode, you'll get a heads-up at least 48 hours in advance with a Riverside studio link and a 10-minute tech check time.",
  },
  {
    q: "Do I have to be on camera?",
    a: "Camera is optional for remote callers; audio is required. Tee & Tap panelists are on camera — that's the format. We record both video and audio on our end, locally on your device, so a network hiccup won't kill the quality.",
  },
  {
    q: "Where can I watch or listen?",
    a: "We stream live on YouTube, and the edited episode goes up on Apple Podcasts, Spotify, YouTube Music, and Amazon Music. Clips go up on social in the days after.",
  },
  {
    q: "Is this scripted?",
    a: "No. We have a format but no script. The whole point is the real back-and-forth — we don't edit the argument out of it.",
  },
  {
    q: "What happens to my recording?",
    a: "By submitting and appearing on the show, you grant Open Pod Talk a perpetual license to use your voice, likeness, and statements in the episode and clips. Full legal language is on our privacy page.",
  },
  {
    q: "Can I be anonymous?",
    a: "Remote callers can ask to use a first name only or a pseudonym on air. We still need your real contact info internally to send you the studio link and manage scheduling. Panelists appear on camera, so anonymity isn't possible for Tee & Tap tapings.",
  },
];

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
              Open Pod Talk is built around one idea: the best conversations
              happen when real people bring real topics — not guests who have
              already rehearsed their sound bite.
            </p>
            <p className="mt-4 text-base leading-relaxed text-white/50">
              It runs in two formats. The live call-in show pulls callers from a
              public submission queue and puts them on mic with our hosts. And
              the Tee &amp; Tap sessions put two conservatives and two liberals
              at one table inside our bar with Mark moderating — whole venue
              shut down, cameras rolling, Jubilee-style.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/submit"
                className="inline-flex items-center justify-center rounded-full bg-[#ff6600] px-7 py-3 text-sm font-bold text-white shadow-[0_0_24px_rgba(255,102,0,0.35)] transition hover:bg-[#ff781a]"
              >
                Submit your topic
              </Link>
              <Link
                href="/casting"
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-7 py-3 text-sm font-medium text-white/80 transition hover:border-white/40 hover:bg-white/5"
              >
                Join a Tee &amp; Tap panel
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-[#ff6600]/15 blur-3xl" />
            <Image
              src="/studio-set-full-view-1.png"
              alt="Open Pod Talk studio"
              width={600}
              height={400}
              className="relative w-full rounded-2xl border border-white/10 object-cover shadow-[0_24px_64px_rgba(0,0,0,0.5)]"
            />
          </div>
        </div>

        {/* How it works */}
        <section className="mt-20">
          <p className="opt-eyebrow">Format</p>
          <h2 className="opt-display mt-3 text-3xl text-white">
            How the show works
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "Live every week",
                body: "We broadcast live on YouTube every week. The full episode goes into the podcast feed within 24 hours.",
              },
              {
                title: "Real callers, not guests",
                body: "Callers submit a topic, get screened, and come on mic cold. We don't share questions in advance. The exchange is the product.",
              },
              {
                title: "Tee & Tap panel tapings",
                body: "We film 2v2 debates inside Tee & Tap — our bar, closed to the public for the shoot. Panels are cast from applications to keep both sides even.",
              },
              {
                title: "Studio-grade recording",
                body: "Every call is recorded locally via Riverside.fm — per-participant uncompressed audio, regardless of internet quality. The podcast sounds clean even when the debate gets loud.",
              },
              {
                title: "30-second producer screen",
                body: "Every caller waits in a lobby. Our producer confirms identity, checks your headphones, and does a mic level check before you're on air. No cold calls go straight to the host.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-white/10 bg-[#0a0a0a] p-5"
              >
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
          <h2 className="opt-display mt-3 text-3xl text-white">
            Frequently asked questions
          </h2>
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
          <h2 className="opt-display text-3xl text-white">
            Ready to be on the show?
          </h2>
          <p className="mt-3 text-white/55">
            Worst case — silence. Best case — you&apos;re on mic this week.
          </p>
          <Link
            href="/submit"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-[#ff6600] px-10 py-3.5 text-base font-bold text-white shadow-[0_0_28px_rgba(255,102,0,0.4)] transition hover:bg-[#ff781a]"
          >
            Submit your topic →
          </Link>
        </section>
      </div>
    </div>
  );
}

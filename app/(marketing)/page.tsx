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

const TOPIC_SIGNS = [
  { src: "/topic-corruption.png", alt: "Corruption" },
  { src: "/topic-sports-trash-talk.png", alt: "Sports trash talk" },
  { src: "/topic-mainstream-media.png", alt: "Mainstream media" },
  { src: "/topic-artificial-intelligence.webp", alt: "Artificial intelligence" },
  { src: "/topic-police-ice.png", alt: "Police and ICE" },
  { src: "/topic-left-right-wing.png", alt: "Left wing, right wing" },
  { src: "/topic-gender-question.png", alt: "Gender" },
] as const;

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
          {/* Topic signs in a row across the top, AI in the center */}
          <ul className="mb-10 grid grid-cols-7 gap-2 sm:mb-14 sm:gap-3" aria-label="Topics on the table lately">
            {TOPIC_SIGNS.map((sign) => (
              <li
                key={sign.src}
                className="relative aspect-[4/3] overflow-hidden rounded-lg bg-black/30 shadow-[0_10px_30px_rgba(0,0,0,0.5)] sm:rounded-2xl"
              >
                <Image src={sign.src} alt={sign.alt} fill sizes="(max-width: 640px) 14vw, 160px" className="object-contain" />
              </li>
            ))}
          </ul>
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
            <SubmitDialog label="Stream in →" variant="primary" currentTopic={broadcast.currentTopic} />
            <Link
              href="/casting"
              className="flex w-full items-center justify-center rounded-2xl border border-white/25 bg-black/30 py-4 text-base font-semibold text-white/85 backdrop-blur-sm transition hover:border-white/45 hover:bg-white/5 active:scale-[0.99] sm:w-auto md:rounded-full md:px-8 md:py-3.5"
            >
              In person →
            </Link>
          </div>
        </div>
      </section>

      <TickerStrip />

      <StudioShowcase />
    </main>
  );
}

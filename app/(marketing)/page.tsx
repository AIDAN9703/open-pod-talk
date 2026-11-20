import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { StudioShowcase } from "@/components/marketing/StudioShowcase";

export const metadata: Metadata = {
  title: "Open Pod Talk — all views, just bring it!",
  description:
    "A paid, moderated panel recording in Pittsburgh for people who lean right and people who lean left. Apply to be a guest.",
};

const TOPIC_SIGNS = [
  { src: "/topic-corruption.png", alt: "Corruption" },
  { src: "/topic-politics-logo.webp", alt: "Politics: elephant and donkey face off", card: "bg-white", position: "scale-[1.3]" },
  { src: "/topic-mainstream-media.png", alt: "Mainstream media" },
  { src: "/topic-artificial-intelligence.webp", alt: "Artificial intelligence", position: "object-top" },
  { src: "/topic-police-ice.png", alt: "Police and ICE" },
  { src: "/topic-left-right-wing.png", alt: "Left wing, right wing" },
  { src: "/topic-gender-question.png", alt: "Gender" },
] as const;

const SIDES = [
  { label: "Conservative", sub: "Right", cls: "border-side-red/60 bg-side-red/20 hover:bg-side-red/30" },
  { label: "Liberal", sub: "Left", cls: "border-side-blue/60 bg-side-blue/20 hover:bg-side-blue/30" },
] as const;

export default function HomePage() {
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

        <div className="relative mx-auto flex min-h-[68vh] max-w-6xl flex-col justify-center px-4 py-20 sm:px-6 sm:py-28">
          {/* Topic signs: one even row, AI in the center */}
          <ul className="grid grid-cols-7 gap-2 sm:gap-3" aria-label="Topics on the table lately">
            {TOPIC_SIGNS.map((sign) => (
              <li
                key={sign.src}
                className={`relative aspect-[4/3] overflow-hidden rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.5)] ring-1 ring-white/15 sm:rounded-xl ${"card" in sign ? sign.card : "bg-black"}`}
              >
                <Image
                  src={sign.src}
                  alt={sign.alt}
                  fill
                  sizes="(max-width: 640px) 14vw, 160px"
                  className={`object-cover ${"position" in sign ? sign.position : "object-center"}`}
                />
              </li>
            ))}
          </ul>

          {/* The two sides */}
          <div className="relative mt-4 flex items-stretch justify-between gap-4 sm:mt-5">
            <span
              aria-hidden
              className="opt-display pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] sm:text-7xl"
            >
              VS
            </span>
            {SIDES.map((side) => (
              <Link
                key={side.label}
                href="/casting"
                className={`flex w-40 flex-col items-center justify-center rounded-xl border px-4 py-3 text-center backdrop-blur-sm transition sm:w-56 sm:py-4 ${side.cls}`}
              >
                <span className="font-[family-name:var(--font-opt)] text-sm font-extrabold uppercase tracking-[0.14em] text-white sm:text-base">
                  {side.label}
                </span>
                <span className="mt-0.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                  {side.sub}
                </span>
              </Link>
            ))}
          </div>

          <h1 className="opt-display mt-10 max-w-4xl text-[clamp(3.2rem,12vw,5rem)] text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.6)] sm:mt-14 lg:text-[6rem] xl:text-[6.75rem]">
            All views.
            <br />
            <span className="text-[#ff6600]">Just bring it.</span>
          </h1>
        </div>
      </section>

      <StudioShowcase />
    </main>
  );
}

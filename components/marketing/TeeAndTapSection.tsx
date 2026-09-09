import { PanelApplyDialog } from "@/components/marketing/PanelApplyDialog";

const TEE_AND_TAP_URL = "https://teeandtaps.com";

const FORMAT_CARDS = [
  {
    num: "01",
    title: "The panel",
    body: "Four people, two sides, one table in the middle of the bar. Two conservatives across from two liberals, with Mark in the moderator's chair keeping it fair — nobody feeds lines, no pre-screened talking points.",
  },
  {
    num: "02",
    title: "The format",
    body: "Jubilee-style prompts: a claim goes up, you take a stance, and you defend it while the other side pushes back. The camera stays rolling through the whole exchange.",
  },
  {
    num: "03",
    title: "The venue",
    body: "Filmed inside Tee & Tap — our massive bar. We close the whole place for the taping, so the panel gets the floor to itself. Food and drinks are on us.",
  },
] as const;

function SideCard({
  side,
  title,
  bullets,
  lean,
}: {
  side: "red" | "blue";
  title: string;
  bullets: string[];
  lean: "conservative" | "liberal";
}) {
  const accent =
    side === "red"
      ? {
          border: "border-side-red/35",
          glow: "shadow-[0_0_60px_rgba(229,72,77,0.12)]",
          chip: "border-side-red/50 bg-side-red/15 text-red-200",
          dot: "bg-side-red",
          button:
            "flex w-full items-center justify-center rounded-xl border border-side-red/50 bg-side-red/15 py-3.5 text-sm font-bold text-red-100 transition hover:border-side-red hover:bg-side-red/25 active:scale-[0.99]",
        }
      : {
          border: "border-side-blue/35",
          glow: "shadow-[0_0_60px_rgba(62,131,248,0.12)]",
          chip: "border-side-blue/50 bg-side-blue/15 text-blue-200",
          dot: "bg-side-blue",
          button:
            "flex w-full items-center justify-center rounded-xl border border-side-blue/50 bg-side-blue/15 py-3.5 text-sm font-bold text-blue-100 transition hover:border-side-blue hover:bg-side-blue/25 active:scale-[0.99]",
        };

  return (
    <div
      className={`flex flex-col rounded-2xl border ${accent.border} bg-[#0a0a0a] p-6 ${accent.glow} sm:p-8`}
    >
      <span
        className={`inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-widest ${accent.chip}`}
      >
        <span className={`h-1.5 w-1.5 rounded-full ${accent.dot}`} />
        Now casting
      </span>
      <h3 className="opt-display mt-4 text-3xl text-white sm:text-4xl">{title}</h3>
      <ul className="mt-5 flex-1 space-y-3">
        {bullets.map((b) => (
          <li key={b} className="flex gap-3 text-sm leading-relaxed text-white/60">
            <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${accent.dot}`} />
            {b}
          </li>
        ))}
      </ul>
      <div className="mt-7">
        <PanelApplyDialog
          label={`Apply as a ${lean}`}
          defaultLean={lean}
          className={accent.button}
        />
      </div>
    </div>
  );
}

export function TeeAndTapSection() {
  return (
    <section
      id="tee-and-tap"
      className="opt-grain relative scroll-mt-20 overflow-hidden border-b border-white/10 py-16 sm:py-24"
    >
      {/* Red/blue split glow behind the section */}
      <div className="pointer-events-none absolute -top-32 left-[8%] h-96 w-96 rounded-full bg-side-red/10 blur-[120px]" />
      <div className="pointer-events-none absolute -top-32 right-[8%] h-96 w-96 rounded-full bg-side-blue/10 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="opt-eyebrow">Casting call — The Tee &amp; Tap Sessions</p>
          <h2 className="opt-display mt-4 text-[clamp(2.4rem,7vw,4.5rem)] text-white">
            <span className="text-side-red">2 conservatives.</span>{" "}
            <span className="text-side-blue">2 liberals.</span>
            <br />
            One bar.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/60">
            Open Pod Talk is launching a Jubilee-style panel series filmed inside{" "}
            <a
              href={TEE_AND_TAP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#ffb380] underline decoration-[#ff6600]/50 underline-offset-2 transition hover:text-white hover:decoration-[#ff6600]"
            >
              Tee &amp; Tap
            </a>
            . On taping nights we shut the whole bar down, set up the cameras, and
            put four strangers with opposite politics at one table with Mark
            moderating. Panelists are paid $50 an hour for their time on site,
            about $150 for the recording, and food and drinks are included.
            We&apos;re casting the panels now.
          </p>
        </div>

        {/* Format cards */}
        <div className="mt-14 grid gap-4 sm:gap-5 md:grid-cols-3">
          {FORMAT_CARDS.map((card) => (
            <div
              key={card.num}
              className="rounded-2xl border border-white/10 bg-[#0a0a0a] p-6 ring-1 ring-white/[0.04]"
            >
              <span className="font-[family-name:var(--font-opt)] text-sm font-black text-[#ff6600]">
                {card.num}
              </span>
              <h3 className="mt-2 font-[family-name:var(--font-opt)] text-lg font-bold text-white">
                {card.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">{card.body}</p>
            </div>
          ))}
        </div>

        {/* The two sides */}
        <div className="relative mt-12 grid gap-5 md:grid-cols-2 md:gap-6">
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 md:block">
            <span className="opt-display rounded-full border border-white/15 bg-[#060606] px-4 py-2 text-lg text-white/80">
              VS
            </span>
          </div>
          <SideCard
            side="red"
            lean="conservative"
            title="The right side of the table"
            bullets={[
              "You lean conservative and can actually argue it — not just repeat it.",
              "You can take ten minutes of pushback without melting down or shouting over people.",
              "You can get to the Pittsburgh area for an evening taping.",
            ]}
          />
          <SideCard
            side="blue"
            lean="liberal"
            title="The left side of the table"
            bullets={[
              "You lean liberal and came to defend it in the room, not in the replies.",
              "You'd rather change one mind at the table than dunk for the clip.",
              "You can get to the Pittsburgh area for an evening taping.",
            ]}
          />
        </div>

        <div className="mx-auto mt-10 max-w-2xl text-center">
          <p className="text-sm leading-relaxed text-white/45">
            Don&apos;t fit neatly on either side? We keep wildcard seats for
            independents, libertarians, and the genuinely unclassifiable.
          </p>
          <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <PanelApplyDialog
              label="Apply as a wildcard"
              defaultLean="other"
              className="inline-flex w-full items-center justify-center rounded-xl border border-white/20 px-6 py-3 text-sm font-semibold text-white/80 transition hover:border-white/40 hover:bg-white/5 sm:w-auto"
            />
            <a
              href={TEE_AND_TAP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center rounded-xl border border-[#ff6600]/40 px-6 py-3 text-sm font-semibold text-[#ffb380] transition hover:border-[#ff6600] hover:bg-[#ff6600]/10 sm:w-auto"
            >
              Check out the venue ↗
            </a>
          </div>
          <p className="mt-4 text-xs text-white/35">
            18+. Filmed on location at Tee &amp; Tap. Show up sober; drinks at the
            table during the recording are fine. Panelists appear on camera and
            in clips — the release agreement is part of the application.
          </p>
        </div>
      </div>
    </section>
  );
}

import { PanelApplyDialog } from "@/components/marketing/PanelApplyDialog";

const TEE_AND_TAP_URL = "https://teeandtaps.com";

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
        Two seats per taping
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

/** The two apply cards plus the wildcard row. Used on /casting. */
export function CastingSides() {
  return (
    <div>
      <div className="relative grid gap-5 md:grid-cols-2 md:gap-6">
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
            "You lean conservative and can actually argue it, not just repeat it.",
            "You can take ten minutes of pushback without shouting over people or melting down.",
            "You're 18 or older and can get to the Pittsburgh area for an evening taping.",
          ]}
        />
        <SideCard
          side="blue"
          lean="liberal"
          title="The left side of the table"
          bullets={[
            "You lean liberal and came to defend it in the room, not in the replies.",
            "You'd rather change one mind at the table than dunk for the clip.",
            "You're 18 or older and can get to the Pittsburgh area for an evening taping.",
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
          18+. Filmed on location at Tee &amp; Tap. Panelists appear on camera and
          in clips; the release agreement is part of the application.
        </p>
      </div>
    </div>
  );
}

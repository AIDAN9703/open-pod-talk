import type { Metadata } from "next";
import { CastingForm } from "@/components/marketing/CastingForm";

export const metadata: Metadata = {
  title: "Casting: apply to be on the panel",
  description:
    "Open Pod Talk is casting people who lean right and people who lean left for a paid panel recording in Pittsburgh. $35 an hour, 18+.",
};

const FACTS = ["$35 an hour", "About 3 hours", "Pittsburgh, in person", "18+", "Starts November 2026"];

export default function CastingPage() {
  return (
    <div className="py-14 sm:py-20">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <p className="opt-eyebrow">Now casting</p>
        <h1 className="opt-display mt-3 text-4xl text-white sm:text-5xl">
          Lean <span className="text-side-red">right</span>? Lean{" "}
          <span className="text-side-blue">left</span>? Apply.
        </h1>
        <p className="mt-5 text-base leading-relaxed text-white/60">
          We&apos;re casting a paid panel recording: two people from each side, one table,
          and a moderator. No experience needed.
        </p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {FACTS.map((f) => (
            <li
              key={f}
              className="rounded-full border border-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/70"
            >
              {f}
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <CastingForm />
        </div>

        <p className="mt-6 text-sm text-white/45">
          Questions? Email{" "}
          <a
            href="mailto:openpodtalk@gmail.com"
            className="font-medium text-[#ffb380] underline decoration-[#ff6600]/40 underline-offset-2 transition hover:text-white"
          >
            openpodtalk@gmail.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}

import Link from "next/link";
import { RIVERSIDE_URL } from "@/lib/site";

const STEPS = [
  "Click the button. It opens our Riverside studio in your browser.",
  "Allow your camera and mic. Headphones help.",
  "You're in. Mark brings you on when it's your turn.",
] as const;

/** Orange button that opens the open Riverside studio in a new tab. */
export function StreamInButton({ className = "" }: { className?: string }) {
  if (!RIVERSIDE_URL) {
    return (
      <span
        className={`inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-3.5 text-base font-bold text-white/60 ${className}`}
      >
        Stream-in link coming soon
      </span>
    );
  }
  return (
    <a
      href={RIVERSIDE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-[#ff6600] px-8 py-3.5 text-base font-bold text-white shadow-[0_0_28px_rgba(255,102,0,0.45)] transition hover:bg-[#ff781a] ${className}`}
    >
      Stream in now <span aria-hidden>→</span>
    </a>
  );
}

/** Home page section: how to stream in, plus the button. */
export function StreamInSection() {
  return (
    <section id="stream-in" className="scroll-mt-28 border-b border-white/10 py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <p className="opt-eyebrow">Stream in</p>
        <h2 className="opt-display mt-3 text-4xl text-white sm:text-5xl">
          Jump on the show. <span className="text-[#ff6600]">Anytime.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-white/60">
          No sign-up, no waiting list. Our studio link is open. Click it and you&apos;re in.
        </p>

        <ol className="mx-auto mt-8 grid max-w-2xl gap-3 text-left sm:grid-cols-3">
          {STEPS.map((step, i) => (
            <li
              key={step}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm text-white/75"
            >
              <span className="opt-display mb-1 block text-2xl text-[#ff6600]">{i + 1}</span>
              {step}
            </li>
          ))}
        </ol>

        <StreamInButton className="mt-8" />

        <p className="mx-auto mt-4 max-w-md text-xs text-white/40">
          18+. Everything is recorded and may be published. By joining you agree to our{" "}
          <Link href="/privacy" className="underline hover:text-white/70">
            privacy &amp; release terms
          </Link>
          .
        </p>
      </div>
    </section>
  );
}

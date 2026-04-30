import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Open Pod Talk — all views, just bring it!",
  description:
    "all views, just bring it! Open Pod Talk (OPT): live podcast with real callers. Submit your story, debate, or hot take.",
};

const steps = [
  {
    step: "01",
    title: "Submit",
    body: "Tell us who you are, what time zone you're in, and the headline for your topic.",
  },
  {
    step: "02",
    title: "Review",
    body: "We read every submission. Shortlist gets a heads-up — no ghosting.",
  },
  {
    step: "03",
    title: "Tech check",
    body: "You’ll hop into Riverside with wired headphones on desktop Chrome or Edge.",
  },
  {
    step: "04",
    title: "On air",
    body: "You’re live with the hosts — conversation-first, clipped for the replay.",
  },
] as const;

export default function HomePage() {
  return (
    <main>
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_-10%,rgba(255,102,0,0.22),transparent)]" />
        <div className="pointer-events-none absolute -right-40 top-1/4 h-96 w-96 rounded-full bg-[#ff6600]/12 blur-[100px]" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:flex lg:items-center lg:gap-12 lg:py-28">
          <div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left">
            <div className="mb-10 lg:hidden">
              <Image
                src="/open-pod-talk-logo.png"
                alt="Open Pod Talk logo"
                width={320}
                height={120}
                className="mx-auto h-auto w-[min(100%,280px)] object-contain drop-shadow-[0_0_24px_rgba(255,102,0,0.35)]"
                priority
              />
            </div>
            <h1 className="font-[family-name:var(--font-opt)] text-4xl font-black uppercase leading-[0.98] tracking-[-0.055em] text-white sm:text-6xl lg:text-[3.8rem] xl:text-[4.35rem] [font-stretch:condensed] [text-shadow:0_0_1px_rgba(255,255,255,0.75),0_2px_34px_rgba(255,120,60,0.46),0_0_68px_rgba(255,102,0,0.28)]">
              ALL VIEWS, JUST BRING IT !
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/65">
              Real callers, real debates, zero script polish. Pitch your topic —
              if we pick you, you&apos;re on mic with us, not stuck in the comments.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/submit"
                className="inline-flex items-center justify-center rounded-full bg-[#ff6600] px-8 py-3.5 text-base font-semibold text-white shadow-[0_0_32px_rgba(255,102,0,0.4)] transition hover:bg-[#ff781a] hover:shadow-[0_0_40px_rgba(255,102,0,0.55)]"
              >
                Put me on air
              </Link>
              <a
                href="#studio"
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-3.5 text-base font-medium text-white/90 transition hover:border-white/40 hover:bg-white/5"
              >
                See the studio
              </a>
            </div>
          </div>
          <div className="mt-16 hidden flex-1 justify-center lg:mt-0 lg:flex">
            <div className="relative">
              <div className="absolute inset-0 rounded-3xl bg-[#ff6600]/20 blur-3xl" />
              <Image
                src="/open-pod-talk-logo.png"
                alt=""
                width={420}
                height={160}
                className="relative h-auto w-full max-w-md rounded-3xl object-contain drop-shadow-[0_0_40px_rgba(255,102,0,0.45)]"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section id="studio" className="scroll-mt-20 border-b border-white/10 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="relative lg:order-first">
              <div className="absolute -inset-4 rounded-[2rem] bg-[#ff6600]/20 blur-3xl" />
              <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0a0a0a] shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
                <Image
                  src="/open-pod-talk-studio.png"
                  alt="Open Pod Talk studio with host desk, chairs, wall signs, and neon logo"
                  width={1024}
                  height={582}
                  className="h-auto w-full object-cover"
                />
              </div>
            </div>
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#ffb380]">
                Inside the room
              </p>
              <h2 className="font-[family-name:var(--font-opt)] text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Built for the back-and-forth
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-white/60">
                The Open Pod Talk studio is set up like a live conversation room:
                leather chairs, the host desk, wall signs, and that neon OPT glow
                behind the mic.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-white/45">
                This is where your topic gets pulled off the form and turned into
                a real exchange — all views, just bring it.
              </p>
              <Link
                href="/submit"
                className="mt-8 inline-flex items-center justify-center rounded-full border border-[#ff6600]/45 bg-[#ff6600]/10 px-6 py-3 text-sm font-semibold text-[#ffb380] transition hover:border-[#ff6600] hover:bg-[#ff6600]/20"
              >
                Pitch your topic
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="scroll-mt-20 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-[family-name:var(--font-opt)] text-center text-3xl font-bold tracking-tight sm:text-4xl">
            From your idea to the episode
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-white/55">
            No mystery process. Here&apos;s exactly what happens after you hit
            submit.
          </p>
          <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(({ step, title, body }) => (
              <li
                key={step}
                className="relative rounded-2xl border border-white/10 bg-[#0a0a0a] p-6 pt-12"
              >
                <span className="absolute left-6 top-6 font-[family-name:var(--font-opt)] text-3xl font-black text-[#ff6600]/90">
                  {step}
                </span>
                <h3 className="font-[family-name:var(--font-opt)] text-lg font-bold text-white">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-white/10 bg-gradient-to-b from-[#ff6600]/[0.12] to-transparent py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="font-[family-name:var(--font-opt)] text-3xl font-bold tracking-tight sm:text-4xl">
            all views, just bring it!
          </h2>
          <p className="mt-4 text-lg text-white/65">
            We&apos;re always hunting for the next segment that sparks something.
            Worst case, silence. Best case — you&apos;re on mic this week.
          </p>
          <Link
            href="/submit"
            className="mt-10 inline-flex items-center justify-center rounded-full bg-white px-10 py-4 text-base font-bold text-[#0a0a0a] transition hover:bg-white/90"
          >
            Submit your topic
          </Link>
        </div>
      </section>
    </main>
  );
}

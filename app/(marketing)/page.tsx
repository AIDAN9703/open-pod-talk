import type { Metadata } from "next";
import Image from "next/image";
import { VersionSwitcher } from "@/components/marketing/VersionSwitcher";
import { SubmitDialog } from "@/components/marketing/SubmitDialog";

export const metadata: Metadata = {
  title: "Open Pod Talk — all views, just bring it!",
  description:
    "all views, just bring it! Open Pod Talk (OPT): live podcast with real callers. Submit your story, debate, or hot take.",
};

export default function HomePage() {
  return (
    <main>
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_-10%,rgba(255,102,0,0.22),transparent)]" />
        <div className="pointer-events-none absolute -right-40 top-1/4 h-96 w-96 rounded-full bg-[#ff6600]/12 blur-[100px]" />
        <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:flex lg:items-end lg:gap-12 lg:py-16">
          <div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left">
            <div className="mb-10 lg:hidden">
              <Image
                src="/logo-with-name.png"
                alt="Open Pod Talk logo"
                width={320}
                height={120}
                className="mx-auto h-auto w-[min(100%,280px)] object-contain drop-shadow-[0_0_24px_rgba(255,102,0,0.35)]"
                priority
              />
            </div>
            <h1 className="font-[family-name:var(--font-opt)] text-5xl font-black uppercase leading-[0.98] tracking-[-0.055em] text-white sm:text-6xl lg:text-[3.8rem] xl:text-[4.35rem] [font-stretch:condensed] [text-shadow:0_0_1px_rgba(255,255,255,0.75),0_2px_34px_rgba(255,120,60,0.46),0_0_68px_rgba(255,102,0,0.28)]">
              ALL VIEWS JUST BRING IT !
            </h1>
            <p className="mt-2 max-w-xl text-2xl leading-relaxed text-white/65">
              No hand picked guests or callers.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <SubmitDialog label="Put me on air" variant="primary" />
            </div>
            <p className="mt-4 max-w-xl rounded-xl px-4 text-sm leading-relaxed text-[#ffd2b3]">
              Download Riverside app
              <br />
              if using mobile device.
            </p>
          </div>
          <div className="hidden flex-1 justify-center lg:flex">
            <div className="relative">
              <div className="absolute inset-0 rounded-3xl bg-[#ff6600]/20 blur-3xl" />
              <Image
                src="/logo-with-name.png"
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

      <section id="studio" className="scroll-mt-20 border-b border-white/10 pb-16 pt-8 sm:pb-20 sm:pt-10">
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
              <h2 className="font-[family-name:var(--font-opt)] text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Built for the back-and-forth
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-white/60">
                Your topic gets turned into a real exchange. No script or prep —
                just the mic and whatever you came to say.
              </p>
              <div className="mt-8">
                <SubmitDialog label="Pitch your topic" variant="outline" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <VersionSwitcher />
    </main>
  );
}

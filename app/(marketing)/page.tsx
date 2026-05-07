import type { Metadata } from "next";
import Image from "next/image";
import { StudioBentoGrid, TopicThumbnailGrid } from "@/components/marketing/StudioBentoGrid";
import { SubmitDialog } from "@/components/marketing/SubmitDialog";
import { getBroadcastStatus } from "@/lib/broadcast";

const RIVERSIDE_APP_STORE =
  "https://apps.apple.com/us/app/riverside-podcast-video-maker/id1554443872";
const RIVERSIDE_PLAY_STORE =
  "https://play.google.com/store/apps/details?id=riverside.fm&hl=en";

const linkMobileStore =
  "font-medium text-[#ffb380] underline decoration-[#ff6600]/50 underline-offset-2 transition hover:text-white hover:decoration-[#ff6600]";

export const metadata: Metadata = {
  title: "Open Pod Talk — all views, just bring it!",
  description:
    "all views, just bring it! Open Pod Talk (OPT): live podcast with real callers. Submit your story, debate, or hot take.",
};

export default async function HomePage() {
  const { currentTopic } = await getBroadcastStatus();

  return (
    <main>
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_-10%,rgba(255,102,0,0.22),transparent)]" />
        <div className="pointer-events-none absolute -right-40 top-1/4 h-96 w-96 rounded-full bg-[#ff6600]/12 blur-[100px]" />
        <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:flex lg:items-end lg:gap-12 lg:py-16">
          <div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left">
            <div className="relative mb-10 lg:hidden">
              <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[#ff6600]/20 blur-2xl" />
              <div className="relative overflow-hidden rounded-3xl">
                <Image
                  src="/logo-with-name.png"
                  alt="Open Pod Talk logo"
                  width={320}
                  height={120}
                  className="mx-auto h-auto w-[min(100%,280px)] object-contain drop-shadow-[0_0_24px_rgba(255,102,0,0.35)]"
                  priority
                />
              </div>
            </div>
            <h1 className="max-w-[19ch] font-[family-name:var(--font-opt)] text-[clamp(2.125rem,7vw,2.75rem)] font-black uppercase leading-[0.98] tracking-[-0.055em] text-white sm:max-w-none sm:text-5xl md:text-6xl lg:text-[3.8rem] xl:text-[4.35rem] [font-stretch:condensed] [text-shadow:0_0_1px_rgba(255,255,255,0.75),0_2px_34px_rgba(255,120,60,0.46),0_0_68px_rgba(255,102,0,0.28)]">
              ALL VIEWS JUST BRING IT{"\u00a0"}!
            </h1>
            <p className="mt-2 max-w-xl text-2xl leading-relaxed text-white/65">
              No hand picked guests or callers.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <SubmitDialog label="Put me on air" variant="primary" currentTopic={currentTopic} />
            </div>
            <p className="mt-4 max-w-xl rounded-xl px-4 text-sm leading-relaxed text-[#ffd2b3]">
              On mobile, download the{" "}
              <a
                href={RIVERSIDE_APP_STORE}
                target="_blank"
                rel="noopener noreferrer"
                className={linkMobileStore}
              >
                Riverside app (App&nbsp;Store)
              </a>{" "}
              or{" "}
              <a
                href={RIVERSIDE_PLAY_STORE}
                target="_blank"
                rel="noopener noreferrer"
                className={linkMobileStore}
              >
                Google&nbsp;Play
              </a>
              .
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

      <section id="studio" className="scroll-mt-20 border-b border-white/10 py-16 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,24rem)] lg:items-stretch xl:grid-cols-[minmax(0,1fr)_minmax(20rem,26rem)]">
            <StudioBentoGrid />
            <div className="grid gap-6 lg:grid-rows-2">
              <TopicThumbnailGrid />
              <div>
                <h2 className="font-[family-name:var(--font-opt)] text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Built for the back-and-forth
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-white/60">
                  Your topic gets turned into a real exchange. No script or prep —
                  just the mic and whatever you came to say.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}

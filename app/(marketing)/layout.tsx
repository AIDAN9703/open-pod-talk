import Link from "next/link";
import { InPersonRequestDialog } from "@/components/marketing/InPersonRequestDialog";
import { RecordingNoticeSignup } from "@/components/marketing/RecordingNoticeSignup";
import { SiteFooter } from "@/components/marketing/SiteFooter";
import { SiteNav } from "@/components/marketing/SiteNav";
import { getBroadcastStatus } from "@/lib/broadcast";

/** Supabase-backed live flag must not be frozen at build time. */
export const dynamic = "force-dynamic";

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const broadcast = await getBroadcastStatus();

  return (
    <div className="flex min-h-full flex-col bg-[#060606] text-white">
      <SiteNav showState={broadcast.showState} currentTopic={broadcast.currentTopic} />
      {broadcast.showState === "live" && (
        <div className="border-b border-emerald-500/40 bg-emerald-950/60 px-4 py-2.5 text-center text-sm leading-snug text-emerald-50">
          <strong className="mr-1.5 font-bold uppercase tracking-wide text-emerald-200">
            On air
          </strong>
          We&apos;re live right now —{" "}
          <Link href="/watch" className="font-semibold underline underline-offset-2 hover:text-white">
            watch the stream
          </Link>{" "}
          or open your podcast app.
        </div>
      )}
      {broadcast.showState === "recording" && (
        <div className="border-b border-emerald-500/35 bg-emerald-950/50 px-4 py-2.5 text-center text-sm leading-snug text-emerald-50">
          <strong className="mr-1.5 font-bold uppercase tracking-wide text-emerald-200">
            Recording
          </strong>
          We&apos;re in session capturing the podcast — not livestreaming right now.
        </div>
      )}
      <div className="flex-1">{children}</div>

      {/* Get involved band */}
      <section
        aria-label="Get involved"
        className="border-t border-white/10 bg-[#080808] px-4 py-12 sm:py-16"
      >
        <div className="mx-auto grid w-full max-w-5xl gap-10 sm:px-2 md:grid-cols-2 md:gap-8">
          <div className="text-center md:text-left">
            <p className="opt-eyebrow">In-studio guest</p>
            <h2 className="mt-2 font-[family-name:var(--font-opt)] text-xl font-bold text-white">
              Want a seat in the studio?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/55 md:mx-0">
              We host in-person guests in the Pittsburgh area. Remote callers use{" "}
              <span className="text-white/85">Stream me in!</span> at the top of the page.
            </p>
            <div className="mt-5 flex justify-center md:justify-start">
              <div className="w-full max-w-md md:w-auto md:max-w-none">
                <InPersonRequestDialog />
              </div>
            </div>
          </div>
          <div className="text-center md:text-left">
            <p className="opt-eyebrow">Recording notices</p>
            <h2 className="mt-2 font-[family-name:var(--font-opt)] text-xl font-bold text-white">
              Know when we hit record
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/55 md:mx-0">
              A quick email right before we go into session — nothing else, and you
              can unsubscribe from the email itself.
            </p>
            <RecordingNoticeSignup />
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}

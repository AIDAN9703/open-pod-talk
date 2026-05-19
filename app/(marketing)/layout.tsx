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
    <div className="flex min-h-full flex-col bg-[#050505] text-white">
      <SiteNav showState={broadcast.showState} currentTopic={broadcast.currentTopic} />
      {broadcast.showState === "live" && (
        <div className="border-b border-emerald-500/40 bg-emerald-950/60 px-4 py-2.5 text-center text-sm leading-snug text-emerald-50">
          <strong className="mr-1.5 font-bold uppercase tracking-wide text-emerald-200">
            On air
          </strong>
          We&apos;re live right now on the stream (website status). Open your podcast app if you&apos;re tuning in —
          this is your studio tally for the site.
        </div>
      )}
      {broadcast.showState === "recording" && (
        <div className="border-b border-emerald-500/35 bg-emerald-950/50 px-4 py-2.5 text-center text-sm leading-snug text-emerald-50">
          <strong className="mr-1.5 font-bold uppercase tracking-wide text-emerald-200">
            Recording
          </strong>
          We&apos;re in session capturing the podcast — not livestreaming right now. Thanks for respecting the tape.
        </div>
      )}
      <div className="flex-1">{children}</div>
      <section aria-label="In-studio guest requests" className="border-t border-white/10 bg-[#070707] px-4 py-10 sm:py-14">
        <div className="mx-auto w-full max-w-2xl text-center sm:max-w-3xl">
          <h2 className="font-[family-name:var(--font-opt)] text-lg font-bold text-white sm:text-xl">
            Studio Guest
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/60 sm:text-base">
            Interested in being an in-studio guest? Click the link below. Remote callers use <span className="text-white/85">Stream me in!</span> at the top of the page.
          </p>
          <div className="mt-6 flex justify-center">
            <div className="w-full max-w-md sm:max-w-none">
              <InPersonRequestDialog />
            </div>
          </div>
        </div>
      </section>
      <section aria-label="Recording notice signup" className="border-t border-white/10 bg-[#050505] px-4 py-10 sm:py-14">
        <div className="mx-auto w-full max-w-xl text-center sm:max-w-2xl">
          <h2 className="font-[family-name:var(--font-opt)] text-lg font-bold text-white sm:text-xl">
            Recording notices
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/60 sm:text-base">
            Want a quick email when we&apos;re about to hit record? Add your address
            below — we&apos;ll only use it for that heads-up (and you can unsubscribe
            anytime from the email).
          </p>
          <RecordingNoticeSignup />
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}

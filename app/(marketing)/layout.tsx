import { RecordingNoticeButton } from "@/components/marketing/RecordingNoticeButton";
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
      <SiteNav isLive={broadcast.isLive} currentTopic={broadcast.currentTopic} />
      <div className="border-y border-[#ff6600]/45 bg-black/80 px-4 py-3 text-center backdrop-blur-sm">
        <p className="font-[family-name:var(--font-opt)] text-sm leading-snug text-white/90 sm:text-base">
          Launching Tues May&nbsp;19th
        </p>
      </div>
      {broadcast.isLive && (
        <div className="border-b border-emerald-500/40 bg-emerald-950/60 px-4 py-2.5 text-center text-sm leading-snug text-emerald-50">
          <strong className="mr-1.5 font-bold uppercase tracking-wide text-emerald-200">
            On air
          </strong>
          We&apos;re live right now (website status). Open your podcast app if you
          catch this episode in real time — this is your studio tally for the site.
        </div>
      )}
      <div className="flex-1">{children}</div>
      <section aria-label="Recording notice signup" className="border-t border-white/10 bg-[#050505] px-4 py-10 sm:py-14">
        <div className="mx-auto max-w-lg text-center sm:max-w-xl">
          <h2 className="font-[family-name:var(--font-opt)] text-lg font-bold text-white sm:text-xl">
            Recording notices
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/60 sm:text-base">
            Want a quick email when we&apos;re about to hit record? Add your address
            below — we&apos;ll only use it for that heads-up (and you can unsubscribe
            anytime from the email).
          </p>
          <div className="mt-6 flex flex-col items-stretch sm:items-center">
            <RecordingNoticeButton
              label="Get recording notices"
              triggerClassName="flex w-full items-center justify-center rounded-2xl border border-[#ff6600]/35 bg-[#ff6600]/10 py-4 text-sm font-semibold text-[#ffb380] transition hover:border-[#ff6600]/55 hover:bg-[#ff6600]/18 active:scale-[0.99] md:max-w-md md:rounded-xl md:py-3 md:active:scale-100"
            />
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}

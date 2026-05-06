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
      <div className="overflow-hidden border-y border-[#2563eb]/70 bg-gradient-to-r from-[#1e3a8a] via-[#1d4ed8] to-[#1e3a8a] py-3 shadow-[0_0_32px_rgba(37,99,235,0.4)]">
        <div className="animate-marquee flex whitespace-nowrap font-[family-name:var(--font-opt)] text-base font-black uppercase tracking-[0.25em] text-white sm:text-lg">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="mx-8 flex items-center gap-6">
              <span>★ Coming May 2026</span>
              <span className="text-[#93c5fd]">·</span>
              <span>Open Pod Talk</span>
              <span className="text-[#93c5fd]">·</span>
              <span>All Views, Just Bring It!</span>
              <span className="text-[#93c5fd]">·</span>
            </span>
          ))}
        </div>
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
      <SiteFooter />
    </div>
  );
}

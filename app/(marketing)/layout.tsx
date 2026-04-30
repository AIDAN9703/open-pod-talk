import { SiteFooter } from "@/components/marketing/SiteFooter";
import { SiteNav } from "@/components/marketing/SiteNav";
import { getBroadcastLive } from "@/lib/broadcast";

/** Supabase-backed live flag must not be frozen at build time. */
export const dynamic = "force-dynamic";

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteLive = await getBroadcastLive();

  return (
    <div className="flex min-h-full flex-col bg-[#050505] text-white">
      <SiteNav isLive={siteLive} />
      <div className="border-y border-[#ff6600]/60 bg-gradient-to-r from-[#ff6600]/20 via-[#ff6600]/35 to-[#ff6600]/20 px-4 py-4 text-center font-[family-name:var(--font-opt)] text-lg font-black uppercase tracking-[0.22em] text-white shadow-[0_0_28px_rgba(255,102,0,0.25)] sm:text-xl">
        Coming May 2026
      </div>
      {siteLive && (
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

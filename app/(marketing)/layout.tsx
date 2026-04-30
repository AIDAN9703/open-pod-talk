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

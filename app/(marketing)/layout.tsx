import Link from "next/link";
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

      <SiteFooter />
    </div>
  );
}

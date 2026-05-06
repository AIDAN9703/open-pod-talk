import { BroadcastToggle } from "@/components/admin/BroadcastToggle";
import { BlastNoticeButton } from "@/components/admin/BlastNoticeButton";
import { CurrentTopicEditor } from "@/components/admin/CurrentTopicEditor";
import { getBroadcastStatus } from "@/lib/broadcast";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const broadcast = await getBroadcastStatus();

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <header className="sticky top-0 z-10 border-b border-white/10 bg-[#0a0a0a]/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <a href="/" className="font-[family-name:var(--font-opt)] text-sm font-bold text-white">
              Open Pod Talk
              <span className="font-normal text-white/35"> Admin</span>
            </a>
            <nav className="hidden items-center gap-4 text-sm sm:flex">
              <a href="/admin" className="text-white/65 transition-colors hover:text-[#ff8533]">
                Submissions
              </a>
            </nav>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <BlastNoticeButton />
            <CurrentTopicEditor initialTopic={broadcast.currentTopic} />
            <BroadcastToggle initialLive={broadcast.isLive} />
            <form action="/auth/signout" method="POST">
              <button className="text-sm text-white/45 transition-colors hover:text-white">
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}

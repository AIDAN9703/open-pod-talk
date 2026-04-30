import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

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

  // Verify host is in the hosts table
  const { data: host } = await supabase
    .from("hosts")
    .select("is_active")
    .eq("id", user.id)
    .single();

  if (!host?.is_active) {
    redirect("/admin/login?error=unauthorized");
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a href="/" className="font-bold text-slate-900">
              OpenPodTalk
            </a>
            <nav className="hidden sm:flex items-center gap-4 text-sm">
              <a href="/admin" className="text-slate-600 hover:text-slate-900">Submissions</a>
            </nav>
          </div>
          <form action="/auth/signout" method="POST">
            <button className="text-sm text-slate-500 hover:text-slate-700">Sign out</button>
          </form>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">{children}</main>
    </div>
  );
}

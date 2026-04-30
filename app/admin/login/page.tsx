import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "./LoginForm";
import { getPublicSupabaseEnvIssues } from "@/lib/supabase/env-check";
import { createClient } from "@/lib/supabase/server";
import { safeInternalRedirect } from "@/lib/safe-internal-path";

export const metadata: Metadata = { title: "Host Login — Open Pod Talk" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirectTo?: string; error?: string; message?: string }>;
}) {
  const params = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  /** Never server-redirect GET /admin/login → /admin (307 loop with proxy/session timing). Use a plain link instead. */
  const continueHref = safeInternalRedirect(params.redirectTo);

  const envIssues = getPublicSupabaseEnvIssues();

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050505] px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="font-[family-name:var(--font-opt)] text-2xl font-extrabold tracking-tight text-white">
            Open Pod Talk
          </div>
          <p className="mt-2 text-sm text-white/45">Host dashboard</p>
        </div>

        {envIssues.length > 0 && (
          <div className="mb-6 rounded-xl border border-red-500/40 bg-red-950/50 px-4 py-3 text-sm text-red-100">
            <p className="font-semibold text-red-50">Environment check</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-red-100/90">
              {envIssues.map((msg) => (
                <li key={msg}>{msg}</li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-red-200/70">
              Restart <code className="rounded bg-black/30 px-1">npm run dev</code> after
              editing{" "}
              <code className="rounded bg-black/30 px-1">.env.local</code>. If login still
              fails with what looks like a valid key, try the legacy JWT{" "}
              <strong className="text-red-50">anon</strong> key from Supabase → API (some
              projects need it instead of the publishable format).
            </p>
          </div>
        )}

        {params.error === "auth" && (
          <div className="mb-6 rounded-xl border border-[#ff6600]/35 bg-[#ff6600]/10 px-4 py-3 text-sm text-[#ffb380]">
            {params.message ??
              "Could not complete sign-in. Go back and use email/password, or Sign out."}
          </div>
        )}

        {user ? (
          <div className="mb-6 rounded-xl border border-emerald-500/30 bg-emerald-950/40 px-4 py-4 text-sm text-emerald-100">
            <p className="font-medium text-emerald-50">You&apos;re signed in.</p>
            <Link
              href={continueHref}
              className="mt-3 inline-flex w-full items-center justify-center rounded-full bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-500"
            >
              Continue to dashboard
            </Link>
            <form action="/auth/signout" method="POST" className="mt-3 text-center">
              <button
                type="submit"
                className="text-xs text-emerald-200/80 underline hover:no-underline"
              >
                Sign out
              </button>
            </form>
          </div>
        ) : null}

        {!user ? (
          <div className="rounded-2xl border border-white/10 bg-[#0a0a0a] p-8 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
            <LoginForm redirectTo={params.redirectTo} />
          </div>
        ) : (
          <p className="text-center text-xs text-white/35">Sign out above to switch host accounts.</p>
        )}
      </div>
    </div>
  );
}

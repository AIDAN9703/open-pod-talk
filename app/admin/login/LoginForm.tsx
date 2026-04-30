"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { safeInternalRedirect } from "@/lib/safe-internal-path";
import { createClient } from "@/lib/supabase/client";

export function LoginForm({ redirectTo }: { redirectTo?: string }) {
  const router = useRouter();
  const [mode, setMode] = useState<"sign-in" | "sign-up">("sign-in");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function submit(formData: FormData) {
    startTransition(async () => {
      setError(null);
      setMessage(null);

      const email = String(formData.get("email") ?? "").trim().toLowerCase();
      const password = String(formData.get("password") ?? "");
      if (!email || !password) {
        setError("Email and password are required.");
        return;
      }

      const supabase = createClient();
      const result =
        mode === "sign-in"
          ? await supabase.auth.signInWithPassword({ email, password })
          : await supabase.auth.signUp({
              email,
              password,
              options: {
                emailRedirectTo: `${window.location.origin}/auth/callback`,
              },
            });

      if (result.error) {
        setError(result.error.message);
        return;
      }

      if (mode === "sign-up" && !result.data.session) {
        setMessage(
          "Account created. Check your email to confirm it, then come back and sign in."
        );
        return;
      }

      router.refresh();
      router.replace(safeInternalRedirect(redirectTo));
    });
  }

  return (
    <form action={submit} className="space-y-5">
      <div className="grid grid-cols-2 rounded-full border border-white/10 bg-black/30 p-1 text-sm">
        <button
          type="button"
          onClick={() => {
            setMode("sign-in");
            setError(null);
            setMessage(null);
          }}
          className={[
            "rounded-full px-3 py-2 font-semibold transition-colors",
            mode === "sign-in"
              ? "bg-[#ff6600] text-white"
              : "text-white/55 hover:text-white",
          ].join(" ")}
        >
          Log in
        </button>
        <button
          type="button"
          onClick={() => {
            setMode("sign-up");
            setError(null);
            setMessage(null);
          }}
          className={[
            "rounded-full px-3 py-2 font-semibold transition-colors",
            mode === "sign-up"
              ? "bg-[#ff6600] text-white"
              : "text-white/55 hover:text-white",
          ].join(" ")}
        >
          Sign up
        </button>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-white/75">
          Email
        </label>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          autoFocus
          className="block w-full rounded-lg border border-white/15 bg-[#050505] px-3 py-2.5 text-sm text-white placeholder:text-white/35 focus:border-[#ff6600]/45 focus:outline-none focus:ring-2 focus:ring-[#ff6600]/35"
          placeholder="host@openpodtalk.com"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-white/75">
          Password
        </label>
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          minLength={1}
          className="block w-full rounded-lg border border-white/15 bg-[#050505] px-3 py-2.5 text-sm text-white placeholder:text-white/35 focus:border-[#ff6600]/45 focus:outline-none focus:ring-2 focus:ring-[#ff6600]/35"
          placeholder="••••••••"
        />
      </div>

      {message && (
        <p className="rounded-lg border border-emerald-500/30 bg-emerald-950/35 px-3 py-2 text-sm text-emerald-100">
          {message}
        </p>
      )}

      {error && (
        <p className="text-sm text-[#ff8566]" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-[#ff6600] py-3 text-sm font-bold text-white shadow-[0_0_24px_rgba(255,102,0,0.35)] transition hover:bg-[#ff781a] disabled:opacity-60"
      >
        {pending ? "Working…" : mode === "sign-in" ? "Log in" : "Create account"}
      </button>

      <p className="text-center text-xs leading-relaxed text-white/35">
        {mode === "sign-up"
          ? "Create a Supabase Auth account, then you can access the admin dashboard."
          : "Any signed-in Supabase user can access this admin dashboard."}
      </p>
    </form>
  );
}

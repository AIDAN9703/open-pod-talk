import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";
import { getSupabasePublishableKey, getSupabaseUrl } from "@/lib/supabase/public-env";

/**
 * Completes OAuth / email-confirmation flows: exchanges ?code= for a session cookie.
 * Password login doesn’t normally hit this route; keep it enabled in Supabase redirect URLs anyway.
 */
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const nextParam = url.searchParams.get("next");
  const nextPath = nextParam?.startsWith("/") ? nextParam : "/admin";
  const redirectUrl = new URL(nextPath, url.origin);

  if (!code) {
    return NextResponse.redirect(new URL("/admin/login?error=auth", url.origin));
  }

  const response = NextResponse.redirect(redirectUrl);

  const supabase = createServerClient(
    getSupabaseUrl(),
    getSupabasePublishableKey(),
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    return NextResponse.redirect(
      new URL(`/admin/login?error=auth&message=${encodeURIComponent(error.message)}`, url.origin)
    );
  }

  return response;
}

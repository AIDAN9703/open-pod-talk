import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getPublicSupabaseEnvIssues } from "@/lib/supabase/env-check";
import { getSupabasePublishableKey, getSupabaseUrl } from "@/lib/supabase/public-env";

export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not available in production." }, { status: 404 });
  }

  const envIssues = getPublicSupabaseEnvIssues();
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  return NextResponse.json({
    env: {
      supabaseUrlPresent: Boolean(getSupabaseUrl()),
      publicKeyPresent: Boolean(getSupabasePublishableKey()),
      publicKeyPrefix: getSupabasePublishableKey().slice(0, 16),
      serviceRolePresent: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
      issues: envIssues,
    },
    session: {
      hasUser: Boolean(user),
      userId: user?.id ?? null,
      email: user?.email ?? null,
      authError: userError?.message ?? null,
    },
  });
}

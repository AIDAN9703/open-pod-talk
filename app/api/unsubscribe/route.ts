import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("t");

  if (!token) {
    return new NextResponse("Missing token.", { status: 400 });
  }

  const supabase = createAdminClient();
  const { error } = await supabase
    .from("subscribers")
    .update({ unsubscribed_at: new Date().toISOString() })
    .eq("token", token)
    .is("unsubscribed_at", null);

  if (error) {
    return new NextResponse("Something went wrong. Please try again.", { status: 500 });
  }

  return new NextResponse(
    `<!DOCTYPE html><html><head><meta charset="utf-8">
    <title>Unsubscribed — Open Pod Talk</title>
    <style>body{margin:0;background:#050505;color:#fff;font-family:system-ui,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;text-align:center}h1{font-size:24px;font-weight:800}p{color:#888;font-size:15px}</style>
    </head><body>
    <div><h1>You're unsubscribed.</h1><p>You won't receive recording notices anymore.</p><p><a href="/" style="color:#ff6600">← Back to Open Pod Talk</a></p></div>
    </body></html>`,
    { status: 200, headers: { "Content-Type": "text/html" } }
  );
}

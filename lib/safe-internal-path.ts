/** Safe in-app path after sign-in (open redirects / login loops). */
export function safeInternalRedirect(raw: unknown, fallback = "/admin"): string {
  if (typeof raw !== "string" || !raw.startsWith("/") || raw.startsWith("//")) {
    return fallback;
  }
  if (raw === "/admin/login" || raw.startsWith("/admin/login/")) {
    return fallback;
  }
  return raw;
}

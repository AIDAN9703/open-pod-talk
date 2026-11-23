/**
 * The open Riverside studio link anyone can use to stream into the show.
 * Set NEXT_PUBLIC_RIVERSIDE_URL in Vercel (or replace the fallback below).
 * When empty, the site shows "link coming soon" instead of a dead button.
 */
export const RIVERSIDE_URL = process.env.NEXT_PUBLIC_RIVERSIDE_URL?.trim() || "";

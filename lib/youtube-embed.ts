/**
 * Build a YouTube iframe `src` for the marketing site player.
 *
 * Configure one of (precedence: video id first):
 * - `NEXT_PUBLIC_YOUTUBE_LIVE_VIDEO_ID` — 11-character video id (scheduled premiere, current live, or a replay you want featured).
 * - `NEXT_PUBLIC_YOUTUBE_CHANNEL_ID` — channel id starting with `UC…` for the special live embed
 *   `…/embed/live_stream?channel=…` (shows the channel’s live stream when YouTube is broadcasting).
 *
 * Also set `NEXT_PUBLIC_YOUTUBE_URL` for a “open channel” link in the UI (see footer).
 */
const VIDEO_ID_RE = /^[\w-]{11}$/;
const CHANNEL_ID_RE = /^UC[\w-]{10,}$/;

export function getYoutubeEmbedSrc(): string | null {
  const videoId = process.env.NEXT_PUBLIC_YOUTUBE_LIVE_VIDEO_ID?.trim();
  if (videoId && VIDEO_ID_RE.test(videoId)) {
    return `https://www.youtube.com/embed/${encodeURIComponent(videoId)}`;
  }

  const channelId = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID?.trim();
  if (channelId && CHANNEL_ID_RE.test(channelId)) {
    return `https://www.youtube.com/embed/live_stream?channel=${encodeURIComponent(channelId)}`;
  }

  return null;
}

export function hasYoutubeWatchConfig(): boolean {
  return Boolean(getYoutubeEmbedSrc() || process.env.NEXT_PUBLIC_YOUTUBE_URL?.trim());
}

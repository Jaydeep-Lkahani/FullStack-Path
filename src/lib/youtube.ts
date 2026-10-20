/** Extract the 11-char video id from watch / youtu.be / embed URLs. */
export function youtubeId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname === "youtu.be") return u.pathname.slice(1) || null;
    if (u.hostname.endsWith("youtube.com")) {
      if (u.pathname === "/watch") return u.searchParams.get("v");
      const m = /^\/(?:embed|shorts)\/([\w-]{11})/.exec(u.pathname);
      if (m) return m[1];
    }
  } catch {
    // fall through
  }
  return null;
}

/** Optional start offset in seconds from `?t=` / `&t=`. */
export function youtubeStart(url: string): number {
  try {
    const t = new URL(url).searchParams.get("t");
    return t ? parseInt(t, 10) || 0 : 0;
  } catch {
    return 0;
  }
}

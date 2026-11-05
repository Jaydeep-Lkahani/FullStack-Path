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

function seconds(duration: string) {
  return duration
    .split(":")
    .map(Number)
    .reduce((total, part) => (Number.isFinite(part) ? total * 60 + part : total), 0);
}

/** "16 min" / "1 h 5 min": total running time of a list of videos ("mm:ss" / "h:mm:ss"). */
export function totalDuration(videos: { duration: string }[]) {
  const mins = Math.max(
    1,
    Math.round(videos.reduce((n, v) => n + seconds(v.duration), 0) / 60),
  );
  return mins >= 60 ? `${Math.floor(mins / 60)} h ${mins % 60} min` : `${mins} min`;
}

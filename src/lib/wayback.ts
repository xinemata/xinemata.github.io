/**
 * Resolve a URL to its most recent Wayback Machine snapshot, per
 * https://briangrinstead.com/blog/fetch-latest-copy-from-wayback/
 *
 * The availability API returns the closest snapshot to a given timestamp;
 * with no timestamp supplied, that is the latest capture. Runs at build
 * time, so the weekly scheduled deploy keeps snapshots up to date.
 * Falls back to the live URL when nothing is archived or the API is
 * unreachable, so a build never breaks a link.
 *
 * The API is picky about URL form: it misses scheme-prefixed URLs and
 * bare hostnames with a trailing slash, so several normalized candidates
 * are tried in order.
 */
export async function latestWayback(url: string): Promise<string> {
  const stripped = url.replace(/^https?:\/\//, '');
  const candidates = [...new Set([stripped, stripped.replace(/\/$/, ''), url])];

  for (const candidate of candidates) {
    try {
      const res = await fetch(
        `https://archive.org/wayback/available?url=${encodeURIComponent(candidate)}`,
        { signal: AbortSignal.timeout(10_000) },
      );
      const data = await res.json();
      const closest = data?.archived_snapshots?.closest;
      if (closest?.available && closest.url) {
        return closest.url.replace(/^http:/, 'https:');
      }
    } catch {
      // Archive lookup failed — try the next candidate form.
    }
  }
  return url;
}

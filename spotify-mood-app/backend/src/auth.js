export const SCOPES = [
  'user-read-private',
  'user-read-email',
  'streaming',
  'user-modify-playback-state',
  'playlist-modify-private',
  'playlist-modify-public',
  'user-top-read',
  'user-read-recently-played',
];

export function isTokenExpired(expiresAt, bufferMs = 60_000) {
  if (!expiresAt) return true;
  return Date.now() >= expiresAt - bufferMs;
}

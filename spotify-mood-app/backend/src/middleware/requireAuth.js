import { isTokenExpired } from '../auth.js';

export function createRequireAuth(spotifyAuthService) {
  return async function requireAuth(req, res, next) {
    if (!req.session?.accessToken || !req.session?.refreshToken) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (isTokenExpired(req.session.expiresAt)) {
      try {
        const tokens = await spotifyAuthService.refreshAccessToken(
          req.session.refreshToken
        );

        req.session.accessToken = tokens.accessToken;
        req.session.refreshToken = tokens.refreshToken;
        req.session.expiresAt = tokens.expiresAt;
      } catch {
        return res.status(401).json({ error: 'Session expired' });
      }
    }

    req.spotifyTokens = {
      accessToken: req.session.accessToken,
      refreshToken: req.session.refreshToken,
    };

    return next();
  };
}

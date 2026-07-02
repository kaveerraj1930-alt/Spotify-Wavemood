import { Router } from 'express';
import crypto from 'crypto';

export function createAuthRouter({ spotifyAuthService, frontendUrl }) {
  const router = Router();

  router.get('/login', (req, res) => {
    const state = crypto.randomBytes(16).toString('hex');
    req.session.oauthState = state;

    // Dynamically store the requesting origin (with fallback to default frontendUrl)
    const referer = req.headers.referer;
    req.session.redirectUrl = req.query.origin || referer || frontendUrl;

    const authorizeUrl = spotifyAuthService.getAuthorizeUrl(state);
    return res.redirect(authorizeUrl);
  });

  router.get('/callback', async (req, res) => {
    const { code, state, error } = req.query;
    const targetUrl = req.session.redirectUrl || frontendUrl;

    if (error) {
      return res.redirect(`${targetUrl}/login?error=${encodeURIComponent(error)}`);
    }

    if (!code || !state || state !== req.session.oauthState) {
      return res.redirect(`${targetUrl}/login?error=invalid_state`);
    }

    try {
      const tokens = await spotifyAuthService.exchangeCode(code);

      req.session.accessToken = tokens.accessToken;
      req.session.refreshToken = tokens.refreshToken;
      req.session.expiresAt = tokens.expiresAt;
      delete req.session.oauthState;
      delete req.session.redirectUrl;

      return req.session.save(() => {
        res.redirect(`${targetUrl}/mood`);
      });
    } catch {
      return res.redirect(`${targetUrl}/login?error=auth_failed`);
    }
  });

  return router;
}

export function createAuthenticatedAuthRouter({
  spotifyAuthService,
  requireAuth,
}) {
  const router = Router();

  router.get('/me', requireAuth, async (req, res) => {
    try {
      const profile = await spotifyAuthService.getMe(
        req.spotifyTokens.accessToken,
        req.spotifyTokens.refreshToken
      );

      return res.json({
        id: profile.id,
        displayName: profile.display_name,
        email: profile.email,
        imageUrl: profile.images?.[0]?.url ?? null,
      });
    } catch {
      return res.status(401).json({ error: 'Unable to fetch profile' });
    }
  });

  router.get('/me/top-artists', requireAuth, async (req, res) => {
    try {
      const body = await spotifyAuthService.getTopArtists(
        req.spotifyTokens.accessToken,
        req.spotifyTokens.refreshToken,
        6
      );

      const artists = body.items.map((artist) => ({
        id: artist.id,
        name: artist.name,
        image: artist.images?.[0]?.url ?? null,
        genres: artist.genres,
      }));

      return res.json(artists);
    } catch (error) {
      console.error('Failed to fetch top artists:', error);
      return res.status(500).json({ error: 'Unable to fetch top artists' });
    }
  });

  router.get('/me/recently-played', requireAuth, async (req, res) => {
    try {
      const body = await spotifyAuthService.getRecentlyPlayed(
        req.spotifyTokens.accessToken,
        req.spotifyTokens.refreshToken,
        6
      );

      const tracks = body.items.map((item) => ({
        id: item.track.id,
        name: item.track.name,
        artists: item.track.artists.map((a) => a.name).join(', '),
        image: item.track.album?.images?.[0]?.url ?? null,
        duration_ms: item.track.duration_ms,
        preview_url: item.track.preview_url,
        uri: item.track.uri,
        externalUrl: item.track.external_urls?.spotify ?? null,
      }));

      return res.json(tracks);
    } catch (error) {
      console.error('Failed to fetch recently played:', error);
      return res.status(500).json({ error: 'Unable to fetch recently played' });
    }
  });

  router.post('/logout', (req, res) => {
    req.session.destroy((error) => {
      if (error) {
        return res.status(500).json({ error: 'Logout failed' });
      }

      res.clearCookie('connect.sid');
      return res.json({ success: true });
    });
  });

  return router;
}

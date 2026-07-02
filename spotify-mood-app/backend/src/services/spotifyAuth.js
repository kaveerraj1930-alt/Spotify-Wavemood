import SpotifyWebApi from 'spotify-web-api-node';
import { SCOPES } from '../auth.js';

function getCredentials() {
  return {
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: process.env.SPOTIFY_REDIRECT_URI,
  };
}

function createApi(accessToken = null, refreshToken = null) {
  const api = new SpotifyWebApi(getCredentials());

  if (accessToken) {
    api.setAccessToken(accessToken);
  }

  if (refreshToken) {
    api.setRefreshToken(refreshToken);
  }

  return api;
}

export const spotifyAuth = {
  getAuthorizeUrl(state) {
    return createApi().createAuthorizeURL(SCOPES, state);
  },

  async exchangeCode(code) {
    const api = createApi();
    const { body } = await api.authorizationCodeGrant(code);

    return {
      accessToken: body.access_token,
      refreshToken: body.refresh_token,
      expiresAt: Date.now() + body.expires_in * 1000,
    };
  },

  async refreshAccessToken(refreshToken) {
    const api = createApi(null, refreshToken);
    const { body } = await api.refreshAccessToken();

    return {
      accessToken: body.access_token,
      refreshToken: body.refresh_token ?? refreshToken,
      expiresAt: Date.now() + (body.expires_in ?? 3600) * 1000,
    };
  },

  async getMe(accessToken, refreshToken) {
    const api = createApi(accessToken, refreshToken);
    const { body } = await api.getMe();
    return body;
  },

  async getTopArtists(accessToken, refreshToken, limit = 6) {
    const api = createApi(accessToken, refreshToken);
    const { body } = await api.getMyTopArtists({ limit });
    return body;
  },

  async getRecentlyPlayed(accessToken, refreshToken, limit = 6) {
    const api = createApi(accessToken, refreshToken);
    const { body } = await api.getMyRecentlyPlayedTracks({ limit });
    return body;
  },
};

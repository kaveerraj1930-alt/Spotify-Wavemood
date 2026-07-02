import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import { createApp } from '../src/server.js';

process.env.NODE_ENV = 'test';

function createMockSpotifyAuth(overrides = {}) {
  return {
    getAuthorizeUrl: (state) =>
      `https://accounts.spotify.com/authorize?state=${state}`,
    exchangeCode: async () => ({
      accessToken: 'access-token',
      refreshToken: 'refresh-token',
      expiresAt: Date.now() + 3_600_000,
    }),
    refreshAccessToken: async () => ({
      accessToken: 'refreshed-access-token',
      refreshToken: 'refresh-token',
      expiresAt: Date.now() + 3_600_000,
    }),
    getMe: async () => ({
      id: 'spotify-user-1',
      display_name: 'Test User',
      email: 'test@example.com',
      images: [{ url: 'https://example.com/avatar.jpg' }],
    }),
    ...overrides,
  };
}

describe('Auth routes', () => {
  let app;
  let mockSpotifyAuth;

  beforeEach(() => {
    mockSpotifyAuth = createMockSpotifyAuth();
    app = createApp({ spotifyAuthService: mockSpotifyAuth });
  });

  it('GET /api/auth/login redirects to Spotify', async () => {
    const agent = request.agent(app);
    const response = await agent.get('/api/auth/login').redirects(0);

    assert.equal(response.status, 302);
    assert.match(response.headers.location, /accounts\.spotify\.com\/authorize/);
  });

  it('GET /api/auth/me returns 401 without a session', async () => {
    const response = await request(app).get('/api/auth/me');

    assert.equal(response.status, 401);
    assert.equal(response.body.error, 'Unauthorized');
  });

  it('GET /api/auth/callback stores session and redirects to /mood', async () => {
    const agent = request.agent(app);
    const loginResponse = await agent.get('/api/auth/login').redirects(0);
    const loginUrl = new URL(loginResponse.headers.location);
    const state = loginUrl.searchParams.get('state');

    const callbackResponse = await agent
      .get(`/api/auth/callback?code=test-code&state=${state}`)
      .redirects(0);

    assert.equal(callbackResponse.status, 302);
    assert.equal(callbackResponse.headers.location, 'http://localhost:5173/mood');

    const meResponse = await agent.get('/api/auth/me');
    assert.equal(meResponse.status, 200);
    assert.equal(meResponse.body.displayName, 'Test User');
    assert.equal(meResponse.body.email, 'test@example.com');
  });

  it('GET /api/auth/callback rejects invalid OAuth state', async () => {
    const agent = request.agent(app);
    await agent.get('/api/auth/login').redirects(0);

    const callbackResponse = await agent
      .get('/api/auth/callback?code=test-code&state=wrong-state')
      .redirects(0);

    assert.equal(callbackResponse.status, 302);
    assert.equal(
      callbackResponse.headers.location,
      'http://localhost:5173/login?error=invalid_state'
    );
  });

  it('GET /api/auth/me refreshes expired tokens before returning profile', async () => {
    let refreshCalled = false;
    mockSpotifyAuth = createMockSpotifyAuth({
      refreshAccessToken: async () => {
        refreshCalled = true;
        return {
          accessToken: 'refreshed-access-token',
          refreshToken: 'refresh-token',
          expiresAt: Date.now() + 3_600_000,
        };
      },
    });
    app = createApp({ spotifyAuthService: mockSpotifyAuth });

    const agent = request.agent(app);
    const loginResponse = await agent.get('/api/auth/login').redirects(0);
    const state = new URL(loginResponse.headers.location).searchParams.get('state');

    mockSpotifyAuth.exchangeCode = async () => ({
      accessToken: 'expired-access-token',
      refreshToken: 'refresh-token',
      expiresAt: Date.now() - 1000,
    });

    await agent
      .get(`/api/auth/callback?code=test-code&state=${state}`)
      .redirects(0);

    const meResponse = await agent.get('/api/auth/me');

    assert.equal(refreshCalled, true);
    assert.equal(meResponse.status, 200);
    assert.equal(meResponse.body.id, 'spotify-user-1');
  });

  it('POST /api/auth/logout clears the session', async () => {
    const agent = request.agent(app);
    const loginResponse = await agent.get('/api/auth/login').redirects(0);
    const state = new URL(loginResponse.headers.location).searchParams.get('state');

    await agent
      .get(`/api/auth/callback?code=test-code&state=${state}`)
      .redirects(0);

    const logoutResponse = await agent.post('/api/auth/logout');
    assert.equal(logoutResponse.status, 200);
    assert.equal(logoutResponse.body.success, true);

    const meResponse = await agent.get('/api/auth/me');
    assert.equal(meResponse.status, 401);
  });
});

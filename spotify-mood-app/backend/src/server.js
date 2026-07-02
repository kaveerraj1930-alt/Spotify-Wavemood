import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import { fileURLToPath } from 'url';
import { createRequireAuth } from './middleware/requireAuth.js';
import {
  createAuthRouter,
  createAuthenticatedAuthRouter,
} from './routes/auth.js';
import { createRecommendationsRouter } from './routes/recommendations.js';
import { createPlaylistRouter } from './routes/playlist.js';
import { createQueueRouter } from './routes/queue.js';
import { spotifyAuth as defaultSpotifyAuth } from './services/spotifyAuth.js';

dotenv.config();

export function createApp(options = {}) {
  const spotifyAuthService = options.spotifyAuthService ?? defaultSpotifyAuth;
  const frontendUrl = options.frontendUrl ?? process.env.FRONTEND_URL ?? 'http://127.0.0.1:5173';
  const sessionSecret = options.sessionSecret ?? process.env.SESSION_SECRET ?? 'dev-session-secret';

  const app = express();

  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow all origins in development to facilitate multi-device local testing
        callback(null, true);
      },
      credentials: true,
    })
  );
  app.use(express.json());
  app.use(
    session({
      secret: sessionSecret,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: 'lax',
      },
    })
  );

  const requireAuth = createRequireAuth(spotifyAuthService);

  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      service: 'spotify-mood-backend',
      timestamp: new Date().toISOString(),
    });
  });

  app.use(
    '/api/auth',
    createAuthRouter({ spotifyAuthService, frontendUrl })
  );
  app.use(
    '/api/auth',
    createAuthenticatedAuthRouter({ spotifyAuthService, requireAuth })
  );
  app.use(
    '/api/recommendations',
    createRecommendationsRouter({ spotifyAuthService, requireAuth })
  );
  app.use(
    '/api/playlist',
    createPlaylistRouter({ spotifyAuthService, requireAuth })
  );
  app.use(
    '/api/queue',
    createQueueRouter({ spotifyAuthService, requireAuth })
  );

  return app;
}

const app = createApp();
const PORT = process.env.PORT || 3001;
const isDirectRun = process.argv[1] === fileURLToPath(import.meta.url);

if (isDirectRun && process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
  });
}

export default app;

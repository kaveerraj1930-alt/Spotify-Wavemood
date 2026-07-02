# Spotify Mood App

Full-stack Spotify mood recommendation app. Free stack only — see `../architecture.md` for the full roadmap.

## Project structure

```
spotify-mood-app/
├── backend/     Express API (:3001)
├── frontend/    React + Vite (:5173)
└── README.md
```

## Prerequisites

- [Node.js](https://nodejs.org/) 18+
- Free [Spotify Developer](https://developer.spotify.com/dashboard) account

## Setup

### 1. Spotify Developer Dashboard

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create an app
3. Add redirect URI: `http://127.0.0.1:3001/api/auth/callback` (**not** `localhost` — Spotify rejects it)
4. Copy **Client ID** and **Client Secret** into `backend/.env`

### 2. Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Backend runs at `http://127.0.0.1:3001`.

### 3. Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Frontend runs at `http://127.0.0.1:5173`.

> **Important:** Open the app at `http://127.0.0.1:5173` (not `localhost`). Spotify requires `127.0.0.1` for OAuth, and session cookies must use the same host.

## Phase status

### Phase 0 (complete)

- [x] Frontend scaffolded with Vite + React on port 5173
- [x] Backend scaffolded with Express on port 3001
- [x] Tailwind configured with Spotify design tokens
- [x] React Router, Axios, Zustand, Lucide React installed
- [x] CORS + dotenv + `GET /api/health`

### Phase 1 (complete)

- [x] Spotify OAuth Authorization Code Flow
- [x] `express-session` in-memory token storage
- [x] Routes: `/api/auth/login`, `/api/auth/callback`, `/api/auth/me`, `/api/auth/logout`
- [x] Token refresh middleware on expired sessions
- [x] Frontend: `Login.jsx`, `useSpotifyAuth`, `authStore`
- [x] Protected `/mood` route

## Auth flow

1. Open `http://127.0.0.1:5173/login` or click **Log in with Spotify** on the home page
2. Backend redirects to Spotify OAuth
3. After approval, Spotify redirects to `http://127.0.0.1:3001/api/auth/callback`
4. Backend stores tokens in session and redirects to `http://127.0.0.1:5173/mood`

## Tests

```bash
# Backend
cd backend && npm test

# Frontend
cd frontend && npm test
```

## Environment variables

**Backend (`backend/.env`):**

```
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
SPOTIFY_REDIRECT_URI=http://127.0.0.1:3001/api/auth/callback
SESSION_SECRET=
PORT=3001
FRONTEND_URL=http://127.0.0.1:5173
```

**Frontend (`frontend/.env`):**

```
VITE_API_BASE_URL=http://127.0.0.1:3001
```

## Next phase

Phase 2 — Spotify UI shell (sidebar, top bar, home layout, mood banner).

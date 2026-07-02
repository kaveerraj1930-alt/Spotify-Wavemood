# Spotify WaveMood - Phase 6

A mood-based music recommendation app that feels like Spotify's UI. Users can select a mood or describe how they're feeling to get personalized track recommendations.

## Features

- **Mood-Based Recommendations**: Select from 9 mood chips or describe your feelings in free text
- **Spotify-Style UI**: Dark theme with Spotify design tokens
- **30-Second Previews**: HTML5 audio playback where available
- **Open in Spotify**: Direct links to tracks on Spotify
- **Queue & Playlist**: Add tracks to queue or save as playlist (requires Spotify account)
- **Error Handling**: Graceful handling of token expiry, rate limits, and network errors
- **Responsive Design**: Works on desktop and mobile

## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Testing**: Vitest, React Testing Library

## Prerequisites

- Node.js 18+ 
- npm or yarn
- A free Spotify Developer account

## Setup

### 1. Spotify Developer Dashboard

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Log in with your free Spotify account
3. Click "Create App"
4. Fill in the app details:
   - **App name**: Spotify WaveMood
   - **App description**: Mood-based music recommendations
   - **Redirect URI**: `http://localhost:3001/api/auth/callback`
5. Copy your **Client ID** and **Client Secret**

### 2. Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=http://localhost:3001
```

**Note**: Phase 6 uses mock data for recommendations. For full Spotify integration, you'll need to set up a backend server (see Phase 1-5 architecture).

### 3. Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

The app will be available at `http://localhost:5173`

## Usage

1. **Select a Mood**: Click on any mood chip (Chill, Happy, Party, etc.)
2. **Or Describe Your Feelings**: Type how you're feeling in the text area
3. **Get Recommendations**: Click "Get Recommendations" to see suggested tracks
4. **Preview Tracks**: Click the play button to hear 30-second previews
5. **Open in Spotify**: Click the external link icon to open the track in Spotify
6. **Save as Playlist**: Enter a playlist name and click "Save as Playlist"

## Phase 6 Enhancements

Phase 6 focuses on polish, edge cases, and documentation:

- **Token Expiry Handling**: Automatic token refresh with graceful re-login prompt
- **Preview URL Fallback**: Shows "Open in Spotify" prominently when no preview is available
- **Rate Limit Handling**: Meaningful error messages with retry-after information
- **Error Messages**: User-friendly error messages for all Spotify API errors
- **Comprehensive Documentation**: README with setup instructions

## Error Handling

The app handles various error scenarios:

- **Token Expiry (401)**: Prompts user to log in again
- **Rate Limiting (429)**: Shows retry-after time
- **Network Errors**: Prompts user to check connection
- **Forbidden (403)**: Alerts about permission issues
- **Server Errors (500)**: Notifies about Spotify service issues

## Testing

Run the test suite:

```bash
npm test
```

Tests cover:
- Mood parsing and keyword matching
- Component rendering and interactions
- Error handling utilities
- Token refresh logic

## Project Structure

```
phase-6/
├── src/
│   ├── components/       # React components
│   ├── pages/           # Page components
│   ├── hooks/           # Custom React hooks
│   ├── services/        # API services
│   ├── store/           # Zustand state stores
│   ├── utils/           # Utility functions
│   └── test/            # Test setup
├── public/              # Static assets
└── package.json
```

## Architecture

For full architecture details, see [architecture.md](../architecture.md)

## Free Stack Policy

This project uses exclusively free and open-source tools:
- No paid APIs (OpenAI, etc.)
- No Spotify Premium required
- No paid hosting for local development
- Free Spotify Developer account sufficient

## License

MIT

## Future Enhancements

See Phase 7 in architecture.md for optional free enhancements:
- Real home data from Spotify API
- Share playlist links
- Free deployment (Vercel + Render)
- E2E tests with Playwright

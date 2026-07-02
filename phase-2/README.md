# Phase 2 - Spotify UI Shell

This is Phase 2 of the Spotify Mood-Based Recommendation App, implementing the Spotify UI Shell with all visual components matching Spotify's design system.

## What's Implemented

### Components
- **Sidebar.jsx** - Spotify left navigation with library, playlists, and nav links
- **TopBar.jsx** - Search bar with user avatar and notification bell
- **Home.jsx** - Home page with greeting, featured playlists, and recently played
- **MoodBanner.jsx** - Gradient promotional banner with localStorage dismiss functionality
- **Layout.jsx** - Shared layout wrapper combining Sidebar, TopBar, and PreviewPlayer
- **PreviewPlayer.jsx** - Bottom audio player bar with play/pause controls and progress bar

### Features
- ✅ Spotify design tokens (colors, fonts) configured in Tailwind
- ✅ Responsive design (sidebar hidden on mobile, bottom tab bar for navigation)
- ✅ Mood banner with localStorage persistence
- ✅ Mock static data for playlists and tracks
- ✅ Time-based greeting (Good morning/afternoon/evening)
- ✅ Hover effects and animations matching Spotify UX

### Test Coverage
All components have comprehensive test suites:
- Sidebar.test.jsx
- TopBar.test.jsx
- MoodBanner.test.jsx
- PreviewPlayer.test.jsx
- Home.test.jsx
- Layout.test.jsx

## Installation

```bash
cd phase-2
npm install
```

## Running the App

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Running Tests

```bash
npm test
```

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- React Router
- Lucide React (icons)
- Vitest (testing)
- Testing Library (React testing utilities)

## Design System

### Colors
- `--spotify-black: #121212` - Page background
- `--spotify-dark: #181818` - Secondary surfaces
- `--spotify-card: #282828` - Cards, inputs
- `--spotify-hover: #3E3E3E` - Hover states
- `--spotify-green: #1DB954` - CTAs, accents

### Typography
- Font: 'Helvetica Neue', Helvetica, Arial, sans-serif

## Next Steps (Phase 3)

Phase 3 will implement the Mood Input UX:
- MoodChip.jsx and MoodChipGrid.jsx
- MoodInput.jsx with textarea
- Chip click → pre-fill + submit hook
- Mood history in localStorage
- moodStore.js with Zustand

## Exit Criteria (Phase 2)

✅ Home looks like Spotify
✅ Banner links to `/mood`
✅ Dismiss persists via localStorage
✅ Responsive layout works on mobile
✅ All components have test coverage

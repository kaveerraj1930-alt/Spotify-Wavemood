# Phase 3 - Mood Input UX

This is Phase 3 of the Spotify Mood-Based Recommendation App, implementing the Mood Input UX with chips, text input, and state management.

## What's Implemented

### New Components
- **MoodChip.jsx** - Individual mood pill button with gradient colors and selection ring
- **MoodChipGrid.jsx** - Grid of 9 mood chips (Sleepy, Motivated, Emotional, Happy, Chill, Party, Angry, Focus, Sad)
- **MoodInput.jsx** - Textarea with 280 character limit and counter
- **MoodRecommendation.jsx** - Full mood page with chips, input, and history

### State Management
- **moodStore.js** - Zustand store with localStorage persistence for:
  - selectedMood
  - moodInput
  - moodHistory (last 3 moods)
  - isSubmitting state
  - results

### Features
- ✅ 9 mood chips with unique gradient colors
- ✅ Chip selection with visual ring indicator
- ✅ Chip click pre-fills text input
- ✅ Textarea with 280 character limit
- ✅ Character counter with warning colors (yellow at 90%, red at 100%)
- ✅ Mood history (last 3) persisted in localStorage
- ✅ Quick-access history chips
- ✅ Framer Motion animations (hover, tap, spring)
- ✅ Submit button with loading state
- ✅ Responsive design

### Phase 2 Components (Copied)
- Sidebar.jsx
- TopBar.jsx
- Layout.jsx
- PreviewPlayer.jsx
- MoodBanner.jsx
- Home.jsx

### Test Coverage
- MoodChip.test.jsx
- MoodChipGrid.test.jsx
- MoodInput.test.jsx
- moodStore.test.js
- MoodRecommendation.test.jsx

## Installation

```bash
cd phase-3
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
- Zustand (state management)
- Framer Motion (animations)
- Lucide React (icons)
- Vitest (testing)
- Testing Library (React testing utilities)

## Exit Criteria (Phase 3)

✅ Mood page UI complete without live recommendations
✅ 9 chips with colors and selection ring
✅ Textarea with 280 char limit and counter
✅ Chip click → pre-fill + submit hook
✅ Typing animation on chip select
✅ Mood history (last 3) in localStorage
✅ Micro-interactions (chip scale, spring animation)
✅ All components have test coverage

## Next Steps (Phase 4)

Phase 4 will implement the Recommendation Engine:
- moodMap.js with hardcoded audio features
- moodParser.js with keyword matching
- Spotify /recommendations integration
- POST /api/recommendations endpoint
- useRecommendations.js hook
- LoadingPulse.jsx skeleton loaders
- Error toast handling

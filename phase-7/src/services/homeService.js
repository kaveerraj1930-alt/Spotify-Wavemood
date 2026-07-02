// Service to fetch user's Home page data (Top Artists and Recently Played).
// In a real application, these would call endpoints like:
// GET /api/auth/me/top-artists
// GET /api/auth/me/recently-played

import { getSpotifyErrorMessage, isRateLimitError, getRetryAfterSeconds } from '../utils/errorHandler'

// Mock Top Artists for the Home page
const MOCK_TOP_ARTISTS = [
  {
    id: 'artist-1',
    name: 'The Weeknd',
    image: 'https://picsum.photos/seed/artist1/200/200',
    genres: ['pop', 'r&b'],
  },
  {
    id: 'artist-2',
    name: 'Dua Lipa',
    image: 'https://picsum.photos/seed/artist2/200/200',
    genres: ['pop', 'dance'],
  },
  {
    id: 'artist-3',
    name: 'Justin Bieber',
    image: 'https://picsum.photos/seed/artist3/200/200',
    genres: ['pop'],
  },
  {
    id: 'artist-4',
    name: 'Taylor Swift',
    image: 'https://picsum.photos/seed/artist4/200/200',
    genres: ['pop', 'country'],
  },
  {
    id: 'artist-5',
    name: 'Billie Eilish',
    image: 'https://picsum.photos/seed/artist5/200/200',
    genres: ['alternative', 'pop'],
  },
  {
    id: 'artist-6',
    name: 'Drake',
    image: 'https://picsum.photos/seed/artist6/200/200',
    genres: ['hip hop', 'rap'],
  },
]

// Mock Recently Played Tracks for the Home page
const MOCK_RECENTLY_PLAYED = [
  {
    id: 'track-1',
    uri: 'spotify:track:1',
    name: 'Blinding Lights',
    artists: 'The Weeknd',
    image: 'https://picsum.photos/seed/track1/200/200',
    duration_ms: 200000,
    preview_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    externalUrl: 'https://open.spotify.com/track/0VjIjW4GlUZC72ZCmscT7P',
  },
  {
    id: 'track-2',
    uri: 'spotify:track:2',
    name: 'Levitating',
    artists: 'Dua Lipa',
    image: 'https://picsum.photos/seed/track2/200/200',
    duration_ms: 203000,
    preview_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    externalUrl: 'https://open.spotify.com/track/3ee8J1F1ZAg87vjETFo9uG',
  },
  {
    id: 'track-3',
    uri: 'spotify:track:3',
    name: 'Stay',
    artists: 'The Kid LAROI, Justin Bieber',
    image: 'https://picsum.photos/seed/track3/200/200',
    duration_ms: 141000,
    preview_url: null,
    externalUrl: 'https://open.spotify.com/track/5HCyWJZ86dY6v3wzPd1uEs',
  },
  {
    id: 'track-4',
    uri: 'spotify:track:4',
    name: 'Heat Waves',
    artists: 'Glass Animals',
    image: 'https://picsum.photos/seed/track4/200/200',
    duration_ms: 238000,
    preview_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    externalUrl: 'https://open.spotify.com/track/02M2zi3bbNE6q1v7jf5tYf',
  },
  {
    id: 'track-5',
    uri: 'spotify:track:5',
    name: 'Good 4 U',
    artists: 'Olivia Rodrigo',
    image: 'https://picsum.photos/seed/track5/200/200',
    duration_ms: 178000,
    preview_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    externalUrl: 'https://open.spotify.com/track/4ZtFanQDdTE5ISQ0kf6Raa',
  },
  {
    id: 'track-6',
    uri: 'spotify:track:6',
    name: 'Peaches',
    artists: 'Justin Bieber',
    image: 'https://picsum.photos/seed/track6/200/200',
    duration_ms: 198000,
    preview_url: null,
    externalUrl: 'https://open.spotify.com/track/4iJyoZeR6Clhy6Jm0j1jrg',
  },
]

export async function getTopArtists() {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  // In real app:
  // try {
  //   const response = await axios.get('/api/auth/me/top-artists')
  //   return response.data
  // } catch (error) {
  //   throw new Error(getSpotifyErrorMessage(error))
  // }

  return MOCK_TOP_ARTISTS
}

export async function getRecentlyPlayed() {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  // In real app:
  // try {
  //   const response = await axios.get('/api/auth/me/recently-played')
  //   return response.data
  // } catch (error) {
  //   throw new Error(getSpotifyErrorMessage(error))
  // }

  return MOCK_RECENTLY_PLAYED
}

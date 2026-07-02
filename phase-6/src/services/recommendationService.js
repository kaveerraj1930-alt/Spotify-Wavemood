import { parseMood } from './moodParser'
import { getSpotifyErrorMessage, isRateLimitError, getRetryAfterSeconds } from '../utils/errorHandler'

const MOCK_TRACKS = [
  {
    id: '1',
    uri: 'spotify:track:1',
    name: 'Blinding Lights',
    artists: [{ name: 'The Weeknd' }],
    album: { 
      name: 'After Hours',
      images: [{ url: 'https://picsum.photos/seed/track1/300/300' }] 
    },
    preview_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    external_urls: { spotify: 'https://open.spotify.com/track/0VjIjW4GlUZC72ZCmscT7P' },
    duration_ms: 200000,
  },
  {
    id: '2',
    uri: 'spotify:track:2',
    name: 'Levitating',
    artists: [{ name: 'Dua Lipa' }],
    album: { 
      name: 'Future Nostalgia',
      images: [{ url: 'https://picsum.photos/seed/track2/300/300' }] 
    },
    preview_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    external_urls: { spotify: 'https://open.spotify.com/track/3ee8J1F1ZAg87vjETFo9uG' },
    duration_ms: 203000,
  },
  {
    id: '3',
    uri: 'spotify:track:3',
    name: 'Stay',
    artists: [{ name: 'The Kid LAROI' }, { name: 'Justin Bieber' }],
    album: { 
      name: 'F*CK LOVE 3: OVER YOU',
      images: [{ url: 'https://picsum.photos/seed/track3/300/300' }] 
    },
    preview_url: null, // No preview url to test fallback to "Open in Spotify"
    external_urls: { spotify: 'https://open.spotify.com/track/5HCyWJZ86dY6v3wzPd1uEs' },
    duration_ms: 141000,
  },
  {
    id: '4',
    uri: 'spotify:track:4',
    name: 'Heat Waves',
    artists: [{ name: 'Glass Animals' }],
    album: { 
      name: 'Dreamland',
      images: [{ url: 'https://picsum.photos/seed/track4/300/300' }] 
    },
    preview_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    external_urls: { spotify: 'https://open.spotify.com/track/02M2zi3bbNE6q1v7jf5tYf' },
    duration_ms: 238000,
  },
  {
    id: '5',
    uri: 'spotify:track:5',
    name: 'Good 4 U',
    artists: [{ name: 'Olivia Rodrigo' }],
    album: { 
      name: 'SOUR',
      images: [{ url: 'https://picsum.photos/seed/track5/300/300' }] 
    },
    preview_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    external_urls: { spotify: 'https://open.spotify.com/track/4ZtFanQDdTE5ISQ0kf6Raa' },
    duration_ms: 178000,
  },
  {
    id: '6',
    uri: 'spotify:track:6',
    name: 'Peaches',
    artists: [{ name: 'Justin Bieber' }],
    album: { 
      name: 'Justice',
      images: [{ url: 'https://picsum.photos/seed/track6/300/300' }] 
    },
    preview_url: null, // No preview url to test fallback
    external_urls: { spotify: 'https://open.spotify.com/track/4iJyoZeR6Clhy6Jm0j1jrg' },
    duration_ms: 198000,
  },
  {
    id: '7',
    uri: 'spotify:track:7',
    name: 'Montero (Call Me By Your Name)',
    artists: [{ name: 'Lil Nas X' }],
    album: { 
      name: 'MONTERO',
      images: [{ url: 'https://picsum.photos/seed/track7/300/300' }] 
    },
    preview_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
    external_urls: { spotify: 'https://open.spotify.com/track/67tG43Xz758Ju6QFoLz4e4' },
    duration_ms: 137000,
  },
  {
    id: '8',
    uri: 'spotify:track:8',
    name: 'Save Your Tears',
    artists: [{ name: 'The Weeknd' }],
    album: { 
      name: 'After Hours',
      images: [{ url: 'https://picsum.photos/seed/track8/300/300' }] 
    },
    preview_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
    external_urls: { spotify: 'https://open.spotify.com/track/57bgBn4gJ7hrss0vIUyv21' },
    duration_ms: 215000,
  },
]

async function getRecommendations(moodText) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500))

  // Parse mood to get audio features
  const { features, detected } = parseMood(moodText)

  // In a real implementation, this would call the backend API
  // POST /api/recommendations with the mood features
  // Error handling would be applied here:
  // try {
  //   const response = await axios.post('/api/recommendations', { mood: detected, features })
  //   return response.data
  // } catch (error) {
  //   const message = getSpotifyErrorMessage(error)
  //   if (isRateLimitError(error)) {
  //     const retryAfter = getRetryAfterSeconds(error)
  //     throw new Error(`${message} Retry after ${retryAfter} seconds.`)
  //   }
  //   throw new Error(message)
  // }
  
  // For now, return mock tracks
  return {
    mood: detected,
    features,
    tracks: MOCK_TRACKS.slice(0, 8),
  }
}

export { getRecommendations, MOCK_TRACKS }
export default getRecommendations

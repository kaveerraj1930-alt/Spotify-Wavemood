import { parseMood } from './moodParser'

const MOCK_TRACKS = [
  {
    id: '1',
    name: 'Blinding Lights',
    artists: [{ name: 'The Weeknd' }],
    album: { images: [{ url: 'https://picsum.photos/seed/track1/300/300' }] },
    preview_url: null,
    external_urls: { spotify: '#' },
  },
  {
    id: '2',
    name: 'Levitating',
    artists: [{ name: 'Dua Lipa' }],
    album: { images: [{ url: 'https://picsum.photos/seed/track2/300/300' }] },
    preview_url: null,
    external_urls: { spotify: '#' },
  },
  {
    id: '3',
    name: 'Stay',
    artists: [{ name: 'The Kid LAROI', name: 'Justin Bieber' }],
    album: { images: [{ url: 'https://picsum.photos/seed/track3/300/300' }] },
    preview_url: null,
    external_urls: { spotify: '#' },
  },
  {
    id: '4',
    name: 'Heat Waves',
    artists: [{ name: 'Glass Animals' }],
    album: { images: [{ url: 'https://picsum.photos/seed/track4/300/300' }] },
    preview_url: null,
    external_urls: { spotify: '#' },
  },
  {
    id: '5',
    name: 'Good 4 U',
    artists: [{ name: 'Olivia Rodrigo' }],
    album: { images: [{ url: 'https://picsum.photos/seed/track5/300/300' }] },
    preview_url: null,
    external_urls: { spotify: '#' },
  },
  {
    id: '6',
    name: 'Peaches',
    artists: [{ name: 'Justin Bieber' }],
    album: { images: [{ url: 'https://picsum.photos/seed/track6/300/300' }] },
    preview_url: null,
    external_urls: { spotify: '#' },
  },
  {
    id: '7',
    name: 'Montero',
    artists: [{ name: 'Lil Nas X' }],
    album: { images: [{ url: 'https://picsum.photos/seed/track7/300/300' }] },
    preview_url: null,
    external_urls: { spotify: '#' },
  },
  {
    id: '8',
    name: 'Save Your Tears',
    artists: [{ name: 'The Weeknd' }],
    album: { images: [{ url: 'https://picsum.photos/seed/track8/300/300' }] },
    preview_url: null,
    external_urls: { spotify: '#' },
  },
]

async function getRecommendations(moodText) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500))

  // Parse mood to get audio features
  const { features, detected } = parseMood(moodText)

  // In a real implementation, this would call the backend API
  // POST /api/recommendations with the mood features
  // For now, return mock tracks
  return {
    mood: detected,
    features,
    tracks: MOCK_TRACKS.slice(0, 8),
  }
}

export { getRecommendations }
export default getRecommendations

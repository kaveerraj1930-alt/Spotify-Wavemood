import { Router } from 'express'
import { parseMood } from '../services/moodParser.js'
import SpotifyWebApi from 'spotify-web-api-node'
import { createRequireAuth } from '../middleware/requireAuth.js'
import { spotifyAuth } from '../services/spotifyAuth.js'

export function createRecommendationsRouter(options) {
  const { spotifyAuthService, requireAuth } = options
  const router = Router()

  router.post('/', requireAuth, async (req, res) => {
    try {
      const { mood, features: inputFeatures } = req.body
      
      let features, detectedMood
      if (inputFeatures) {
        features = inputFeatures
        detectedMood = mood
      } else {
        const parsed = parseMood(mood || 'Chill')
        features = parsed.features
        detectedMood = parsed.detected
      }

      // Get API instance with access token
      const api = new SpotifyWebApi({
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        redirectUri: process.env.SPOTIFY_REDIRECT_URI,
      })
      api.setAccessToken(req.spotifyTokens.accessToken)
      if (req.spotifyTokens.refreshToken) {
        api.setRefreshToken(req.spotifyTokens.refreshToken)
      }

      // Prepare recommendation parameters
      const params = {
        seed_genres: features.seed_genres.slice(0, 5), // Spotify allows max 5 seeds total
        limit: 20,
      }

      if (features.valence !== undefined) params.target_valence = features.valence
      if (features.energy !== undefined) params.target_energy = features.energy
      if (features.danceability !== undefined) params.target_danceability = features.danceability
      if (features.tempo !== undefined) params.target_tempo = features.tempo
      if (features.acousticness !== undefined) params.target_acousticness = features.acousticness

      const { body } = await api.getRecommendations(params)

      // Format tracks
      const tracks = body.tracks.map(track => ({
        id: track.id,
        uri: track.uri,
        name: track.name,
        artists: track.artists.map(a => ({ name: a.name, id: a.id })),
        album: {
          name: track.album.name,
          images: track.album.images,
          id: track.album.id,
        },
        preview_url: track.preview_url,
        external_urls: track.external_urls,
        duration_ms: track.duration_ms,
      }))

      return res.json({
        mood: detectedMood,
        features,
        tracks,
      })
    } catch (error) {
      console.error('Recommendation error:', error)
      return res.status(500).json({ error: 'Failed to get recommendations' })
    }
  })

  return router
}

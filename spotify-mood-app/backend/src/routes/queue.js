import { Router } from 'express'
import SpotifyWebApi from 'spotify-web-api-node'

export function createQueueRouter(options) {
  const { requireAuth } = options
  const router = Router()

  router.post('/add', requireAuth, async (req, res) => {
    try {
      const { uri } = req.body
      
      if (!uri) {
        return res.status(400).json({ error: 'Track URI is required' })
      }

      // Get API instance
      const api = new SpotifyWebApi({
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        redirectUri: process.env.SPOTIFY_REDIRECT_URI,
      })
      api.setAccessToken(req.spotifyTokens.accessToken)
      if (req.spotifyTokens.refreshToken) {
        api.setRefreshToken(req.spotifyTokens.refreshToken)
      }

      // Add to queue
      await api.addToQueue(uri)

      return res.json({ success: true })
    } catch (error) {
      console.error('Queue add error:', error)
      return res.status(500).json({ error: 'Failed to add track to queue' })
    }
  })

  return router
}

import { Router } from 'express'
import SpotifyWebApi from 'spotify-web-api-node'
import { createRequireAuth } from '../middleware/requireAuth.js'

export function createPlaylistRouter(options) {
  const { spotifyAuthService, requireAuth } = options
  const router = Router()

  router.post('/create', requireAuth, async (req, res) => {
    try {
      const { name, uris } = req.body
      
      if (!name || !name.trim()) {
        return res.status(400).json({ error: 'Playlist name is required' })
      }

      if (!uris || !Array.isArray(uris) || uris.length === 0) {
        return res.status(400).json({ error: 'At least one track URI is required' })
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

      // Get user ID
      const { body: user } = await api.getMe()

      // Create playlist
      const { body: playlist } = await api.createPlaylist(user.id, {
        name: name.trim(),
        description: 'Created with WaveMood',
        public: false,
      })

      // Add tracks to playlist in chunks (Spotify allows max 100 tracks per request)
      const chunkSize = 100
      for (let i = 0; i < uris.length; i += chunkSize) {
        const chunk = uris.slice(i, i + chunkSize)
        await api.addTracksToPlaylist(playlist.id, chunk)
      }

      return res.json({
        success: true,
        playlistId: playlist.id,
        name: playlist.name,
        externalUrl: playlist.external_urls.spotify,
      })
    } catch (error) {
      console.error('Playlist creation error:', error)
      return res.status(500).json({ error: 'Failed to create playlist' })
    }
  })

  return router
}

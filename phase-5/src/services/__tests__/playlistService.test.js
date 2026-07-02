import { describe, it, expect } from 'vitest'
import { addToQueue, createPlaylist } from '../playlistService'

describe('playlistService', () => {
  describe('addToQueue', () => {
    it('successfully adds a valid track URI to queue', async () => {
      const response = await addToQueue('spotify:track:123')
      expect(response.success).toBe(true)
      expect(response.message).toContain('added to queue')
    })

    it('throws an error if no URI is provided', async () => {
      await expect(addToQueue(null)).rejects.toThrow('URI is required')
    })
  })

  describe('createPlaylist', () => {
    it('successfully creates a playlist with valid name and tracks', async () => {
      const response = await createPlaylist('My Rock Playlist', ['spotify:track:1', 'spotify:track:2'])
      expect(response.success).toBe(true)
      expect(response.name).toBe('My Rock Playlist')
      expect(response.playlistId).toContain('mock-playlist')
    })

    it('throws error if playlist name is empty', async () => {
      await expect(createPlaylist('', ['spotify:track:1'])).rejects.toThrow('Playlist name is required')
    })

    it('throws error if tracks list is empty or invalid', async () => {
      await expect(createPlaylist('My Playlist', [])).rejects.toThrow('At least one track URI is required')
      await expect(createPlaylist('My Playlist', null)).rejects.toThrow('At least one track URI is required')
    })
  })
})

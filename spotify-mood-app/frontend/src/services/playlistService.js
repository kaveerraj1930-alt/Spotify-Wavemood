// Mock service to simulate Spotify actions.
// In a real application, these would call endpoints like:
// POST /api/queue/add
// POST /api/playlist/create

import axios from 'axios'
import { apiClient } from '../api/client'

export async function addToQueue(trackUri) {
  try {
    const response = await apiClient.post('/api/queue/add', { uri: trackUri })
    return response.data
  } catch (error) {
    console.error('Error adding to queue:', error)
    throw error.response?.data?.error || 'Failed to add to queue'
  }
}

export async function createPlaylist(name, trackUris) {
  try {
    const response = await apiClient.post('/api/playlist/create', {
      name,
      uris: trackUris,
    })
    return response.data
  } catch (error) {
    console.error('Error creating playlist:', error)
    throw error.response?.data?.error || 'Failed to create playlist'
  }
}

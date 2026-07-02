// Mock service to simulate Spotify actions.
// In a real application, these would call endpoints like:
// POST /api/queue/add
// POST /api/playlist/create

export async function addToQueue(trackUri) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Simulate success rate (could handle failure cases for testing/robustness)
  if (!trackUri) {
    throw new Error('Track URI is required to add to queue')
  }

  return {
    success: true,
    message: 'Track successfully added to queue',
  }
}

export async function createPlaylist(name, trackUris) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  if (!name || name.trim() === '') {
    throw new Error('Playlist name is required')
  }

  if (!trackUris || !Array.isArray(trackUris) || trackUris.length === 0) {
    throw new Error('At least one track URI is required to create a playlist')
  }

  return {
    success: true,
    playlistId: `mock-playlist-${Math.random().toString(36).substr(2, 9)}`,
    name,
    externalUrl: `https://open.spotify.com/playlist/mock-playlist-${Math.random().toString(36).substr(2, 9)}`,
    message: 'Playlist created and tracks added successfully',
  }
}

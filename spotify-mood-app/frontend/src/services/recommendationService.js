import { parseMood } from './moodParser'
import axios from 'axios'
import { apiClient } from '../api/client'

async function getRecommendations(moodText) {
  // Parse mood to get audio features
  const { features, detected } = parseMood(moodText)

  // Call backend API
  try {
    const response = await apiClient.post('/api/recommendations', {
      mood: detected,
      features,
    })
    return response.data
  } catch (error) {
    console.error('Error fetching recommendations:', error)
    throw error.response?.data?.error || 'Failed to fetch recommendations'
  }
}

export { getRecommendations }
export default getRecommendations

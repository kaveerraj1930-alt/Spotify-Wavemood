import { useState } from 'react'
import { getRecommendations } from '../services/recommendationService'
import useMoodStore from '../store/moodStore'

function useRecommendations() {
  const [error, setError] = useState(null)
  const { setSubmitting, setResults, moodInput, addToHistory, reset } = useMoodStore()

  const fetchRecommendations = async () => {
    if (!moodInput.trim()) {
      setError('Please enter a mood or select a chip')
      return
    }

    setError(null)
    setSubmitting(true)

    try {
      const data = await getRecommendations(moodInput)
      setResults(data)
      addToHistory(moodInput)
    } catch (err) {
      setError('Failed to get recommendations. Please try again.')
      console.error('Recommendation error:', err)
    } finally {
      setSubmitting(false)
    }
  }

  const clearError = () => setError(null)

  const resetRecommendations = () => {
    reset()
    setError(null)
  }

  return {
    error,
    fetchRecommendations,
    clearError,
    resetRecommendations,
  }
}

export default useRecommendations

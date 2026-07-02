import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MoodChipGrid from '../components/MoodChipGrid'
import MoodInput from '../components/MoodInput'
import LoadingPulse from '../components/LoadingPulse'
import ErrorToast from '../components/ErrorToast'
import EmptyState from '../components/EmptyState'
import TrackList from '../components/TrackList'
import useMoodStore from '../store/moodStore'
import useRecommendations from '../hooks/useRecommendations'

function MoodRecommendation() {
  const { moodInput, moodHistory, isSubmitting, results, reset } = useMoodStore()
  const { error, fetchRecommendations, clearError, resetRecommendations } = useRecommendations()
  const [notification, setNotification] = useState(null)

  const handleSubmit = async () => {
    await fetchRecommendations()
  }

  const handleHistoryClick = (mood) => {
    useMoodStore.setState({ moodInput: mood, selectedMood: mood })
  }

  const handleRefresh = () => {
    resetRecommendations()
  }

  const handleNotification = (notif) => {
    setNotification(notif)
    setTimeout(() => {
      setNotification((curr) => (curr?.message === notif.message ? null : curr))
    }, 4000)
  }

  return (
    <div className="p-4 md:p-8">
      <ErrorToast error={error} onClose={clearError} />
      
      {/* Toast Notifications for Success / Action Feedback */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="fixed bottom-28 right-4 z-50 max-w-sm w-full pointer-events-none"
          >
            <div className={`mx-4 px-4 py-3 rounded shadow-2xl flex items-center justify-between gap-4 text-sm pointer-events-auto ${
              notification.type === 'success' 
                ? 'bg-spotify-green text-black font-bold' 
                : 'bg-red-600 text-white font-medium'
            }`}>
              <span>{notification.message}</span>
              {notification.link && (
                <a
                  href={notification.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`underline hover:opacity-80 transition-opacity ${
                    notification.type === 'success' ? 'text-black font-extrabold' : 'text-white font-bold'
                  }`}
                >
                  {notification.linkLabel || 'Link'}
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-3xl font-bold text-white mb-2">WaveMood</h1>
        <p className="text-gray-400 mb-8">Select a mood or describe how you're feeling</p>

        {/* Mood History */}
        {moodHistory.length > 0 && !results && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h2 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">Recent Moods</h2>
            <div className="flex flex-wrap gap-2">
              {moodHistory.map((mood, index) => (
                <button
                  key={`${mood}-${index}`}
                  onClick={() => handleHistoryClick(mood)}
                  className="px-4 py-2 bg-spotify-card hover:bg-spotify-hover rounded-full text-sm text-gray-300 hover:text-white transition-colors"
                >
                  {mood}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Mood Chips */}
        {!results && (
          <div className="mb-8">
            <h2 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">Select a Mood</h2>
            <MoodChipGrid />
          </div>
        )}

        {/* Mood Input */}
        {!results && (
          <div className="mb-8">
            <MoodInput />
          </div>
        )}

        {/* Submit Button */}
        {!results && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
            disabled={!moodInput.trim() || isSubmitting}
            className={`w-full max-w-2xl mx-auto block px-8 py-4 rounded-full font-bold text-lg transition-all ${
              !moodInput.trim() || isSubmitting
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-spotify-green text-black hover:bg-green-400'
            }`}
          >
            {isSubmitting ? 'Finding Music...' : 'Get Recommendations'}
          </motion.button>
        )}

        {/* Loading State */}
        {isSubmitting && (
          <div className="mt-8">
            <h2 className="text-xl font-bold text-white mb-4">Finding the perfect tracks for you...</h2>
            <LoadingPulse />
          </div>
        )}

        {/* Results */}
        {results && !isSubmitting && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">
                  Recommendations for "{results.mood}"
                </h2>
                <p className="text-gray-400 text-sm">
                  Based on: {results.features.valence} valence, {results.features.energy} energy
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRefresh}
                className="px-4 py-2 bg-spotify-card hover:bg-spotify-hover rounded-full text-sm text-white transition-colors font-medium"
              >
                Try Another Mood
              </motion.button>
            </div>

            <TrackList 
              tracks={results.tracks} 
              mood={results.mood} 
              onNotification={handleNotification} 
            />
          </motion.div>
        )}

        {/* Empty State */}
        {!results && !isSubmitting && !moodInput && (
          <EmptyState />
        )}
      </motion.div>
    </div>
  )
}

export default MoodRecommendation

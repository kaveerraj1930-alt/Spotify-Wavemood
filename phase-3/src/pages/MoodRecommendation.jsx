import { motion } from 'framer-motion'
import MoodChipGrid from '../components/MoodChipGrid'
import MoodInput from '../components/MoodInput'
import useMoodStore from '../store/moodStore'

function MoodRecommendation() {
  const { moodInput, moodHistory, isSubmitting, addToHistory, setSubmitting, reset } = useMoodStore()

  const handleSubmit = async () => {
    if (!moodInput.trim()) return

    setSubmitting(true)
    
    // Add to history
    addToHistory(moodInput)
    
    // Mock API call - in real implementation this would call the backend
    console.log('Submitting mood:', moodInput)
    
    // Simulate API delay
    setTimeout(() => {
      setSubmitting(false)
      reset()
    }, 1000)
  }

  const handleHistoryClick = (mood) => {
    useMoodStore.setState({ moodInput: mood, selectedMood: mood })
  }

  return (
    <div className="p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-3xl font-bold text-white mb-2">Mood Finder</h1>
        <p className="text-gray-400 mb-8">Select a mood or describe how you're feeling</p>

        {/* Mood History */}
        {moodHistory.length > 0 && (
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
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">Select a Mood</h2>
          <MoodChipGrid />
        </div>

        {/* Mood Input */}
        <div className="mb-8">
          <MoodInput />
        </div>

        {/* Submit Button */}
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
      </motion.div>
    </div>
  )
}

export default MoodRecommendation

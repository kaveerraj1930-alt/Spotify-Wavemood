import { motion } from 'framer-motion'
import useMoodStore from '../store/moodStore'

const MAX_CHARS = 280

function MoodInput() {
  const { moodInput, setMoodInput, isSubmitting } = useMoodStore()

  const handleChange = (e) => {
    const value = e.target.value
    if (value.length <= MAX_CHARS) {
      setMoodInput(value)
    }
  }

  const charCount = moodInput.length
  const isNearLimit = charCount > MAX_CHARS * 0.9
  const isAtLimit = charCount === MAX_CHARS

  return (
    <div className="w-full max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        <textarea
          value={moodInput}
          onChange={handleChange}
          placeholder="Or describe how you're feeling in your own words..."
          className="w-full bg-spotify-card text-white placeholder-gray-400 rounded-xl p-4 pr-16 resize-none focus:outline-none focus:ring-2 focus:ring-spotify-green transition-all min-h-[120px]"
          disabled={isSubmitting}
        />
        <div className="absolute bottom-3 right-3 text-xs">
          <span className={isNearLimit ? (isAtLimit ? 'text-red-500' : 'text-yellow-500') : 'text-gray-400'}>
            {charCount}/{MAX_CHARS}
          </span>
        </div>
      </motion.div>
    </div>
  )
}

export default MoodInput

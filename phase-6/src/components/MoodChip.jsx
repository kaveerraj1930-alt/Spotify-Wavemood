import { motion } from 'framer-motion'

const moodColors = {
  Sleepy: 'from-blue-900 to-indigo-900',
  Motivated: 'from-orange-500 to-red-600',
  Emotional: 'from-purple-900 to-pink-900',
  Happy: 'from-yellow-400 to-orange-500',
  Chill: 'from-teal-500 to-cyan-600',
  Party: 'from-pink-500 to-purple-600',
  Angry: 'from-red-700 to-red-900',
  Focus: 'from-green-600 to-teal-700',
  Sad: 'from-gray-700 to-slate-800',
}

function MoodChip({ mood, isSelected, onClick }) {
  const gradient = moodColors[mood] || 'from-gray-600 to-gray-700'

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        relative px-6 py-3 rounded-full font-semibold text-white
        bg-gradient-to-r ${gradient}
        transition-all duration-200
        ${isSelected ? 'ring-2 ring-white ring-offset-2 ring-offset-spotify-black' : ''}
        hover:shadow-lg
      `}
    >
      {mood}
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 w-5 h-5 bg-spotify-green rounded-full flex items-center justify-center"
        >
          <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </motion.div>
      )}
    </motion.button>
  )
}

export default MoodChip

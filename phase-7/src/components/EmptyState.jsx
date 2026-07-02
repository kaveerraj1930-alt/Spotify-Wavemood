import { motion } from 'framer-motion'
import { RefreshCw } from 'lucide-react'

function EmptyState({ onRefresh }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-12"
    >
      <div className="w-24 h-24 mx-auto mb-6 bg-spotify-card rounded-full flex items-center justify-center">
        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
      </div>
      <h3 className="text-xl font-bold text-white mb-2">No recommendations yet</h3>
      <p className="text-gray-400 mb-6 max-w-md mx-auto">
        Select a mood or describe how you're feeling to get personalized music recommendations.
      </p>
      {onRefresh && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRefresh}
          className="flex items-center gap-2 mx-auto px-6 py-3 bg-spotify-card hover:bg-spotify-hover rounded-full transition-colors text-white"
        >
          <RefreshCw size={18} />
          <span>Try Again</span>
        </motion.button>
      )}
    </motion.div>
  )
}

export default EmptyState

import { motion } from 'framer-motion'

function LoadingPulse() {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <div key={i} className="flex items-center gap-4 p-4 bg-spotify-card rounded-lg">
          <motion.div
            className="w-16 h-16 bg-spotify-hover rounded-md"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
          />
          <div className="flex-1 space-y-2">
            <motion.div
              className="h-4 bg-spotify-hover rounded w-3/4"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 + 0.1 }}
            />
            <motion.div
              className="h-3 bg-spotify-hover rounded w-1/2"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 + 0.2 }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default LoadingPulse
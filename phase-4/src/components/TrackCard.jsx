import { motion } from 'framer-motion'
import { Play } from 'lucide-react'

function TrackCard({ track, index }) {
  const artistNames = track.artists.map(a => a.name).join(', ')
  const imageUrl = track.album.images[0]?.url || 'https://picsum.photos/seed/default/300/300'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group flex items-center gap-4 p-4 bg-spotify-card rounded-lg hover:bg-spotify-hover transition-all cursor-pointer"
    >
      <div className="relative">
        <img
          src={imageUrl}
          alt={track.name}
          className="w-16 h-16 rounded-md shadow-lg"
        />
        <button className="absolute bottom-1 right-1 w-8 h-8 bg-spotify-green rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all shadow hover:scale-105">
          <Play size={14} className="text-black fill-black" />
        </button>
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-white truncate">{track.name}</h4>
        <p className="text-sm text-gray-400 truncate">{artistNames}</p>
      </div>
    </motion.div>
  )
}

export default TrackCard

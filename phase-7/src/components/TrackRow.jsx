import { motion } from 'framer-motion'
import { Play, Pause, ExternalLink, PlusCircle, Loader2 } from 'lucide-react'
import { useState } from 'react'
import usePlayerStore from '../store/playerStore'
import { addToQueue } from '../services/playlistService'

function TrackRow({ track, index, onNotification }) {
  const { currentTrack, isPlaying, playTrack } = usePlayerStore()
  const [isAdding, setIsAdding] = useState(false)

  const isCurrentTrack = currentTrack?.id === track.id
  const isThisPlaying = isCurrentTrack && isPlaying

  const artistNames = track.artists.map((a) => a.name).join(', ')
  const imageUrl = track.album.images[0]?.url || 'https://picsum.photos/seed/default/300/300'
  const albumName = track.album.name || ''

  // Format milliseconds to M:SS
  const formatDuration = (ms) => {
    if (!ms) return '0:00'
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const handlePlayClick = (e) => {
    e.stopPropagation()
    if (track.preview_url) {
      playTrack(track)
    }
  }

  const handleQueueClick = async (e) => {
    e.stopPropagation()
    setIsAdding(true)
    try {
      const response = await addToQueue(track.uri || `spotify:track:${track.id}`)
      if (response.success) {
        onNotification({
          type: 'success',
          message: `"${track.name}" added to queue`,
        })
      }
    } catch (err) {
      onNotification({
        type: 'error',
        message: err.message || 'Failed to add to queue',
      })
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={handlePlayClick}
      className={`group grid grid-cols-[auto_1fr_120px] md:grid-cols-[40px_2fr_1fr_auto_80px] items-center gap-4 px-4 py-2.5 rounded-md hover:bg-[#282828] transition-colors cursor-pointer ${
        isCurrentTrack ? 'bg-[#181818]' : ''
      }`}
    >
      {/* Index / Play / Pause controls */}
      <div className="hidden md:flex items-center justify-center text-gray-400 text-sm font-semibold">
        {track.preview_url ? (
          <>
            <span className="group-hover:hidden">{isCurrentTrack ? (
              <span className={`text-spotify-green ${isThisPlaying ? 'animate-pulse' : ''}`}>
                {isThisPlaying ? '||' : index + 1}
              </span>
            ) : (
              index + 1
            )}</span>
            <button
              onClick={handlePlayClick}
              className="hidden group-hover:block text-white hover:scale-110 transition-transform"
              aria-label={isThisPlaying ? 'Pause' : 'Play'}
            >
              {isThisPlaying ? <Pause size={16} fill="white" /> : <Play size={16} fill="white" />}
            </button>
          </>
        ) : (
          <span className="text-gray-600">{index + 1}</span>
        )}
      </div>

      {/* Art + Title + Artist info */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="relative flex-shrink-0 w-10 h-10">
          <img
            src={imageUrl}
            alt={track.name}
            className="w-full h-full rounded shadow object-cover"
          />
          {track.preview_url && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity md:hidden">
              <button
                onClick={handlePlayClick}
                className="text-white"
                aria-label={isThisPlaying ? 'Pause' : 'Play'}
              >
                {isThisPlaying ? <Pause size={18} fill="white" /> : <Play size={18} fill="white" />}
              </button>
            </div>
          )}
        </div>
        <div className="min-w-0">
          <p
            className={`font-medium text-sm truncate ${
              isCurrentTrack ? 'text-spotify-green' : 'text-white'
            }`}
          >
            {track.name}
          </p>
          <p className="text-xs text-gray-400 truncate hover:underline">{artistNames}</p>
        </div>
      </div>

      {/* Album name */}
      <div className="hidden md:block text-sm text-gray-400 truncate">
        {albumName}
      </div>

      {/* Action buttons (Add to queue, Open in Spotify) */}
      <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
        {/* Open in Spotify link - more prominent when no preview */}
        <a
          href={track.external_urls?.spotify || `https://open.spotify.com/track/${track.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`p-2 rounded-full hover:bg-spotify-hover transition-colors ${
            !track.preview_url
              ? 'text-spotify-green hover:text-green-400'
              : 'text-gray-400 hover:text-white'
          }`}
          title={track.preview_url ? 'Open in Spotify' : 'Preview not available - Open in Spotify'}
          aria-label="Open in Spotify"
        >
          <ExternalLink size={16} />
        </a>

        {/* Add to queue button */}
        <button
          onClick={handleQueueClick}
          disabled={isAdding}
          className="p-2 text-gray-400 hover:text-white disabled:text-gray-600 rounded-full hover:bg-spotify-hover transition-colors"
          title="Add to queue"
          aria-label="Add to queue"
        >
          {isAdding ? <Loader2 size={16} className="animate-spin" /> : <PlusCircle size={16} />}
        </button>
      </div>

      {/* Track duration */}
      <div className="text-right text-sm text-gray-400 pr-2">
        {formatDuration(track.duration_ms)}
      </div>
    </motion.div>
  )
}

export default TrackRow

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Disc, Music, Loader2 } from 'lucide-react'
import TrackRow from './TrackRow'
import { createPlaylist } from '../services/playlistService'

function TrackList({ tracks, mood, onNotification }) {
  const [playlistName, setPlaylistName] = useState(`${mood || 'My Mood'} Playlist`)
  const [isSaving, setIsSaving] = useState(false)

  const handleSavePlaylist = async (e) => {
    e.preventDefault()
    if (!playlistName.trim()) {
      onNotification({
        type: 'error',
        message: 'Playlist name cannot be empty',
      })
      return
    }

    setIsSaving(true)
    try {
      const trackUris = tracks.map((t) => t.uri || `spotify:track:${t.id}`)
      const response = await createPlaylist(playlistName, trackUris)
      if (response.success) {
        onNotification({
          type: 'success',
          message: `Playlist "${response.name}" saved!`,
        })
      }
    } catch (err) {
      onNotification({
        type: 'error',
        message: err.message || 'Failed to save playlist',
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Table Headers (matching Spotify list views) */}
      <div className="hidden md:grid grid-cols-[40px_2fr_1fr_auto_80px] gap-4 px-4 py-2 border-b border-gray-800 text-gray-400 text-xs uppercase tracking-wider font-semibold">
        <span className="text-center">#</span>
        <span>Title</span>
        <span>Album</span>
        <span className="pl-2">Actions</span>
        <span className="text-right pr-2">Duration</span>
      </div>

      {/* Track Rows */}
      <div className="space-y-1">
        {tracks.map((track, index) => (
          <TrackRow
            key={track.id}
            track={track}
            index={index}
            onNotification={onNotification}
          />
        ))}
      </div>

      {/* Save as Playlist Footer Actions */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: tracks.length * 0.05 }}
        className="mt-8 bg-spotify-dark p-6 rounded-lg border border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-spotify-card hover:bg-spotify-hover rounded flex items-center justify-center text-spotify-green">
            <Music size={24} />
          </div>
          <div>
            <h3 className="font-bold text-white text-base">Save these recommendations</h3>
            <p className="text-sm text-gray-400">Create a private playlist in your Spotify account</p>
          </div>
        </div>

        <form onSubmit={handleSavePlaylist} className="flex flex-col sm:flex-row items-stretch gap-3 w-full md:w-auto">
          <input
            type="text"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
            disabled={isSaving}
            className="px-4 py-2 bg-spotify-card border border-gray-700 hover:border-gray-500 focus:border-spotify-green focus:outline-none rounded text-white text-sm transition-colors w-full sm:w-64"
            placeholder="Playlist name..."
            aria-label="Playlist name"
          />
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-2 bg-spotify-green text-black hover:bg-green-400 disabled:bg-gray-600 disabled:text-gray-400 rounded font-bold text-sm transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
          >
            {isSaving ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Saving...
              </>
            ) : (
              'Save as Playlist'
            )}
          </button>
        </form>
      </motion.div>
    </div>
  )
}

export default TrackList
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react'
import { useState } from 'react'

function PreviewPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(30)

  // Mock data for preview player
  const currentTrack = {
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    image: 'https://picsum.photos/seed/track1/56/56',
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-gradient-to-b from-spotify-card to-black border-t border-gray-800 px-4 py-3 z-50">
      <div className="flex items-center justify-between max-w-screen-2xl mx-auto">
        {/* Track Info */}
        <div className="flex items-center gap-3 w-1/4 min-w-0">
          <img
            src={currentTrack.image}
            alt={currentTrack.title}
            className="w-14 h-14 rounded shadow-lg"
          />
          <div className="min-w-0">
            <p className="text-white font-semibold text-sm truncate">{currentTrack.title}</p>
            <p className="text-gray-400 text-xs truncate">{currentTrack.artist}</p>
          </div>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center flex-1 max-w-xl">
          <div className="flex items-center gap-4 mb-2">
            <button className="text-gray-400 hover:text-white transition-colors">
              <SkipBack size={20} />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform"
            >
              {isPlaying ? <Pause size={18} className="text-black" /> : <Play size={18} className="text-black fill-black" />}
            </button>
            <button className="text-gray-400 hover:text-white transition-colors">
              <SkipForward size={20} />
            </button>
          </div>
          <div className="flex items-center gap-2 w-full">
            <span className="text-xs text-gray-400 w-10 text-right">{formatTime(progress)}</span>
            <div className="flex-1 h-1 bg-gray-600 rounded-full group cursor-pointer">
              <div
                className="h-full bg-white rounded-full relative group-hover:bg-spotify-green transition-colors"
                style={{ width: `${(progress / 30) * 100}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 shadow" />
              </div>
            </div>
            <span className="text-xs text-gray-400 w-10">0:30</span>
          </div>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-2 w-1/4 justify-end">
          <Volume2 size={20} className="text-gray-400" />
          <div className="w-24 h-1 bg-gray-600 rounded-full">
            <div className="h-full bg-white rounded-full" style={{ width: '70%' }} />
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-20 left-0 right-0 bg-spotify-card border-t border-gray-700 px-4 py-2">
        <div className="flex justify-around">
          <button className="flex flex-col items-center gap-1 text-white">
            <span className="text-xs font-semibold">Home</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-400">
            <span className="text-xs">Search</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-400">
            <span className="text-xs">Library</span>
          </button>
        </div>
      </nav>
    </footer>
  )
}

export default PreviewPlayer

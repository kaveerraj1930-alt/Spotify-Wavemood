import { Play, Pause, SkipBack, SkipForward, Volume2, Volume1, VolumeX } from 'lucide-react'
import usePlayerStore from '../store/playerStore'
import useMoodStore from '../store/moodStore'

function PreviewPlayer() {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    playTrack,
    play,
    pause,
    setVolume,
    setCurrentTime,
    nextTrack,
    prevTrack,
  } = usePlayerStore()

  const { results } = useMoodStore()
  const tracksList = results?.tracks || []

  if (!currentTrack) {
    return null
  }

  const artistNames = currentTrack.artists.map((a) => a.name).join(', ')
  const imageUrl = currentTrack.album.images[0]?.url || 'https://picsum.photos/seed/default/56/56'

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handlePlayPause = () => {
    if (isPlaying) {
      pause()
    } else {
      play()
    }
  }

  const handleProgressBarChange = (e) => {
    const newTime = parseFloat(e.target.value)
    setCurrentTime(newTime)
  }

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
  }

  const VolumeIcon = () => {
    if (volume === 0) return <VolumeX size={20} className="text-gray-400" />
    if (volume < 0.5) return <Volume1 size={20} className="text-gray-400" />
    return <Volume2 size={20} className="text-gray-400" />
  }

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-gradient-to-b from-[#181818] to-black border-t border-gray-800 px-4 py-3 z-50 shadow-2xl">
      <div className="flex items-center justify-between max-w-screen-2xl mx-auto gap-4">
        {/* Track Info */}
        <div className="flex items-center gap-3 w-1/3 min-w-0">
          <img
            src={imageUrl}
            alt={currentTrack.name}
            className="w-14 h-14 rounded shadow-lg object-cover flex-shrink-0"
          />
          <div className="min-w-0">
            <p className="text-white font-medium text-sm truncate hover:underline cursor-pointer">
              {currentTrack.name}
            </p>
            <p className="text-gray-400 text-xs truncate hover:underline cursor-pointer">
              {artistNames}
            </p>
          </div>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center flex-1 max-w-xl">
          <div className="flex items-center gap-5 mb-1.5">
            <button
              onClick={() => prevTrack(tracksList)}
              disabled={tracksList.length === 0}
              className="text-gray-400 hover:text-white disabled:text-gray-600 disabled:cursor-not-allowed transition-colors"
              title="Previous Track"
              aria-label="Previous Track"
            >
              <SkipBack size={20} />
            </button>
            
            <button
              onClick={handlePlayPause}
              className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
              title={isPlaying ? 'Pause' : 'Play'}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause size={14} className="text-black fill-black" />
              ) : (
                <Play size={14} className="text-black fill-black ml-0.5" />
              )}
            </button>

            <button
              onClick={() => nextTrack(tracksList)}
              disabled={tracksList.length === 0}
              className="text-gray-400 hover:text-white disabled:text-gray-600 disabled:cursor-not-allowed transition-colors"
              title="Next Track"
              aria-label="Next Track"
            >
              <SkipForward size={20} />
            </button>
          </div>

          <div className="flex items-center gap-3 w-full">
            <span className="text-[10px] text-gray-400 w-8 text-right">
              {formatTime(currentTime)}
            </span>
            
            <div className="flex-1 flex items-center">
              <input
                type="range"
                min="0"
                max={duration || 30}
                step="0.1"
                value={currentTime}
                onChange={handleProgressBarChange}
                className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-white hover:accent-spotify-green transition-colors"
                style={{
                  background: `linear-gradient(to right, #1db954 0%, #1db954 ${
                    (currentTime / (duration || 30)) * 100
                  }%, #4b5563 ${(currentTime / (duration || 30)) * 100}%, #4b5563 100%)`,
                }}
                aria-label="Seek progress"
              />
            </div>

            <span className="text-[10px] text-gray-400 w-8">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Volume Controls */}
        <div className="flex items-center gap-2 w-1/3 justify-end">
          <button
            onClick={() => setVolume(volume === 0 ? 0.7 : 0)}
            className="focus:outline-none"
            aria-label="Toggle mute"
          >
            <VolumeIcon />
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={handleVolumeChange}
            className="w-20 md:w-24 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-white hover:accent-spotify-green"
            style={{
              background: `linear-gradient(to right, #1db954 0%, #1db954 ${volume * 100}%, #4b5563 ${
                volume * 100
              }%, #4b5563 100%)`,
            }}
            aria-label="Volume slider"
          />
        </div>
      </div>
    </footer>
  )
}

export default PreviewPlayer
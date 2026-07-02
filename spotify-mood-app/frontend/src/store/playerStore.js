import { create } from 'zustand'

let audio = null

const usePlayerStore = create((set, get) => ({
  currentTrack: null,
  isPlaying: false,
  currentTime: 0,
  duration: 30, // Spotify previews are always 30s
  volume: 0.7,

  playTrack: (track) => {
    const { currentTrack, isPlaying, volume } = get()

    // Toggle play/pause if clicking the same track
    if (currentTrack?.id === track.id) {
      if (isPlaying) {
        get().pause()
      } else {
        get().play()
      }
      return
    }

    // Stop current audio if playing a different track
    if (audio) {
      audio.pause()
      audio = null
    }

    if (!track.preview_url) {
      // In a real app, we would show a toast that no preview is available.
      // We will set currentTrack but keep isPlaying false, and maybe open in Spotify instead.
      set({ currentTrack: track, isPlaying: false, currentTime: 0 })
      return
    }

    audio = new Audio(track.preview_url)
    audio.volume = volume

    // Sync HTML5 audio events to state
    audio.addEventListener('play', () => set({ isPlaying: true }))
    audio.addEventListener('pause', () => set({ isPlaying: false }))
    audio.addEventListener('timeupdate', () => {
      if (audio) {
        set({ currentTime: audio.currentTime })
      }
    })
    audio.addEventListener('durationchange', () => {
      if (audio && !isNaN(audio.duration)) {
        set({ duration: audio.duration })
      }
    })
    audio.addEventListener('ended', () => {
      set({ isPlaying: false, currentTime: 0 })
    })

    set({ currentTrack: track, currentTime: 0, isPlaying: true, duration: 30 })

    const playPromise = audio.play()
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch((err) => {
        console.error('Audio playback failed:', err)
        set({ isPlaying: false })
      })
    }
  },

  play: () => {
    if (audio) {
      const playPromise = audio.play()
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch((err) => console.error('Audio play failed:', err))
      }
      set({ isPlaying: true })
    } else {
      const { currentTrack } = get()
      if (currentTrack) {
        // If we have a track but no audio object yet
        const current = currentTrack
        set({ currentTrack: null }) // force recreate
        get().playTrack(current)
      }
    }
  },

  pause: () => {
    if (audio) {
      audio.pause()
    }
    set({ isPlaying: false })
  },

  setVolume: (volume) => {
    const boundedVolume = Math.max(0, Math.min(1, volume))
    if (audio) {
      audio.volume = boundedVolume
    }
    set({ volume: boundedVolume })
  },

  setCurrentTime: (time) => {
    if (audio && !isNaN(time)) {
      const boundedTime = Math.max(0, Math.min(get().duration, time))
      audio.currentTime = boundedTime
      set({ currentTime: boundedTime })
    }
  },

  nextTrack: (tracks) => {
    const { currentTrack } = get()
    if (!currentTrack || !tracks || tracks.length === 0) return

    const currentIndex = tracks.findIndex((t) => t.id === currentTrack.id)
    if (currentIndex !== -1 && currentIndex < tracks.length - 1) {
      get().playTrack(tracks[currentIndex + 1])
    }
  },

  prevTrack: (tracks) => {
    const { currentTrack } = get()
    if (!currentTrack || !tracks || tracks.length === 0) return

    const currentIndex = tracks.findIndex((t) => t.id === currentTrack.id)
    if (currentIndex > 0) {
      get().playTrack(tracks[currentIndex - 1])
    }
  },

  // Helper for cleanup (e.g. for testing)
  cleanup: () => {
    if (audio) {
      audio.pause()
      audio = null
    }
    set({ currentTrack: null, isPlaying: false, currentTime: 0 })
  }
}))

export default usePlayerStore

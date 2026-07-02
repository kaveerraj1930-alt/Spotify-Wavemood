import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const MOOD_HISTORY_KEY = 'mood-history'
const MAX_HISTORY = 3

const useMoodStore = create(
  persist(
    (set, get) => ({
      selectedMood: null,
      moodInput: '',
      moodHistory: [],
      isSubmitting: false,
      results: null,

      setSelectedMood: (mood) => set({ selectedMood: mood }),
      
      setMoodInput: (input) => set({ moodInput: input }),
      
      addToHistory: (mood) => {
        const history = get().moodHistory
        const filtered = history.filter((m) => m !== mood)
        const newHistory = [mood, ...filtered].slice(0, MAX_HISTORY)
        set({ moodHistory: newHistory })
      },
      
      setSubmitting: (isSubmitting) => set({ isSubmitting }),
      
      setResults: (results) => set({ results }),
      
      reset: () => set({
        selectedMood: null,
        moodInput: '',
        isSubmitting: false,
        results: null,
      }),
    }),
    {
      name: MOOD_HISTORY_KEY,
      partialize: (state) => ({ moodHistory: state.moodHistory }),
    }
  )
)

export default useMoodStore

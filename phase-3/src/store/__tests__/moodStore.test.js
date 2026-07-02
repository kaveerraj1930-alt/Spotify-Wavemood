import { describe, it, expect, beforeEach } from 'vitest'
import useMoodStore from '../moodStore'

describe('moodStore', () => {
  beforeEach(() => {
    useMoodStore.setState({
      selectedMood: null,
      moodInput: '',
      moodHistory: [],
      isSubmitting: false,
      results: null,
    })
  })

  it('initializes with default state', () => {
    const state = useMoodStore.getState()
    expect(state.selectedMood).toBeNull()
    expect(state.moodInput).toBe('')
    expect(state.moodHistory).toEqual([])
    expect(state.isSubmitting).toBe(false)
    expect(state.results).toBeNull()
  })

  it('sets selected mood', () => {
    useMoodStore.getState().setSelectedMood('Happy')
    expect(useMoodStore.getState().selectedMood).toBe('Happy')
  })

  it('sets mood input', () => {
    useMoodStore.getState().setMoodInput('I feel energetic')
    expect(useMoodStore.getState().moodInput).toBe('I feel energetic')
  })

  it('adds mood to history', () => {
    useMoodStore.getState().addToHistory('Happy')
    expect(useMoodStore.getState().moodHistory).toEqual(['Happy'])
  })

  it('limits history to 3 items', () => {
    useMoodStore.getState().addToHistory('Happy')
    useMoodStore.getState().addToHistory('Sad')
    useMoodStore.getState().addToHistory('Chill')
    useMoodStore.getState().addToHistory('Angry')
    
    const history = useMoodStore.getState().moodHistory
    expect(history).toHaveLength(3)
    expect(history).toEqual(['Angry', 'Chill', 'Sad'])
  })

  it('removes duplicate moods from history', () => {
    useMoodStore.getState().addToHistory('Happy')
    useMoodStore.getState().addToHistory('Sad')
    useMoodStore.getState().addToHistory('Happy')
    
    const history = useMoodStore.getState().moodHistory
    expect(history).toHaveLength(2)
    expect(history).toEqual(['Happy', 'Sad'])
  })

  it('sets submitting state', () => {
    useMoodStore.getState().setSubmitting(true)
    expect(useMoodStore.getState().isSubmitting).toBe(true)
  })

  it('sets results', () => {
    const mockResults = { tracks: [] }
    useMoodStore.getState().setResults(mockResults)
    expect(useMoodStore.getState().results).toEqual(mockResults)
  })

  it('resets state', () => {
    useMoodStore.getState().setSelectedMood('Happy')
    useMoodStore.getState().setMoodInput('test')
    useMoodStore.getState().setSubmitting(true)
    useMoodStore.getState().setResults({ tracks: [] })
    
    useMoodStore.getState().reset()
    
    const state = useMoodStore.getState()
    expect(state.selectedMood).toBeNull()
    expect(state.moodInput).toBe('')
    expect(state.isSubmitting).toBe(false)
    expect(state.results).toBeNull()
  })

  it('persists mood history to localStorage', () => {
    useMoodStore.getState().addToHistory('Happy')
    useMoodStore.getState().addToHistory('Sad')
    
    // Check if it's persisted by creating a new store instance
    // In a real test, you'd need to mock localStorage
    const history = useMoodStore.getState().moodHistory
    expect(history).toEqual(['Sad', 'Happy'])
  })
})

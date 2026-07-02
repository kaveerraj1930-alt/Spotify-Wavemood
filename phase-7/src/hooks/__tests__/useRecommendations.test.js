import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import useRecommendations from '../useRecommendations'
import useMoodStore from '../../store/moodStore'

describe('useRecommendations', () => {
  beforeEach(() => {
    useMoodStore.setState({
      selectedMood: null,
      moodInput: '',
      moodHistory: [],
      isSubmitting: false,
      results: null,
    })
  })

  it('initializes with no error', () => {
    const { result } = renderHook(() => useRecommendations())
    expect(result.current.error).toBeNull()
  })

  it('has fetchRecommendations function', () => {
    const { result } = renderHook(() => useRecommendations())
    expect(typeof result.current.fetchRecommendations).toBe('function')
  })

  it('has clearError function', () => {
    const { result } = renderHook(() => useRecommendations())
    expect(typeof result.current.clearError).toBe('function')
  })

  it('has resetRecommendations function', () => {
    const { result } = renderHook(() => useRecommendations())
    expect(typeof result.current.resetRecommendations).toBe('function')
  })

  it('sets error when moodInput is empty', async () => {
    useMoodStore.setState({ moodInput: '' })
    const { result } = renderHook(() => useRecommendations())

    await act(async () => {
      await result.current.fetchRecommendations()
    })

    expect(result.current.error).toBe('Please enter a mood or select a chip')
  })

  it('clears error when clearError is called', async () => {
    useMoodStore.setState({ moodInput: '' })
    const { result } = renderHook(() => useRecommendations())

    await act(async () => {
      await result.current.fetchRecommendations()
    })

    expect(result.current.error).not.toBeNull()

    act(() => {
      result.current.clearError()
    })

    expect(result.current.error).toBeNull()
  })

  it('sets submitting to true during fetch', async () => {
    useMoodStore.setState({ moodInput: 'Happy' })
    const { result } = renderHook(() => useRecommendations())

    act(() => {
      result.current.fetchRecommendations()
    })

    expect(useMoodStore.getState().isSubmitting).toBe(true)
  })

  it('resets state when resetRecommendations is called', () => {
    useMoodStore.setState({ 
      moodInput: 'Happy',
      results: { mood: 'Happy', tracks: [] },
      isSubmitting: false,
    })
    const { result } = renderHook(() => useRecommendations())

    act(() => {
      result.current.resetRecommendations()
    })

    const state = useMoodStore.getState()
    expect(state.moodInput).toBe('')
    expect(state.results).toBeNull()
  })
})

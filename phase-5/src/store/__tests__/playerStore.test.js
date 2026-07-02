import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import usePlayerStore from '../playerStore'

describe('playerStore', () => {
  beforeEach(() => {
    usePlayerStore.getState().cleanup()
  })

  afterEach(() => {
    usePlayerStore.getState().cleanup()
  })

  it('initializes with default state', () => {
    const state = usePlayerStore.getState()
    expect(state.currentTrack).toBeNull()
    expect(state.isPlaying).toBe(false)
    expect(state.currentTime).toBe(0)
    expect(state.duration).toBe(30)
    expect(state.volume).toBe(0.7)
  })

  it('plays a new track with preview URL', () => {
    const track = {
      id: 'track-1',
      name: 'Song 1',
      artists: [{ name: 'Artist 1' }],
      album: { name: 'Album 1', images: [] },
      preview_url: 'http://example.com/song1.mp3',
    }

    usePlayerStore.getState().playTrack(track)

    const state = usePlayerStore.getState()
    expect(state.currentTrack).toEqual(track)
    expect(state.isPlaying).toBe(true)
    expect(state.currentTime).toBe(0)
  })

  it('sets isPlaying to false if track does not have preview URL', () => {
    const track = {
      id: 'track-no-url',
      name: 'Silent Song',
      artists: [],
      album: { images: [] },
      preview_url: null,
    }

    usePlayerStore.getState().playTrack(track)

    const state = usePlayerStore.getState()
    expect(state.currentTrack).toEqual(track)
    expect(state.isPlaying).toBe(false)
  })

  it('toggles play/pause when playing the same track', () => {
    const track = {
      id: 'track-1',
      name: 'Song 1',
      artists: [],
      album: { images: [] },
      preview_url: 'http://example.com/song1.mp3',
    }

    // First click: plays
    usePlayerStore.getState().playTrack(track)
    expect(usePlayerStore.getState().isPlaying).toBe(true)

    // Second click: pauses
    usePlayerStore.getState().playTrack(track)
    expect(usePlayerStore.getState().isPlaying).toBe(false)

    // Third click: plays again
    usePlayerStore.getState().playTrack(track)
    expect(usePlayerStore.getState().isPlaying).toBe(true)
  })

  it('adjusts volume and bounds it between 0 and 1', () => {
    const store = usePlayerStore.getState()
    
    store.setVolume(0.5)
    expect(usePlayerStore.getState().volume).toBe(0.5)

    store.setVolume(1.5)
    expect(usePlayerStore.getState().volume).toBe(1)

    store.setVolume(-0.5)
    expect(usePlayerStore.getState().volume).toBe(0)
  })

  it('sets current time', () => {
    const track = {
      id: 'track-1',
      name: 'Song 1',
      artists: [],
      album: { images: [] },
      preview_url: 'http://example.com/song1.mp3',
    }
    usePlayerStore.getState().playTrack(track)
    
    usePlayerStore.getState().setCurrentTime(15)
    expect(usePlayerStore.getState().currentTime).toBe(15)
  })

  it('skips to next track', () => {
    const track1 = { id: 't1', preview_url: 'u1', artists: [], album: { images: [] } }
    const track2 = { id: 't2', preview_url: 'u2', artists: [], album: { images: [] } }
    const tracksList = [track1, track2]

    usePlayerStore.getState().playTrack(track1)
    expect(usePlayerStore.getState().currentTrack.id).toBe('t1')

    usePlayerStore.getState().nextTrack(tracksList)
    expect(usePlayerStore.getState().currentTrack.id).toBe('t2')
  })

  it('skips to previous track', () => {
    const track1 = { id: 't1', preview_url: 'u1', artists: [], album: { images: [] } }
    const track2 = { id: 't2', preview_url: 'u2', artists: [], album: { images: [] } }
    const tracksList = [track1, track2]

    usePlayerStore.getState().playTrack(track2)
    expect(usePlayerStore.getState().currentTrack.id).toBe('t2')

    usePlayerStore.getState().prevTrack(tracksList)
    expect(usePlayerStore.getState().currentTrack.id).toBe('t1')
  })
})

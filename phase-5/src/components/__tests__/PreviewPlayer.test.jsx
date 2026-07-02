import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import PreviewPlayer from '../PreviewPlayer'
import usePlayerStore from '../../store/playerStore'
import useMoodStore from '../../store/moodStore'

describe('PreviewPlayer', () => {
  const mockTrack = {
    id: 'track-123',
    name: 'Mock Song Title',
    artists: [{ name: 'Artist Foo' }],
    album: {
      images: [{ url: 'http://example.com/cover.jpg' }],
    },
    preview_url: 'http://example.com/preview.mp3',
  }

  beforeEach(() => {
    usePlayerStore.getState().cleanup()
    useMoodStore.setState({ results: null })
  })

  it('renders nothing when no track is selected', () => {
    const { container } = render(<PreviewPlayer />)
    expect(container.firstChild).toBeNull()
  })

  it('renders song details, controls, progress, and volume when track is active', () => {
    usePlayerStore.setState({ currentTrack: mockTrack, isPlaying: false })

    render(<PreviewPlayer />)

    expect(screen.getByText('Mock Song Title')).toBeInTheDocument()
    expect(screen.getByText('Artist Foo')).toBeInTheDocument()
    expect(screen.getByLabelText('Play')).toBeInTheDocument()
    expect(screen.getByLabelText('Seek progress')).toBeInTheDocument()
    expect(screen.getByLabelText('Volume slider')).toBeInTheDocument()
  })

  it('calls play when clicking play on paused track, and pause when playing', () => {
    const playSpy = vi.spyOn(usePlayerStore.getState(), 'play')
    const pauseSpy = vi.spyOn(usePlayerStore.getState(), 'pause')

    // Start in paused state
    usePlayerStore.setState({ currentTrack: mockTrack, isPlaying: false })
    const { rerender } = render(<PreviewPlayer />)

    // Click play
    const playBtn = screen.getByLabelText('Play')
    fireEvent.click(playBtn)
    expect(playSpy).toHaveBeenCalled()

    // Mock playing state update
    usePlayerStore.setState({ isPlaying: true })
    rerender(<PreviewPlayer />)

    // Click pause
    const pauseBtn = screen.getByLabelText('Pause')
    fireEvent.click(pauseBtn)
    expect(pauseSpy).toHaveBeenCalled()
  })

  it('calls setCurrentTime on progress bar change', () => {
    const seekSpy = vi.spyOn(usePlayerStore.getState(), 'setCurrentTime')
    usePlayerStore.setState({ currentTrack: mockTrack, duration: 30, currentTime: 10 })

    render(<PreviewPlayer />)

    const slider = screen.getByLabelText('Seek progress')
    fireEvent.change(slider, { target: { value: '25.5' } })

    expect(seekSpy).toHaveBeenCalledWith(25.5)
  })

  it('calls setVolume on volume slider change', () => {
    const volumeSpy = vi.spyOn(usePlayerStore.getState(), 'setVolume')
    usePlayerStore.setState({ currentTrack: mockTrack, volume: 0.7 })

    render(<PreviewPlayer />)

    const volumeSlider = screen.getByLabelText('Volume slider')
    fireEvent.change(volumeSlider, { target: { value: '0.2' } })

    expect(volumeSpy).toHaveBeenCalledWith(0.2)
  })

  it('mutes and unmutes volume when volume icon is clicked', () => {
    const volumeSpy = vi.spyOn(usePlayerStore.getState(), 'setVolume')
    usePlayerStore.setState({ currentTrack: mockTrack, volume: 0.5 })

    render(<PreviewPlayer />)

    const muteBtn = screen.getByLabelText('Toggle mute')
    
    // Mute
    fireEvent.click(muteBtn)
    expect(volumeSpy).toHaveBeenCalledWith(0)

    // Reset store volume to 0 (simulated mute) and render again
    usePlayerStore.setState({ volume: 0 })
    render(<PreviewPlayer />)
    
    // Unmute
    fireEvent.click(screen.getAllByLabelText('Toggle mute')[1]) // Second render instance in test setup
    expect(volumeSpy).toHaveBeenCalledWith(0.7)
  })

  it('calls nextTrack and prevTrack when skip buttons are clicked', () => {
    const nextSpy = vi.spyOn(usePlayerStore.getState(), 'nextTrack')
    const prevSpy = vi.spyOn(usePlayerStore.getState(), 'prevTrack')

    const mockTracks = [mockTrack, { id: 'track-456', name: 'Song 2', artists: [], album: { images: [] } }]
    useMoodStore.setState({ results: { tracks: mockTracks } })
    usePlayerStore.setState({ currentTrack: mockTrack })

    render(<PreviewPlayer />)

    fireEvent.click(screen.getByLabelText('Next Track'))
    expect(nextSpy).toHaveBeenCalledWith(mockTracks)

    fireEvent.click(screen.getByLabelText('Previous Track'))
    expect(prevSpy).toHaveBeenCalledWith(mockTracks)
  })
})

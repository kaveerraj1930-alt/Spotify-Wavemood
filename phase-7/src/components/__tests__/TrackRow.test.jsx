import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TrackRow from '../TrackRow'
import usePlayerStore from '../../store/playerStore'
import * as playlistService from '../../services/playlistService'

vi.mock('../../services/playlistService', () => ({
  addToQueue: vi.fn(() => Promise.resolve({ success: true, message: 'Added to queue' })),
}))

describe('TrackRow', () => {
  const mockTrack = {
    id: 'track-1',
    uri: 'spotify:track:1',
    name: 'Song Title',
    artists: [{ name: 'Artist A' }, { name: 'Artist B' }],
    album: {
      name: 'Album Name',
      images: [{ url: 'http://example.com/art.jpg' }],
    },
    preview_url: 'http://example.com/preview.mp3',
    duration_ms: 185000, // 3:05
    external_urls: { spotify: 'https://spotify.com/track/1' },
  }

  beforeEach(() => {
    vi.clearAllMocks()
    usePlayerStore.getState().cleanup()
  })

  it('renders track index, title, artists, album name, and duration', () => {
    render(<TrackRow track={mockTrack} index={4} onNotification={vi.fn()} />)

    expect(screen.getByText('5')).toBeInTheDocument() // 0-based index 4 -> 5
    expect(screen.getByText('Song Title')).toBeInTheDocument()
    expect(screen.getByText('Artist A, Artist B')).toBeInTheDocument()
    expect(screen.getByText('Album Name')).toBeInTheDocument()
    expect(screen.getByText('3:05')).toBeInTheDocument() // formatted duration
  })

  it('renders "Open in Spotify" link with correct href', () => {
    render(<TrackRow track={mockTrack} index={0} onNotification={vi.fn()} />)
    const link = screen.getByTitle('Open in Spotify')
    expect(link).toBeInTheDocument()
    expect(link.getAttribute('href')).toBe('https://spotify.com/track/1')
    expect(link.getAttribute('target')).toBe('_blank')
  })

  it('calls playTrack when row is clicked', () => {
    const playTrackSpy = vi.spyOn(usePlayerStore.getState(), 'playTrack')
    render(<TrackRow track={mockTrack} index={0} onNotification={vi.fn()} />)

    fireEvent.click(screen.getByText('Song Title'))

    expect(playTrackSpy).toHaveBeenCalledWith(mockTrack)
  })

  it('calls addToQueue when queue button is clicked and triggers notification', async () => {
    const mockNotification = vi.fn()
    render(<TrackRow track={mockTrack} index={0} onNotification={mockNotification} />)

    const queueBtn = screen.getByTitle('Add to queue')
    fireEvent.click(queueBtn)

    expect(playlistService.addToQueue).toHaveBeenCalledWith('spotify:track:1')
    await waitFor(() => {
      expect(mockNotification).toHaveBeenCalledWith({
        type: 'success',
        message: '"Song Title" added to queue',
      })
    })
  })

  it('handles track without preview_url correctly', () => {
    const trackNoPreview = { ...mockTrack, preview_url: null }
    render(<TrackRow track={trackNoPreview} index={0} onNotification={vi.fn()} />)

    // Verify index is rendered but play button hover logic is disabled (no play controls)
    expect(screen.queryByLabelText('Play')).not.toBeInTheDocument()
  })
})

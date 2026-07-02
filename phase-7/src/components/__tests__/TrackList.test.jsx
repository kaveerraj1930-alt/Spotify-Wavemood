import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import TrackList from '../TrackList'
import * as playlistService from '../../services/playlistService'

vi.mock('../../services/playlistService', () => ({
  addToQueue: vi.fn(() => Promise.resolve({ success: true })),
  createPlaylist: vi.fn((name, tracks) => Promise.resolve({ 
    success: true, 
    name, 
    externalUrl: 'https://open.spotify.com/playlist/mock-playlist' 
  })),
}))

describe('TrackList', () => {
  const mockTracks = [
    {
      id: '1',
      name: 'Song One',
      artists: [{ name: 'Artist A' }],
      album: { name: 'Album A', images: [] },
      duration_ms: 180000,
      preview_url: 'http://example.com/1.mp3',
    },
    {
      id: '2',
      name: 'Song Two',
      artists: [{ name: 'Artist B' }],
      album: { name: 'Album B', images: [] },
      duration_ms: 200000,
      preview_url: 'http://example.com/2.mp3',
    },
  ]

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders table headers and track rows', () => {
    render(<TrackList tracks={mockTracks} mood="Chill" onNotification={vi.fn()} />)

    expect(screen.getByText('#')).toBeInTheDocument()
    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(screen.getByText('Album')).toBeInTheDocument()
    expect(screen.getByText('Duration')).toBeInTheDocument()

    expect(screen.getByText('Song One')).toBeInTheDocument()
    expect(screen.getByText('Song Two')).toBeInTheDocument()
  })

  it('pre-fills playlist name with mood name', () => {
    render(<TrackList tracks={mockTracks} mood="Workout" onNotification={vi.fn()} />)
    const input = screen.getByLabelText('Playlist name')
    expect(input.value).toBe('Workout Playlist')
  })

  it('calls createPlaylist and notifies on successful save', async () => {
    const mockNotification = vi.fn()
    render(<TrackList tracks={mockTracks} mood="Workout" onNotification={mockNotification} />)

    const input = screen.getByLabelText('Playlist name')
    fireEvent.change(input, { target: { value: 'My Hype Playlist' } })

    const saveBtn = screen.getByRole('button', { name: 'Save as Playlist' })
    fireEvent.click(saveBtn)

    expect(playlistService.createPlaylist).toHaveBeenCalledWith('My Hype Playlist', [
      'spotify:track:1',
      'spotify:track:2',
    ])

    await waitFor(() => {
      expect(mockNotification).toHaveBeenCalledWith({
        type: 'success',
        message: 'Playlist "My Hype Playlist" saved!',
        link: 'https://open.spotify.com/playlist/mock-playlist',
        linkLabel: 'Open in Spotify',
      })
    })
  })

  it('displays error notification if playlist name is empty', async () => {
    const mockNotification = vi.fn()
    render(<TrackList tracks={mockTracks} mood="Workout" onNotification={mockNotification} />)

    const input = screen.getByLabelText('Playlist name')
    fireEvent.change(input, { target: { value: '' } })

    const saveBtn = screen.getByRole('button', { name: 'Save as Playlist' })
    fireEvent.click(saveBtn)

    expect(mockNotification).toHaveBeenCalledWith({
      type: 'error',
      message: 'Playlist name cannot be empty',
    })
    expect(playlistService.createPlaylist).not.toHaveBeenCalled()
  })
})

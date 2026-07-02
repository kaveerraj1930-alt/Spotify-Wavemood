import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Home from '../Home'
import useMoodStore from '../../store/moodStore'
import * as homeService from '../../services/homeService'

vi.mock('../../services/homeService', () => ({
  getTopArtists: vi.fn(),
  getRecentlyPlayed: vi.fn(),
}))

describe('Home Page', () => {
  beforeEach(() => {
    vi.resetAllMocks()
    useMoodStore.setState({
      moodHistory: [],
    })
  })

  const renderPage = () => {
    return render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    )
  }

  it('renders greeting and featured playlists section', async () => {
    homeService.getTopArtists.mockResolvedValue([])
    homeService.getRecentlyPlayed.mockResolvedValue([])

    renderPage()

    // Greeting is visible (e.g. Good morning/afternoon/evening)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()

    // Featured playlists header is visible
    expect(screen.getByText('Featured Playlists')).toBeInTheDocument()
    
    // Check for some default featured playlists
    expect(screen.getByText("Today's Top Hits")).toBeInTheDocument()
    expect(screen.getByText('RapCaviar')).toBeInTheDocument()
  })

  it('renders recent moods when moodHistory is populated', async () => {
    homeService.getTopArtists.mockResolvedValue([])
    homeService.getRecentlyPlayed.mockResolvedValue([])
    useMoodStore.setState({ moodHistory: ['Happy', 'Chill'] })

    renderPage()

    expect(screen.getByText('Your Recent Moods')).toBeInTheDocument()
    expect(screen.getByText('Happy')).toBeInTheDocument()
    expect(screen.getByText('Chill')).toBeInTheDocument()
  })

  it('shows skeleton loader cards while fetching home data', async () => {
    // Return a promise that doesn't resolve immediately
    homeService.getTopArtists.mockReturnValue(new Promise(() => {}))
    homeService.getRecentlyPlayed.mockReturnValue(new Promise(() => {}))

    const { container } = renderPage()

    // There should be skeleton pulses or elements
    expect(container.querySelector('.animate-pulse')).toBeInTheDocument()
  })

  it('displays top artists and recently played tracks when fetching succeeds', async () => {
    const mockArtists = [
      { id: '1', name: 'Mock Artist 1', image: 'artist1.jpg', genres: ['Pop'] },
    ]
    const mockTracks = [
      { id: '2', name: 'Mock Track 1', artists: 'Mock Artist 2', image: 'track1.jpg' },
    ]

    homeService.getTopArtists.mockResolvedValue(mockArtists)
    homeService.getRecentlyPlayed.mockResolvedValue(mockTracks)

    renderPage()

    await waitFor(() => {
      expect(screen.getByText('Mock Artist 1')).toBeInTheDocument()
      expect(screen.getByText('Mock Track 1')).toBeInTheDocument()
    })
  })

  it('falls back to default recently played playlists when recently played tracks fetching returns empty', async () => {
    homeService.getTopArtists.mockResolvedValue([])
    homeService.getRecentlyPlayed.mockResolvedValue([])

    renderPage()

    await waitFor(() => {
      // The default recently played should show up
      expect(screen.getByText('Discover Weekly')).toBeInTheDocument()
      expect(screen.getByText('Release Radar')).toBeInTheDocument()
    })
  })
})

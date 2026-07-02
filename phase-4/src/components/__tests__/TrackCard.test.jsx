import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import TrackCard from '../TrackCard'

describe('TrackCard', () => {
  const mockTrack = {
    id: '1',
    name: 'Test Song',
    artists: [{ name: 'Test Artist' }],
    album: { images: [{ url: 'https://example.com/image.jpg' }] },
  }

  it('renders track name', () => {
    render(<TrackCard track={mockTrack} index={0} />)
    expect(screen.getByText('Test Song')).toBeInTheDocument()
  })

  it('renders artist name', () => {
    render(<TrackCard track={mockTrack} index={0} />)
    expect(screen.getByText('Test Artist')).toBeInTheDocument()
  })

  it('renders track image', () => {
    const { container } = render(<TrackCard track={mockTrack} index={0} />)
    const img = container.querySelector('img')
    expect(img).toBeInTheDocument()
    expect(img.src).toContain('example.com')
  })

  it('handles multiple artists', () => {
    const multiArtistTrack = {
      ...mockTrack,
      artists: [{ name: 'Artist 1' }, { name: 'Artist 2' }],
    }
    render(<TrackCard track={multiArtistTrack} index={0} />)
    expect(screen.getByText('Artist 1, Artist 2')).toBeInTheDocument()
  })

  it('renders without crashing', () => {
    const { container } = render(<TrackCard track={mockTrack} index={0} />)
    expect(container.firstChild).toBeInTheDocument()
  })
})

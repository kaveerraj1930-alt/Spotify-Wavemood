import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Home from '../Home'

describe('Home', () => {
  const renderHome = () => {
    return render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    )
  }

  it('renders greeting based on time of day', () => {
    renderHome()
    const greeting = screen.getByText(/Good (morning|afternoon|evening)/i)
    expect(greeting).toBeInTheDocument()
  })

  it('renders featured playlists section', () => {
    renderHome()
    expect(screen.getByText('Featured Playlists')).toBeInTheDocument()
  })

  it('renders playlist cards', () => {
    renderHome()
    expect(screen.getByText('Today\'s Top Hits')).toBeInTheDocument()
    expect(screen.getByText('RapCaviar')).toBeInTheDocument()
    expect(screen.getByText('All Out 2010s')).toBeInTheDocument()
  })

  it('renders recently played section', () => {
    renderHome()
    expect(screen.getByText('Discover Weekly')).toBeInTheDocument()
    expect(screen.getByText('Release Radar')).toBeInTheDocument()
  })

  it('renders mood banner', () => {
    renderHome()
    expect(screen.getByText('Discover Music by Mood')).toBeInTheDocument()
  })
})

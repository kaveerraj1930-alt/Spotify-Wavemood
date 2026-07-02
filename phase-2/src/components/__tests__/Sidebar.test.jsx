import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Sidebar from '../Sidebar'

describe('Sidebar', () => {
  const renderSidebar = () => {
    return render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    )
  }

  it('renders navigation items', () => {
    renderSidebar()
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Search')).toBeInTheDocument()
  })

  it('renders library items', () => {
    renderSidebar()
    expect(screen.getByText('Your Library')).toBeInTheDocument()
    expect(screen.getByText('Create Playlist')).toBeInTheDocument()
    expect(screen.getByText('Liked Songs')).toBeInTheDocument()
  })

  it('renders playlist items', () => {
    renderSidebar()
    expect(screen.getByText('Chill Vibes')).toBeInTheDocument()
    expect(screen.getByText('Workout Mix')).toBeInTheDocument()
    expect(screen.getByText('Focus Music')).toBeInTheDocument()
  })

  it('displays Spotify logo', () => {
    renderSidebar()
    expect(screen.getByText('Spotify')).toBeInTheDocument()
  })
})

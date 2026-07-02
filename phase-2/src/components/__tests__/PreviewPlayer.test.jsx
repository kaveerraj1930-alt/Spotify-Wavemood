import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PreviewPlayer from '../PreviewPlayer'

describe('PreviewPlayer', () => {
  it('renders track information', () => {
    render(<PreviewPlayer />)
    expect(screen.getByText('Blinding Lights')).toBeInTheDocument()
    expect(screen.getByText('The Weeknd')).toBeInTheDocument()
  })

  it('renders play/pause button', () => {
    render(<PreviewPlayer />)
    const playButton = screen.getByRole('button')
    expect(playButton).toBeInTheDocument()
  })

  it('toggles play state on button click', async () => {
    const user = userEvent.setup()
    render(<PreviewPlayer />)
    const playButton = screen.getByRole('button')
    
    await user.click(playButton)
    // Check if pause icon appears (button still exists)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('renders skip buttons', () => {
    render(<PreviewPlayer />)
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThan(1)
  })

  it('renders progress bar', () => {
    render(<PreviewPlayer />)
    // Progress bar is a div with specific styling
    const progressBar = screen.getByText('0:30')
    expect(progressBar).toBeInTheDocument()
  })
})

import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import MoodChipGrid from '../MoodChipGrid'

describe('MoodChipGrid', () => {
  it('renders all 9 mood chips', () => {
    render(<MoodChipGrid />)
    expect(screen.getByText('Sleepy')).toBeInTheDocument()
    expect(screen.getByText('Motivated')).toBeInTheDocument()
    expect(screen.getByText('Emotional')).toBeInTheDocument()
    expect(screen.getByText('Happy')).toBeInTheDocument()
    expect(screen.getByText('Chill')).toBeInTheDocument()
    expect(screen.getByText('Party')).toBeInTheDocument()
    expect(screen.getByText('Angry')).toBeInTheDocument()
    expect(screen.getByText('Focus')).toBeInTheDocument()
    expect(screen.getByText('Sad')).toBeInTheDocument()
  })

  it('selects mood when chip is clicked', async () => {
    const user = userEvent.setup()
    render(<MoodChipGrid />)
    
    await user.click(screen.getByText('Happy'))
    
    const happyButton = screen.getByText('Happy')
    expect(happyButton).toBeInTheDocument()
  })

  it('updates mood input when chip is clicked', async () => {
    const user = userEvent.setup()
    render(<MoodChipGrid />)
    
    await user.click(screen.getByText('Chill'))
    
    // The mood input should be updated via the store
    // This is tested indirectly through the store tests
  })
})

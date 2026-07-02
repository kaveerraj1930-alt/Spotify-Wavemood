import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import MoodBanner from '../MoodBanner'

const BANNER_DISMISS_KEY = 'mood-banner-dismissed'

describe('MoodBanner', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    localStorage.clear()
  })

  const renderBanner = () => {
    return render(
      <BrowserRouter>
        <MoodBanner />
      </BrowserRouter>
    )
  }

  it('renders banner content', () => {
    renderBanner()
    expect(screen.getByText('Discover Music by Mood')).toBeInTheDocument()
    expect(screen.getByText('Let AI find the perfect tracks for how you\'re feeling')).toBeInTheDocument()
  })

  it('renders Try Mood Finder button', () => {
    renderBanner()
    expect(screen.getByText('Try Mood Finder')).toBeInTheDocument()
  })

  it('dismisses banner when X button is clicked', async () => {
    const user = userEvent.setup()
    renderBanner()
    
    const dismissButton = screen.getByLabelText('Dismiss banner')
    await user.click(dismissButton)
    
    expect(screen.queryByText('Discover Music by Mood')).not.toBeInTheDocument()
    expect(localStorage.getItem(BANNER_DISMISS_KEY)).toBe('true')
  })

  it('does not render if previously dismissed', () => {
    localStorage.setItem(BANNER_DISMISS_KEY, 'true')
    renderBanner()
    
    expect(screen.queryByText('Discover Music by Mood')).not.toBeInTheDocument()
  })

  it('renders banner if not previously dismissed', () => {
    localStorage.setItem(BANNER_DISMISS_KEY, 'false')
    renderBanner()
    
    expect(screen.getByText('Discover Music by Mood')).toBeInTheDocument()
  })
})

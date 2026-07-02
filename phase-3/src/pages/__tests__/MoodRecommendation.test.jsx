import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import MoodRecommendation from '../MoodRecommendation'
import useMoodStore from '../../store/moodStore'

describe('MoodRecommendation', () => {
  beforeEach(() => {
    useMoodStore.setState({
      selectedMood: null,
      moodInput: '',
      moodHistory: [],
      isSubmitting: false,
      results: null,
    })
  })

  const renderPage = () => {
    return render(
      <BrowserRouter>
        <MoodRecommendation />
      </BrowserRouter>
    )
  }

  it('renders page title', () => {
    renderPage()
    expect(screen.getByText('Mood Finder')).toBeInTheDocument()
  })

  it('renders subtitle', () => {
    renderPage()
    expect(screen.getByText('Select a mood or describe how you\'re feeling')).toBeInTheDocument()
  })

  it('renders mood chips section', () => {
    renderPage()
    expect(screen.getByText('Select a Mood')).toBeInTheDocument()
  })

  it('renders all mood chips', () => {
    renderPage()
    expect(screen.getByText('Happy')).toBeInTheDocument()
    expect(screen.getByText('Sad')).toBeInTheDocument()
    expect(screen.getByText('Chill')).toBeInTheDocument()
  })

  it('renders mood input', () => {
    renderPage()
    expect(screen.getByPlaceholderText('Or describe how you\'re feeling in your own words...')).toBeInTheDocument()
  })

  it('renders submit button', () => {
    renderPage()
    expect(screen.getByText('Get Recommendations')).toBeInTheDocument()
  })

  it('disables submit button when input is empty', () => {
    renderPage()
    const button = screen.getByText('Get Recommendations')
    expect(button).toBeDisabled()
  })

  it('enables submit button when input has text', async () => {
    const user = userEvent.setup()
    renderPage()
    
    const textarea = screen.getByPlaceholderText('Or describe how you\'re feeling in your own words...')
    await user.type(textarea, 'Happy')
    
    const button = screen.getByText('Get Recommendations')
    expect(button).not.toBeDisabled()
  })

  it('shows mood history when available', () => {
    useMoodStore.setState({ moodHistory: ['Happy', 'Sad'] })
    renderPage()
    
    expect(screen.getByText('Recent Moods')).toBeInTheDocument()
    // Check that history buttons are rendered (they appear in history section)
    const happyButtons = screen.getAllByText('Happy')
    const sadButtons = screen.getAllByText('Sad')
    expect(happyButtons.length).toBeGreaterThan(0)
    expect(sadButtons.length).toBeGreaterThan(0)
  })

  it('does not show mood history when empty', () => {
    useMoodStore.setState({ moodHistory: [] })
    renderPage()
    
    expect(screen.queryByText('Recent Moods')).not.toBeInTheDocument()
  })

  it('changes button text when submitting', () => {
    useMoodStore.setState({ isSubmitting: true, moodInput: 'Happy' })
    renderPage()
    
    expect(screen.getByText('Finding Music...')).toBeInTheDocument()
  })

  it('clicking history chip updates input', async () => {
    const user = userEvent.setup()
    useMoodStore.setState({ moodHistory: ['Chill'] })
    renderPage()
    
    // Get all elements with "Chill" text and click the first one (history chip)
    const chillButtons = screen.getAllByText('Chill')
    await user.click(chillButtons[0])
    
    // The input should be updated via the store
    const state = useMoodStore.getState()
    expect(state.moodInput).toBe('Chill')
  })
})

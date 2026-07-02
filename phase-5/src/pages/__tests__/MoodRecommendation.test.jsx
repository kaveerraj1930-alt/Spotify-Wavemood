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
    expect(screen.getByText('WaveMood')).toBeInTheDocument()
  })

  it('renders subtitle', () => {
    renderPage()
    expect(screen.getByText('Select a mood or describe how you\'re feeling')).toBeInTheDocument()
  })

  it('renders mood chips section when no results', () => {
    renderPage()
    expect(screen.getByText('Select a Mood')).toBeInTheDocument()
  })

  it('renders mood input when no results', () => {
    renderPage()
    expect(screen.getByPlaceholderText('Or describe how you\'re feeling in your own words...')).toBeInTheDocument()
  })

  it('renders submit button when no results', () => {
    renderPage()
    expect(screen.getByText('Get Recommendations')).toBeInTheDocument()
  })

  it('renders empty state when no input and no results', () => {
    renderPage()
    expect(screen.getByText('No recommendations yet')).toBeInTheDocument()
  })

  it('shows mood history when available', () => {
    useMoodStore.setState({ moodHistory: ['Happy', 'Sad'] })
    renderPage()
    
    expect(screen.getByText('Recent Moods')).toBeInTheDocument()
    const happyButtons = screen.getAllByText('Happy')
    const sadButtons = screen.getAllByText('Sad')
    expect(happyButtons.length).toBeGreaterThan(0)
    expect(sadButtons.length).toBeGreaterThan(0)
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

  it('shows loading state when submitting', () => {
    useMoodStore.setState({ isSubmitting: true, moodInput: 'Happy' })
    renderPage()
    
    expect(screen.getByText('Finding the perfect tracks for you...')).toBeInTheDocument()
  })

  it('shows results when available', () => {
    useMoodStore.setState({
      results: {
        mood: 'Happy',
        features: { valence: 0.9, energy: 0.7 },
        tracks: [
          { id: '1', name: 'Song 1', artists: [{ name: 'Artist' }], album: { images: [{ url: 'test.jpg' }] } },
        ],
      },
    })
    renderPage()
    
    expect(screen.getByText(/Recommendations for "Happy"/)).toBeInTheDocument()
    expect(screen.getByText('Song 1')).toBeInTheDocument()
  })

  it('hides mood chips when showing results', () => {
    useMoodStore.setState({
      results: {
        mood: 'Happy',
        features: { valence: 0.9 },
        tracks: [],
      },
    })
    renderPage()
    
    expect(screen.queryByText('Select a Mood')).not.toBeInTheDocument()
  })

  it('shows try another button when results exist', () => {
    useMoodStore.setState({
      results: {
        mood: 'Happy',
        features: { valence: 0.9 },
        tracks: [],
      },
    })
    renderPage()
    
    expect(screen.getByText('Try Another Mood')).toBeInTheDocument()
  })
})

import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import MoodInput from '../MoodInput'
import useMoodStore from '../../store/moodStore'

describe('MoodInput', () => {
  beforeEach(() => {
    useMoodStore.setState({ moodInput: '', isSubmitting: false })
  })

  it('renders textarea with placeholder', () => {
    render(<MoodInput />)
    expect(screen.getByPlaceholderText('Or describe how you\'re feeling in your own words...')).toBeInTheDocument()
  })

  it('shows character counter', () => {
    render(<MoodInput />)
    expect(screen.getByText('0/280')).toBeInTheDocument()
  })

  it('updates character count on input', async () => {
    const user = userEvent.setup()
    render(<MoodInput />)
    
    const textarea = screen.getByPlaceholderText('Or describe how you\'re feeling in your own words...')
    await user.type(textarea, 'Hello')
    
    expect(screen.getByText('5/280')).toBeInTheDocument()
  })

  it('limits input to 280 characters', async () => {
    const user = userEvent.setup()
    render(<MoodInput />)
    
    const textarea = screen.getByPlaceholderText('Or describe how you\'re feeling in your own words...')
    const longText = 'a'.repeat(300)
    await user.type(textarea, longText)
    
    expect(screen.getByText('280/280')).toBeInTheDocument()
  })

  it('disables textarea when submitting', () => {
    useMoodStore.setState({ isSubmitting: true })
    render(<MoodInput />)
    
    const textarea = screen.getByPlaceholderText('Or describe how you\'re feeling in your own words...')
    expect(textarea).toBeDisabled()
  })

  it('shows warning color when near limit', async () => {
    const user = userEvent.setup()
    render(<MoodInput />)
    
    const textarea = screen.getByPlaceholderText('Or describe how you\'re feeling in your own words...')
    await user.type(textarea, 'a'.repeat(260))
    
    const counter = screen.getByText('260/280')
    expect(counter).toHaveClass('text-yellow-500')
  })

  it('shows error color at limit', async () => {
    const user = userEvent.setup()
    render(<MoodInput />)
    
    const textarea = screen.getByPlaceholderText('Or describe how you\'re feeling in your own words...')
    await user.type(textarea, 'a'.repeat(280))
    
    const counter = screen.getByText('280/280')
    expect(counter).toHaveClass('text-red-500')
  })
})

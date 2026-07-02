import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TopBar from '../TopBar'

describe('TopBar', () => {
  it('renders search input', () => {
    render(<TopBar />)
    expect(screen.getByPlaceholderText('What do you want to listen to?')).toBeInTheDocument()
  })

  it('updates search query on input', async () => {
    const user = userEvent.setup()
    render(<TopBar />)
    const input = screen.getByPlaceholderText('What do you want to listen to?')
    
    await user.type(input, 'test query')
    expect(input).toHaveValue('test query')
  })

  it('renders notification bell button', () => {
    render(<TopBar />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('renders user avatar button', () => {
    render(<TopBar />)
    expect(screen.getByText('User')).toBeInTheDocument()
  })
})

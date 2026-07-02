import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import EmptyState from '../EmptyState'

describe('EmptyState', () => {
  it('renders empty state message', () => {
    render(<EmptyState />)
    expect(screen.getByText('No recommendations yet')).toBeInTheDocument()
  })

  it('renders description', () => {
    render(<EmptyState />)
    expect(screen.getByText(/Select a mood or describe how you're feeling/)).toBeInTheDocument()
  })

  it('does not render refresh button when onRefresh not provided', () => {
    render(<EmptyState />)
    expect(screen.queryByText('Try Again')).not.toBeInTheDocument()
  })

  it('renders refresh button when onRefresh is provided', () => {
    render(<EmptyState onRefresh={() => {}} />)
    expect(screen.getByText('Try Again')).toBeInTheDocument()
  })

  it('calls onRefresh when refresh button is clicked', async () => {
    const user = userEvent.setup()
    const handleRefresh = vi.fn()
    render(<EmptyState onRefresh={handleRefresh} />)
    
    const refreshButton = screen.getByText('Try Again')
    await user.click(refreshButton)
    
    expect(handleRefresh).toHaveBeenCalledTimes(1)
  })
})

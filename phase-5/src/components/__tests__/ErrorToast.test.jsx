import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ErrorToast from '../ErrorToast'

describe('ErrorToast', () => {
  it('does not render when error is null', () => {
    render(<ErrorToast error={null} onClose={() => {}} />)
    expect(screen.queryByText('Error')).not.toBeInTheDocument()
  })

  it('renders error message when error is provided', () => {
    render(<ErrorToast error="Something went wrong" onClose={() => {}} />)
    expect(screen.getByText('Error')).toBeInTheDocument()
    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup()
    const handleClose = vi.fn()
    render(<ErrorToast error="Test error" onClose={handleClose} />)
    
    const closeButton = screen.getByLabelText('Close error')
    await user.click(closeButton)
    
    expect(handleClose).toHaveBeenCalledTimes(1)
  })
})

import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import MoodChip from '../MoodChip'

describe('MoodChip', () => {
  it('renders mood label', () => {
    render(<MoodChip mood="Happy" isSelected={false} onClick={() => {}} />)
    expect(screen.getByText('Happy')).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    render(<MoodChip mood="Chill" isSelected={false} onClick={handleClick} />)
    
    await user.click(screen.getByText('Chill'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('shows selection ring when selected', () => {
    const { container } = render(
      <MoodChip mood="Happy" isSelected={true} onClick={() => {}} />
    )
    const button = container.querySelector('button')
    expect(button).toHaveClass('ring-2')
  })

  it('does not show selection ring when not selected', () => {
    const { container } = render(
      <MoodChip mood="Happy" isSelected={false} onClick={() => {}} />
    )
    const button = container.querySelector('button')
    expect(button).not.toHaveClass('ring-2')
  })

  it('applies correct gradient for each mood', () => {
    const { container: happyContainer } = render(
      <MoodChip mood="Happy" isSelected={false} onClick={() => {}} />
    )
    const { container: chillContainer } = render(
      <MoodChip mood="Chill" isSelected={false} onClick={() => {}} />
    )
    
    expect(happyContainer.querySelector('button')).toHaveClass('from-yellow-400')
    expect(chillContainer.querySelector('button')).toHaveClass('from-teal-500')
  })
})

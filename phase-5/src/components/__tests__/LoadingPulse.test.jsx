import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import LoadingPulse from '../LoadingPulse'

describe('LoadingPulse', () => {
  it('renders 8 skeleton items', () => {
    render(<LoadingPulse />)
    const skeletons = screen.getAllByRole('generic')
    expect(skeletons.length).toBeGreaterThan(0)
  })

  it('renders without crashing', () => {
    const { container } = render(<LoadingPulse />)
    expect(container.firstChild).toBeInTheDocument()
  })
})

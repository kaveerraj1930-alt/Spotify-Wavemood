import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from '../Layout'
import Home from '../../pages/Home'

describe('Layout', () => {
  it('renders sidebar', () => {
    render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    )
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Your Library')).toBeInTheDocument()
  })

  it('renders top bar', () => {
    render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    )
    expect(screen.getByPlaceholderText('What do you want to listen to?')).toBeInTheDocument()
  })

  it('renders preview player', () => {
    render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    )
    expect(screen.getByText('Blinding Lights')).toBeInTheDocument()
  })

  it('renders child routes', () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    )
    expect(screen.getByText(/Good (morning|afternoon|evening)/i)).toBeInTheDocument()
  })
})

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';

vi.mock('../hooks/useSpotifyAuth', () => ({
  useSpotifyAuth: vi.fn(),
}));

import { useSpotifyAuth } from '../hooks/useSpotifyAuth';

describe('ProtectedRoute', () => {
  it('shows loading state while auth is checked', () => {
    vi.mocked(useSpotifyAuth).mockReturnValue({
      isAuthenticated: false,
      isLoading: true,
    });

    render(
      <MemoryRouter initialEntries={['/mood']}>
        <ProtectedRoute>
          <div>Mood page</div>
        </ProtectedRoute>
      </MemoryRouter>
    );

    expect(screen.getByText(/checking your spotify session/i)).toBeInTheDocument();
  });

  it('redirects unauthenticated users to login', () => {
    vi.mocked(useSpotifyAuth).mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
    });

    render(
      <MemoryRouter initialEntries={['/mood']}>
        <Routes>
          <Route
            path="/mood"
            element={
              <ProtectedRoute>
                <div>Mood page</div>
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<div>Login page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Login page')).toBeInTheDocument();
  });

  it('renders children for authenticated users', () => {
    vi.mocked(useSpotifyAuth).mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
    });

    render(
      <MemoryRouter initialEntries={['/mood']}>
        <ProtectedRoute>
          <div>Mood page</div>
        </ProtectedRoute>
      </MemoryRouter>
    );

    expect(screen.getByText('Mood page')).toBeInTheDocument();
  });
});

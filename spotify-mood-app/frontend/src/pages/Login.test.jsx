import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from './Login';

const loginMock = vi.fn();

vi.mock('../hooks/useSpotifyAuth', () => ({
  useSpotifyAuth: () => ({
    login: loginMock,
    isLoading: false,
    isAuthenticated: false,
  }),
}));

describe('Login', () => {
  beforeEach(() => {
    loginMock.mockReset();
  });

  it('renders Spotify login CTA', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByText('Log in to Spotify')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /log in with spotify/i })).toBeInTheDocument();
  });

  it('calls login when the button is clicked', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /log in with spotify/i }));
    expect(loginMock).toHaveBeenCalledTimes(1);
  });

  it('shows an error message from query params', () => {
    render(
      <MemoryRouter initialEntries={['/login?error=auth_failed']}>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByText(/auth failed/i)).toBeInTheDocument();
  });
});

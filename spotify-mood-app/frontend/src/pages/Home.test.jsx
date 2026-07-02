import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import Home from './Home';
import { useAppStore } from '../store/appStore';

vi.mock('../hooks/useSpotifyAuth', () => ({
  useSpotifyAuth: () => ({
    isAuthenticated: false,
    user: null,
    login: vi.fn(),
  }),
}));

vi.mock('../api/client', () => ({
  checkHealth: vi.fn(),
}));

import { checkHealth } from '../api/client';

describe('Home', () => {
  beforeEach(() => {
    useAppStore.setState({
      backendStatus: null,
      backendError: null,
      isCheckingHealth: false,
    });
    vi.mocked(checkHealth).mockReset();
  });

  it('renders the app title', () => {
    vi.mocked(checkHealth).mockResolvedValue({
      status: 'ok',
      service: 'spotify-mood-backend',
      timestamp: '2026-01-01T00:00:00.000Z',
    });

    render(<Home />);
    expect(screen.getByText('Spotify Mood Finder')).toBeInTheDocument();
  });

  it('shows backend health status after a successful check', async () => {
    vi.mocked(checkHealth).mockResolvedValue({
      status: 'ok',
      service: 'spotify-mood-backend',
      timestamp: '2026-01-01T00:00:00.000Z',
    });

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText('ok')).toBeInTheDocument();
    });

    expect(screen.getByText(/spotify-mood-backend/)).toBeInTheDocument();
  });

  it('shows an error when the health check fails', async () => {
    vi.mocked(checkHealth).mockRejectedValue(new Error('Network error'));

    render(<Home />);

    await waitFor(() => {
      expect(
        screen.getByText(/Unable to reach backend/i)
      ).toBeInTheDocument();
    });
  });
});

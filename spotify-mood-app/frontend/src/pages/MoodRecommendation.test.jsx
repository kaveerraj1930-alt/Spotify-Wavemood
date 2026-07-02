import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MoodRecommendation from './MoodRecommendation';

const logoutMock = vi.fn();

vi.mock('../hooks/useSpotifyAuth', () => ({
  useSpotifyAuth: () => ({
    user: {
      id: '1',
      displayName: 'Test User',
      email: 'test@example.com',
      imageUrl: 'https://example.com/avatar.jpg',
    },
    logout: logoutMock,
  }),
}));

describe('MoodRecommendation', () => {
  it('shows the logged-in user', () => {
    render(
      <MemoryRouter>
        <MoodRecommendation />
      </MemoryRouter>
    );

    expect(screen.getByText('How are you feeling?')).toBeInTheDocument();
    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
  });

  it('calls logout when the button is clicked', () => {
    render(
      <MemoryRouter>
        <MoodRecommendation />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /log out/i }));
    expect(logoutMock).toHaveBeenCalledTimes(1);
  });
});

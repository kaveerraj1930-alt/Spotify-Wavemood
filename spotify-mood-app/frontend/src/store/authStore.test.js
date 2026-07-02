import { describe, it, expect } from 'vitest';
import { useAuthStore } from '../store/authStore';

describe('useAuthStore', () => {
  it('stores authenticated user profile', () => {
    useAuthStore.getState().setUser({
      id: '1',
      displayName: 'Test User',
      email: 'test@example.com',
      imageUrl: null,
    });

    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(true);
    expect(state.user?.displayName).toBe('Test User');
    expect(state.isLoading).toBe(false);
  });

  it('clears auth state on logout', () => {
    useAuthStore.getState().clearAuth();

    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
    expect(state.isLoading).toBe(false);
  });
});

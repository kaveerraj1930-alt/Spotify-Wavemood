import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  authError: null,
  setUser: (user) =>
    set({
      user,
      isAuthenticated: Boolean(user),
      isLoading: false,
      authError: null,
    }),
  setLoading: (isLoading) => set({ isLoading }),
  setAuthError: (authError) =>
    set({
      authError,
      isLoading: false,
    }),
  clearAuth: () =>
    set({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      authError: null,
    }),
}));

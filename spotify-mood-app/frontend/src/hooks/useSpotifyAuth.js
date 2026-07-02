import { useCallback, useEffect } from 'react';
import { fetchCurrentUser, getLoginUrl, logoutUser } from '../api/client';
import { useAuthStore } from '../store/authStore';

export function useSpotifyAuth() {
  const {
    user,
    isAuthenticated,
    isLoading,
    authError,
    setUser,
    setLoading,
    setAuthError,
    clearAuth,
  } = useAuthStore();

  const checkAuth = useCallback(async () => {
    setLoading(true);
    setAuthError(null);

    try {
      const profile = await fetchCurrentUser();
      setUser(profile);
      return profile;
    } catch {
      clearAuth();
      return null;
    }
  }, [clearAuth, setAuthError, setLoading, setUser]);

  const login = useCallback(() => {
    window.location.href = getLoginUrl();
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutUser();
    } finally {
      clearAuth();
    }
  }, [clearAuth]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return {
    user,
    isAuthenticated,
    isLoading,
    authError,
    checkAuth,
    login,
    logout,
  };
}

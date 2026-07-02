import { create } from 'zustand';

export const useAppStore = create((set) => ({
  backendStatus: null,
  backendError: null,
  isCheckingHealth: false,
  setBackendStatus: (backendStatus) => set({ backendStatus, backendError: null }),
  setBackendError: (backendError) => set({ backendError, backendStatus: null }),
  setIsCheckingHealth: (isCheckingHealth) => set({ isCheckingHealth }),
}));

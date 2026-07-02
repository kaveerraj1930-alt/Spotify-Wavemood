import { describe, it, expect } from 'vitest';
import { useAppStore } from '../store/appStore';

describe('useAppStore', () => {
  it('updates backend status and clears errors', () => {
    useAppStore.setState({
      backendStatus: null,
      backendError: 'old error',
      isCheckingHealth: true,
    });

    useAppStore.getState().setBackendStatus({ status: 'ok' });

    const state = useAppStore.getState();
    expect(state.backendStatus).toEqual({ status: 'ok' });
    expect(state.backendError).toBeNull();
  });

  it('stores backend errors and clears status', () => {
    useAppStore.getState().setBackendError('Backend unavailable');

    const state = useAppStore.getState();
    expect(state.backendError).toBe('Backend unavailable');
    expect(state.backendStatus).toBeNull();
  });
});

import { describe, it, expect, vi, beforeEach } from 'vitest';

const { getMock, postMock } = vi.hoisted(() => ({
  getMock: vi.fn(),
  postMock: vi.fn(),
}));

vi.mock('axios', () => ({
  default: {
    create: () => ({
      get: getMock,
      post: postMock,
    }),
  },
}));

import {
  checkHealth,
  fetchCurrentUser,
  getLoginUrl,
  logoutUser,
} from './client';

describe('api client auth helpers', () => {
  beforeEach(() => {
    getMock.mockReset();
    postMock.mockReset();
  });

  it('checkHealth returns backend payload', async () => {
    getMock.mockResolvedValue({ data: { status: 'ok' } });
    await expect(checkHealth()).resolves.toEqual({ status: 'ok' });
  });

  it('getLoginUrl points to backend login route', () => {
    expect(getLoginUrl()).toContain('/api/auth/login');
  });

  it('fetchCurrentUser returns profile data', async () => {
    const profile = {
      id: '1',
      displayName: 'Test User',
      email: 'test@example.com',
      imageUrl: null,
    };
    getMock.mockResolvedValue({ data: profile });

    await expect(fetchCurrentUser()).resolves.toEqual(profile);
    expect(getMock).toHaveBeenCalledWith('/api/auth/me');
  });

  it('logoutUser posts to logout route', async () => {
    postMock.mockResolvedValue({ data: { success: true } });

    await expect(logoutUser()).resolves.toEqual({ success: true });
    expect(postMock).toHaveBeenCalledWith('/api/auth/logout');
  });
});

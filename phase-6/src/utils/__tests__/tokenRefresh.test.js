import { describe, it, expect, vi } from 'vitest'
import { refreshAccessToken, retryWithTokenRefresh } from '../tokenRefresh'
import { isTokenExpiredError } from '../errorHandler'

describe('tokenRefresh', () => {
  describe('refreshAccessToken', () => {
    it('throws error if not a token expiry error', async () => {
      const error = { response: { status: 429 } }
      const refreshCallback = vi.fn()

      await expect(refreshAccessToken(refreshCallback, error)).rejects.toThrow(
        'Cannot refresh token: error is not a token expiry error'
      )
    })

    it('calls refresh callback and returns new token', async () => {
      const error = { response: { status: 401 } }
      const newToken = 'new_access_token'
      const refreshCallback = vi.fn().mockResolvedValue(newToken)

      const result = await refreshAccessToken(refreshCallback, error)
      
      expect(refreshCallback).toHaveBeenCalled()
      expect(result).toBe(newToken)
    })

    it('throws error if refresh callback fails', async () => {
      const error = { response: { status: 401 } }
      const refreshCallback = vi.fn().mockRejectedValue(new Error('Refresh failed'))

      await expect(refreshAccessToken(refreshCallback, error)).rejects.toThrow(
        'Failed to refresh your session. Please log in again.'
      )
    })
  })

  describe('retryWithTokenRefresh', () => {
    it('returns result on first successful attempt', async () => {
      const requestFn = vi.fn().mockResolvedValue('success')
      const refreshCallback = vi.fn()

      const result = await retryWithTokenRefresh(requestFn, refreshCallback)
      
      expect(requestFn).toHaveBeenCalledTimes(1)
      expect(refreshCallback).not.toHaveBeenCalled()
      expect(result).toBe('success')
    })

    it('retries once on token expiry error', async () => {
      const requestFn = vi.fn()
        .mockRejectedValueOnce({ response: { status: 401 } })
        .mockResolvedValue('success')
      const refreshCallback = vi.fn().mockResolvedValue('new_token')

      const result = await retryWithTokenRefresh(requestFn, refreshCallback)
      
      expect(requestFn).toHaveBeenCalledTimes(2)
      expect(refreshCallback).toHaveBeenCalled()
      expect(result).toBe('success')
    })

    it('throws error on non-token-expiry errors', async () => {
      const error = { response: { status: 429 } }
      const requestFn = vi.fn().mockRejectedValue(error)
      const refreshCallback = vi.fn()

      await expect(retryWithTokenRefresh(requestFn, refreshCallback)).rejects.toEqual(error)
      expect(refreshCallback).not.toHaveBeenCalled()
    })

    it('throws error after max retries exhausted', async () => {
      const error = { response: { status: 401 } }
      const requestFn = vi.fn().mockRejectedValue(error)
      const refreshCallback = vi.fn().mockResolvedValue('new_token')

      await expect(retryWithTokenRefresh(requestFn, refreshCallback, 2)).rejects.toEqual(error)
      expect(requestFn).toHaveBeenCalledTimes(3) // initial + 2 retries
      expect(refreshCallback).toHaveBeenCalledTimes(2)
    })

    it('respects custom max retries', async () => {
      const error = { response: { status: 401 } }
      const requestFn = vi.fn().mockRejectedValue(error)
      const refreshCallback = vi.fn().mockResolvedValue('new_token')

      await expect(retryWithTokenRefresh(requestFn, refreshCallback, 0)).rejects.toEqual(error)
      expect(requestFn).toHaveBeenCalledTimes(1) // no retries
      expect(refreshCallback).not.toHaveBeenCalled()
    })
  })
})

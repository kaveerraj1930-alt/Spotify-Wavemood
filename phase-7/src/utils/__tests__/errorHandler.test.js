import { describe, it, expect } from 'vitest'
import {
  getSpotifyErrorMessage,
  isTokenExpiredError,
  isRateLimitError,
  getRetryAfterSeconds,
  SPOTIFY_ERROR_CODES,
  SPOTIFY_ERROR_MESSAGES,
} from '../errorHandler'

describe('errorHandler', () => {
  describe('getSpotifyErrorMessage', () => {
    it('returns message for 401 error', () => {
      const error = {
        response: { status: 401 }
      }
      const message = getSpotifyErrorMessage(error)
      expect(message).toBe(SPOTIFY_ERROR_MESSAGES[401])
    })

    it('returns message for 429 error', () => {
      const error = {
        response: { status: 429 }
      }
      const message = getSpotifyErrorMessage(error)
      expect(message).toBe(SPOTIFY_ERROR_MESSAGES[429])
    })

    it('returns network error message for network errors', () => {
      const error = {
        message: 'Network Error'
      }
      const message = getSpotifyErrorMessage(error)
      expect(message).toBe(SPOTIFY_ERROR_MESSAGES.NETWORK_ERROR)
    })

    it('returns custom error message when available', () => {
      const error = {
        message: 'Custom error message'
      }
      const message = getSpotifyErrorMessage(error)
      expect(message).toBe('Custom error message')
    })

    it('returns unknown error message for unhandled errors', () => {
      const error = {}
      const message = getSpotifyErrorMessage(error)
      expect(message).toBe(SPOTIFY_ERROR_MESSAGES.UNKNOWN_ERROR)
    })

    it('returns Spotify API error message from response data', () => {
      const error = {
        response: {
          status: 400,
          data: { error: { message: 'Invalid request' } }
        }
      }
      const message = getSpotifyErrorMessage(error)
      expect(message).toBe('Invalid request. Please try again.')
    })
  })

  describe('isTokenExpiredError', () => {
    it('returns true for 401 error', () => {
      const error = {
        response: { status: 401 }
      }
      expect(isTokenExpiredError(error)).toBe(true)
    })

    it('returns false for other errors', () => {
      const error = {
        response: { status: 429 }
      }
      expect(isTokenExpiredError(error)).toBe(false)
    })

    it('returns false for error without response', () => {
      const error = { message: 'Some error' }
      expect(isTokenExpiredError(error)).toBe(false)
    })
  })

  describe('isRateLimitError', () => {
    it('returns true for 429 error', () => {
      const error = {
        response: { status: 429 }
      }
      expect(isRateLimitError(error)).toBe(true)
    })

    it('returns false for other errors', () => {
      const error = {
        response: { status: 401 }
      }
      expect(isRateLimitError(error)).toBe(false)
    })

    it('returns false for error without response', () => {
      const error = { message: 'Some error' }
      expect(isRateLimitError(error)).toBe(false)
    })
  })

  describe('getRetryAfterSeconds', () => {
    it('returns retry-after header value for rate limit error', () => {
      const error = {
        response: {
          status: 429,
          headers: { 'retry-after': '60' }
        }
      }
      const retryAfter = getRetryAfterSeconds(error)
      expect(retryAfter).toBe('60')
    })

    it('returns null for non-rate-limit errors', () => {
      const error = {
        response: { status: 401 }
      }
      const retryAfter = getRetryAfterSeconds(error)
      expect(retryAfter).toBeNull()
    })

    it('returns null when retry-after header is missing', () => {
      const error = {
        response: { status: 429 }
      }
      const retryAfter = getRetryAfterSeconds(error)
      expect(retryAfter).toBeNull()
    })
  })
})

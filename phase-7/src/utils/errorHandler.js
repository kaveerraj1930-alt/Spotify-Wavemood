/**
 * Spotify API Error Handler
 * Provides meaningful error messages for common Spotify API errors
 */

export const SPOTIFY_ERROR_CODES = {
  INVALID_TOKEN: 401,
  RATE_LIMITED: 429,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
  BAD_REQUEST: 400,
}

export const SPOTIFY_ERROR_MESSAGES = {
  [SPOTIFY_ERROR_CODES.INVALID_TOKEN]: 'Your session has expired. Please log in again.',
  [SPOTIFY_ERROR_CODES.RATE_LIMITED]: 'Too many requests. Please wait a moment and try again.',
  [SPOTIFY_ERROR_CODES.FORBIDDEN]: 'Access denied. Please check your account permissions.',
  [SPOTIFY_ERROR_CODES.NOT_FOUND]: 'The requested resource was not found.',
  [SPOTIFY_ERROR_CODES.SERVER_ERROR]: 'Spotify is experiencing issues. Please try again later.',
  [SPOTIFY_ERROR_CODES.BAD_REQUEST]: 'Invalid request. Please try again.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNKNOWN_ERROR: 'An unexpected error occurred. Please try again.',
}

/**
 * Get a user-friendly error message from a Spotify API error
 * @param {Error} error - The error object
 * @returns {string} User-friendly error message
 */
export function getSpotifyErrorMessage(error) {
  if (!error) return SPOTIFY_ERROR_MESSAGES.UNKNOWN_ERROR

  // Handle network errors
  if (error.message?.includes('Network Error') || error.message?.includes('ECONNREFUSED')) {
    return SPOTIFY_ERROR_MESSAGES.NETWORK_ERROR
  }

  // Handle Spotify API errors with status codes
  if (error.response?.status) {
    const statusCode = error.response.status
    return (
      SPOTIFY_ERROR_MESSAGES[statusCode] ||
      error.response.data?.error?.message ||
      SPOTIFY_ERROR_MESSAGES.UNKNOWN_ERROR
    )
  }

  // Handle custom error messages
  if (error.message) {
    return error.message
  }

  return SPOTIFY_ERROR_MESSAGES.UNKNOWN_ERROR
}

/**
 * Check if an error is a token expiry error
 * @param {Error} error - The error object
 * @returns {boolean}
 */
export function isTokenExpiredError(error) {
  return error.response?.status === SPOTIFY_ERROR_CODES.INVALID_TOKEN
}

/**
 * Check if an error is a rate limit error
 * @param {Error} error - The error object
 * @returns {boolean}
 */
export function isRateLimitError(error) {
  return error.response?.status === SPOTIFY_ERROR_CODES.RATE_LIMITED
}

/**
 * Get retry-after seconds from rate limit error
 * @param {Error} error - The error object
 * @returns {number|null} Seconds to wait before retrying
 */
export function getRetryAfterSeconds(error) {
  if (!isRateLimitError(error)) return null
  return error.response?.headers?.['retry-after'] || null
}

export default {
  getSpotifyErrorMessage,
  isTokenExpiredError,
  isRateLimitError,
  getRetryAfterSeconds,
  SPOTIFY_ERROR_CODES,
  SPOTIFY_ERROR_MESSAGES,
}

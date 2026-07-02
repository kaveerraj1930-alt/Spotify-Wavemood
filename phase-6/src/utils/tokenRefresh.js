/**
 * Token Refresh Handler
 * Manages token expiry and automatic refresh for Spotify API
 */

import { isTokenExpiredError } from './errorHandler'

/**
 * Refresh an expired access token
 * @param {Function} refreshCallback - Function to call to refresh the token
 * @param {_object} error - The error that triggered the refresh
 * @returns {Promise<string>} New access token
 */
export async function refreshAccessToken(refreshCallback, error) {
  if (!isTokenExpiredError(error)) {
    throw new Error('Cannot refresh token: error is not a token expiry error')
  }

  try {
    const newToken = await refreshCallback()
    return newToken
  } catch (refreshError) {
    console.error('Token refresh failed:', refreshError)
    throw new Error('Failed to refresh your session. Please log in again.')
  }
}

/**
 * Retry a request with automatic token refresh
 * @param {Function} requestFn - The request function to retry
 * @param {Function} refreshCallback - Function to refresh the token
 * @param {number} maxRetries - Maximum number of retries (default: 1)
 * @returns {Promise<any>} The result of the request
 */
export async function retryWithTokenRefresh(requestFn, refreshCallback, maxRetries = 1) {
  let lastError = null

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await requestFn()
    } catch (error) {
      lastError = error

      // Only retry on token expiry errors
      if (isTokenExpiredError(error) && attempt < maxRetries) {
        console.log('Token expired, attempting refresh...')
        await refreshAccessToken(refreshCallback, error)
        continue
      }

      // Don't retry on other errors
      throw error
    }
  }

  throw lastError
}

export default {
  refreshAccessToken,
  retryWithTokenRefresh,
}

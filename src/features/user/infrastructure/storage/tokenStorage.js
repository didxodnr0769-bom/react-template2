/**
 * Token storage management using localStorage
 */

const ACCESS_TOKEN_KEY = "auth_access_token";
const REFRESH_TOKEN_KEY = "auth_refresh_token";

export const tokenStorage = {
  /**
   * Get access token from storage
   * @returns {string|null}
   */
  getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  },

  /**
   * Set access token in storage
   * @param {string} token
   */
  setAccessToken(token) {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  },

  /**
   * Get refresh token from storage
   * @returns {string|null}
   */
  getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  /**
   * Set refresh token in storage
   * @param {string} token
   */
  setRefreshToken(token) {
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
  },

  /**
   * Remove access token from storage
   */
  removeAccessToken() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  },

  /**
   * Remove refresh token from storage
   */
  removeRefreshToken() {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },

  /**
   * Clear all tokens from storage
   */
  clearTokens() {
    this.removeAccessToken();
    this.removeRefreshToken();
  },

  /**
   * Check if access token exists
   * @returns {boolean}
   */
  hasAccessToken() {
    return !!this.getAccessToken();
  },
};

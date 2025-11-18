/**
 * HTTP Client Wrapper
 * Provides convenient methods for HTTP requests
 */

/**
 * Create HTTP client wrapper methods
 * @param {import('axios').AxiosInstance} axiosInstance
 * @returns {Object} HTTP client methods
 */
export const createHttpClient = (axiosInstance) => ({
  /**
   * GET request
   * @param {string} url
   * @param {object} config
   * @returns {Promise}
   */
  get: (url, config) => axiosInstance.get(url, config),

  /**
   * POST request
   * @param {string} url
   * @param {*} data
   * @param {object} config
   * @returns {Promise}
   */
  post: (url, data, config) => axiosInstance.post(url, data, config),

  /**
   * PUT request
   * @param {string} url
   * @param {*} data
   * @param {object} config
   * @returns {Promise}
   */
  put: (url, data, config) => axiosInstance.put(url, data, config),

  /**
   * PATCH request
   * @param {string} url
   * @param {*} data
   * @param {object} config
   * @returns {Promise}
   */
  patch: (url, data, config) => axiosInstance.patch(url, data, config),

  /**
   * DELETE request
   * @param {string} url
   * @param {object} config
   * @returns {Promise}
   */
  delete: (url, config) => axiosInstance.delete(url, config),

  /**
   * Upload file(s)
   * @param {string} url
   * @param {FormData} formData
   * @param {object} config
   * @returns {Promise}
   */
  upload: (url, formData, config = {}) =>
    axiosInstance.post(url, formData, {
      ...config,
      headers: {
        "Content-Type": "multipart/form-data",
        ...config.headers,
      },
    }),

  /**
   * Download file
   * @param {string} url
   * @param {object} config
   * @returns {Promise}
   */
  download: (url, config = {}) =>
    axiosInstance.get(url, {
      ...config,
      responseType: "blob",
    }),
});

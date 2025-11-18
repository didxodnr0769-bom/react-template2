/**
 * Axios Interceptors
 * Request and Response interceptors for logging and error handling
 */

import { isDevelopment } from "@/shared/config/env.js";

/**
 * Request Interceptor
 * - Log requests in development mode
 */
export const requestInterceptor = {
  onFulfilled: (config) => {
    // Log request in development mode
    if (isDevelopment()) {
      console.log("Request:", {
        method: config.method?.toUpperCase(),
        url: config.url,
        params: config.params,
        data: config.data,
      });
    }

    return config;
  },
  onRejected: (error) => {
    if (isDevelopment()) {
      console.error("Request Error:", error);
    }
    return Promise.reject(error);
  },
};

/**
 * Response Interceptor
 * - Handle successful responses
 * - Handle errors globally
 * - Log responses in development mode
 */
export const responseInterceptor = {
  onFulfilled: (response) => {
    // Log response in development mode
    if (isDevelopment()) {
      console.log("Response:", {
        status: response.status,
        url: response.config.url,
        data: response.data,
      });
    }

    return response;
  },
  onRejected: async (error) => {
    // Log error in development mode
    if (isDevelopment()) {
      console.error("Response Error:", {
        status: error.response?.status,
        url: error.config?.url,
        message: error.message,
        data: error.response?.data,
      });
    }

    // Handle different error status codes
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 401:
          // Unauthorized
          console.error("Unauthorized:", data?.message);
          break;

        case 403:
          // Forbidden - User doesn't have permission
          console.error("Access forbidden:", data?.message);
          break;

        case 404:
          // Not Found
          console.error("Resource not found:", error.config?.url);
          break;

        case 500:
          // Internal Server Error
          console.error("Server error:", data?.message);
          break;

        case 503:
          // Service Unavailable
          console.error("Service unavailable");
          break;

        default:
          // Other errors
          console.error("HTTP Error:", status, data?.message);
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error("Network error - No response received");
    } else {
      // Something else happened
      console.error("Request setup error:", error.message);
    }

    return Promise.reject(error);
  },
};

/**
 * Axios HTTP Client Configuration
 * Centralized HTTP client with interceptors and error handling
 */

import axios from "axios";
import config from "@/shared/config/env.js";
import { requestInterceptor, responseInterceptor } from "./interceptors.js";
import { createHttpClient } from "./httpClient.js";

/**
 * Create Axios instance with default configuration
 */
const axiosInstance = axios.create({
  baseURL: config.api.baseUrl,
  timeout: config.api.timeout,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Apply Request Interceptor
 */
axiosInstance.interceptors.request.use(
  requestInterceptor.onFulfilled,
  requestInterceptor.onRejected,
);

/**
 * Apply Response Interceptor
 */
axiosInstance.interceptors.response.use(
  responseInterceptor.onFulfilled,
  responseInterceptor.onRejected,
);

/**
 * HTTP Client with wrapper methods
 */
export const httpClient = createHttpClient(axiosInstance);

// Export the axios instance as default
export default axiosInstance;

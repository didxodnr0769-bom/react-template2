/**
 * Axios Interceptors
 * Request and Response interceptors for logging and error handling
 */

import { isDevelopment } from "@/shared/config/env.js";
import { tokenStorage } from "@/features/user/infrastructure/storage/tokenStorage.js";
import axios from "axios";

// 토큰 재발급 상태 관리
let isRefreshing = false;
let failedQueue = [];

/**
 * 대기 중인 요청 처리
 */
const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

/**
 * Refresh Token을 사용하여 새로운 Access Token 발급
 */
const refreshAccessToken = async () => {
  const refreshToken = tokenStorage.getRefreshToken();

  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  try {
    const response = await axios.post("/api/auth/refresh", {
      refreshToken,
    });

    const { accessToken, refreshToken: newRefreshToken } = response.data.data;

    // 새로운 토큰 저장
    tokenStorage.setAccessToken(accessToken);
    tokenStorage.setRefreshToken(newRefreshToken);

    return accessToken;
  } catch (error) {
    // Refresh token도 만료되었거나 유효하지 않음
    tokenStorage.clearTokens();
    throw error;
  }
};

/**
 * Request Interceptor
 * - Add authentication token to requests
 * - Log requests in development mode
 */
export const requestInterceptor = {
  onFulfilled: (config) => {
    // Add access token to request headers
    const accessToken = tokenStorage.getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

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
        case 401: {
          // Unauthorized - 토큰 재발급 시도
          const originalRequest = error.config;

          // refresh token API 자체가 실패한 경우 무한 루프 방지
          if (originalRequest.url?.includes("/api/auth/refresh")) {
            console.error("Refresh token expired:", data?.message);
            tokenStorage.clearTokens();
            // 로그인 페이지로 리다이렉트 또는 이벤트 발생
            window.location.href = "/login";
            return Promise.reject(error);
          }

          // 이미 재시도한 요청인 경우 무한 루프 방지
          if (originalRequest._retry) {
            console.error("Token refresh failed, redirecting to login");
            tokenStorage.clearTokens();
            window.location.href = "/login";
            return Promise.reject(error);
          }

          originalRequest._retry = true;

          if (isRefreshing) {
            // 이미 토큰 재발급 중이면 대기열에 추가
            return new Promise((resolve, reject) => {
              failedQueue.push({ resolve, reject });
            })
              .then((token) => {
                originalRequest.headers["Authorization"] = "Bearer " + token;
                return axios(originalRequest);
              })
              .catch((err) => {
                return Promise.reject(err);
              });
          }

          isRefreshing = true;

          return new Promise((resolve, reject) => {
            refreshAccessToken()
              .then((newToken) => {
                // 대기 중인 모든 요청에 새 토큰 전달
                processQueue(null, newToken);

                // 원래 요청에 새 토큰 설정
                originalRequest.headers["Authorization"] = "Bearer " + newToken;
                resolve(axios(originalRequest));
              })
              .catch((err) => {
                processQueue(err, null);
                tokenStorage.clearTokens();
                window.location.href = "/login";
                reject(err);
              })
              .finally(() => {
                isRefreshing = false;
              });
          });
        }

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

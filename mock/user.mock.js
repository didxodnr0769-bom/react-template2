import { defineMock } from "vite-plugin-mock-dev-server";
import USER_LIST from "./data/USER_LIST.json";
import {
  createAccessToken,
  createRefreshToken,
  validateAccessToken,
  validateRefreshToken,
  extractBearerToken,
} from "./utils/tokenUtils.js";
import {
  sendSuccess,
  sendAuthError,
  sendBadRequest,
} from "./utils/responseUtils.js";

/**
 * Mock user API
 * 사용자 인증 관련 Mock API
 */

/**
 * POST /api/auth/login
 * 로그인 API
 */
export function loginApi(req, res) {
  const { username, password } = req.body;

  // USER_LIST에서 사용자 찾기
  const user = USER_LIST.find(
    (u) => u.username === username && u.password === password,
  );

  if (user) {
    // Access Token과 Refresh Token 생성
    const accessToken = createAccessToken(user.id);
    const refreshToken = createRefreshToken(user.id);

    sendSuccess(res, "로그인 성공", {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } else {
    sendBadRequest(res, "아이디 또는 비밀번호가 올바르지 않습니다.");
  }
}

/**
 * POST /api/auth/logout
 * 로그아웃 API
 */
export function logoutApi() {
  return {
    success: true,
    message: "로그아웃 성공",
  };
}

/**
 * POST /api/auth/refresh
 * Refresh Token을 사용하여 새로운 토큰 발급
 */
export function refreshTokenApi(req, res) {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    sendBadRequest(res, "Refresh Token이 필요합니다.");
    return;
  }

  // Refresh Token 검증
  const validation = validateRefreshToken(refreshToken);

  if (validation.valid) {
    // 새로운 Access Token과 Refresh Token 생성
    const newAccessToken = createAccessToken(validation.userId);
    const newRefreshToken = createRefreshToken(validation.userId);

    sendSuccess(res, "토큰 재발급 성공", {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } else {
    sendAuthError(res, validation.message);
  }
}

/**
 * GET /api/auth/me
 * 현재 로그인한 사용자 정보 조회
 */
export function getMeApi(req, res) {
  const token = extractBearerToken(req.headers.authorization);

  if (!token) {
    sendAuthError(res, "인증 토큰이 필요합니다.");
    return;
  }

  // Access Token 검증
  const validation = validateAccessToken(token);

  if (!validation.valid) {
    sendAuthError(res, validation.message);
    return;
  }

  // USER_LIST에서 사용자 찾기
  const user = USER_LIST.find((u) => u.id === validation.userId);

  if (user) {
    sendSuccess(res, "사용자 정보 조회 성공", {
      id: user.id,
      username: user.username,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } else {
    sendAuthError(res, "사용자를 찾을 수 없습니다.");
  }
}

export default defineMock([
  {
    url: "/api/auth/login",
    method: "POST",
    response: loginApi,
  },
  {
    url: "/api/auth/logout",
    method: "POST",
    body: logoutApi,
  },
  {
    url: "/api/auth/refresh",
    method: "POST",
    response: refreshTokenApi,
  },
  {
    url: "/api/auth/me",
    method: "GET",
    response: getMeApi,
  },
]);

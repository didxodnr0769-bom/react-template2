import { defineMock } from "vite-plugin-mock-dev-server";
/**
 * Mock user API
 * 사용자 인증 관련 Mock API
 */

/**
 * POST /api/auth/login
 * 로그인 API
 */
export function loginApi(request) {
  const { username, password } = request.body;
  console.log("요청~!");

  // 간단한 하드코딩된 인증 (테스트용)
  if (username === "admin" && password === "admin123") {
    return {
      success: true,
      message: "로그인 성공",
      data: {
        token: "mock-jwt-token-1234567890abcdef",
        user: {
          id: 1,
          username: "admin",
          name: "관리자",
          email: "admin@example.com",
          role: "admin",
        },
      },
    };
  } else if (username === "user" && password === "user123") {
    return {
      success: true,
      message: "로그인 성공",
      data: {
        token: "mock-jwt-token-0987654321fedcba",
        user: {
          id: 2,
          username: "user",
          name: "사용자",
          email: "user@example.com",
          role: "user",
        },
      },
    };
  } else {
    return {
      statusCode: 401,
      success: false,
      message: "아이디 또는 비밀번호가 올바르지 않습니다.",
    };
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
 * GET /api/auth/me
 * 현재 로그인한 사용자 정보 조회
 */
export function getMeApi(request) {
  const authHeader = request.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.substring(7);

    if (token === "mock-jwt-token-1234567890abcdef") {
      return {
        success: true,
        data: {
          id: 1,
          username: "admin",
          name: "관리자",
          email: "admin@example.com",
          role: "admin",
        },
      };
    } else if (token === "mock-jwt-token-0987654321fedcba") {
      return {
        success: true,
        data: {
          id: 2,
          username: "user",
          name: "사용자",
          email: "user@example.com",
          role: "user",
        },
      };
    } else {
      return {
        statusCode: 401,
        success: false,
        message: "유효하지 않은 토큰입니다.",
      };
    }
  } else {
    return {
      statusCode: 401,
      success: false,
      message: "인증 토큰이 필요합니다.",
    };
  }
}

export default defineMock([
  {
    url: "/api/auth/login",
    method: "POST",
    body: loginApi,
  },
  {
    url: "/api/auth/logout",
    method: "POST",
    body: logoutApi,
  },
  {
    url: "/api/auth/me",
    method: "GET",
    body: getMeApi,
  },
]);

import { defineMock } from "vite-plugin-mock-dev-server";
import USER_LIST from "./data/USER_LIST.json";
import { validateAccessToken, extractBearerToken } from "./utils/tokenUtils.js";
import { sendSuccess, sendAuthError } from "./utils/responseUtils.js";

/**
 * Mock test API
 * 테스트용 API - 토큰 검증
 */

/**
 * GET /api/test/protected
 * 토큰 검증이 필요한 테스트 엔드포인트
 */
export function testProtectedApi(req, res) {
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
    sendSuccess(res, "토큰 검증 성공!", {
      message: "이것은 보호된 리소스입니다.",
      timestamp: new Date().toISOString(),
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        role: user.role,
      },
    });
  } else {
    sendAuthError(res, "사용자를 찾을 수 없습니다.");
  }
}

export default defineMock([
  {
    url: "/api/test/protected",
    method: "GET",
    response: testProtectedApi,
  },
]);

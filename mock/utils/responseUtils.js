/**
 * Mock Response Utilities
 * 공통 응답 생성 헬퍼 함수들
 */

/**
 * JSON 응답 전송
 * @param {object} res - Response 객체
 * @param {number} statusCode - HTTP 상태 코드
 * @param {object} data - 응답 데이터
 */
export function sendJsonResponse(res, statusCode, data) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(data));
}

/**
 * 성공 응답 전송
 * @param {object} res - Response 객체
 * @param {string} message - 성공 메시지
 * @param {object} data - 응답 데이터
 * @param {number} statusCode - HTTP 상태 코드 (기본값: 200)
 */
export function sendSuccess(res, message, data = null, statusCode = 200) {
  const response = {
    success: true,
    message,
  };

  if (data !== null) {
    response.data = data;
  }

  sendJsonResponse(res, statusCode, response);
}

/**
 * 에러 응답 전송
 * @param {object} res - Response 객체
 * @param {number} statusCode - HTTP 상태 코드
 * @param {string} message - 에러 메시지
 */
export function sendError(res, statusCode, message) {
  sendJsonResponse(res, statusCode, {
    success: false,
    message,
  });
}

/**
 * 인증 에러 응답 전송 (401)
 * @param {object} res - Response 객체
 * @param {string} message - 에러 메시지 (기본값: "인증에 실패했습니다.")
 */
export function sendAuthError(res, message = "인증에 실패했습니다.") {
  sendError(res, 401, message);
}

/**
 * 잘못된 요청 에러 응답 전송 (400)
 * @param {object} res - Response 객체
 * @param {string} message - 에러 메시지
 */
export function sendBadRequest(res, message) {
  sendError(res, 400, message);
}

import USER_LIST from "../data/USER_LIST.json";
import {
  ACCESS_TOKEN_EXPIRE_TIME,
  REFRESH_TOKEN_EXPIRE_TIME,
} from "./tokenStore.js";

/**
 * 토큰 생성 함수
 * @param {number} userId - 사용자 ID
 * @param {number} expiresIn - 만료 시간 (밀리초)
 * @returns {string} 생성된 토큰
 */
export function generateToken(userId, expiresIn) {
  const now = Date.now();
  const random = Math.random().toString(36).substring(2, 15);

  const payload = {
    userId,
    createdAt: now,
    expiresAt: now + expiresIn,
    random,
  };

  return Buffer.from(JSON.stringify(payload)).toString("base64");
}

/**
 * 토큰 디코딩 함수
 * @param {string} token - 디코딩할 토큰
 * @returns {{ userId: number, createdAt: number, expiresAt: number, random: string } | null}
 */
export function decodeToken(token) {
  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}

/**
 * Access Token 생성
 * @param {number} userId - 사용자 ID
 * @returns {string} 생성된 Access Token
 */
export function createAccessToken(userId) {
  return generateToken(userId, ACCESS_TOKEN_EXPIRE_TIME);
}

/**
 * Refresh Token 생성
 * @param {number} userId - 사용자 ID
 * @returns {string} 생성된 Refresh Token
 */
export function createRefreshToken(userId) {
  return generateToken(userId, REFRESH_TOKEN_EXPIRE_TIME);
}

/**
 * 토큰 검증 함수
 * @param {string} token - 검증할 토큰
 * @returns {{ valid: boolean, userId?: number, message?: string }}
 */
export function validateToken(token) {
  const tokenData = decodeToken(token);

  if (!tokenData) {
    return { valid: false, message: "유효하지 않은 토큰입니다." };
  }

  const now = Date.now();
  if (now > tokenData.expiresAt) {
    return { valid: false, message: "토큰이 만료되었습니다." };
  }

  // USER_LIST에서 사용자 존재 확인
  const user = USER_LIST.find((u) => u.id === tokenData.userId);
  if (!user) {
    return { valid: false, message: "사용자를 찾을 수 없습니다." };
  }

  return { valid: true, userId: tokenData.userId };
}

/**
 * Access Token 검증
 * @param {string} token - 검증할 Access Token
 * @returns {{ valid: boolean, userId?: number, message?: string }}
 */
export function validateAccessToken(token) {
  return validateToken(token);
}

/**
 * Refresh Token 검증
 * @param {string} token - 검증할 Refresh Token
 * @returns {{ valid: boolean, userId?: number, message?: string }}
 */
export function validateRefreshToken(token) {
  return validateToken(token);
}

/**
 * Authorization 헤더에서 Bearer 토큰 추출
 * @param {string} authHeader - Authorization 헤더 값
 * @returns {string|null} 추출된 토큰 또는 null
 */
export function extractBearerToken(authHeader) {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }
  return authHeader.substring(7);
}

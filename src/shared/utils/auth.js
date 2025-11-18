/**
 * Authentication utility functions
 * localStorage를 이용한 인증 정보 관리
 */

const AUTH_TOKEN_KEY = 'auth_token';
const AUTH_USER_KEY = 'auth_user';

/**
 * 토큰 저장
 * @param {string} token - JWT 토큰
 */
export const setToken = (token) => {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
};

/**
 * 토큰 가져오기
 * @returns {string|null} 저장된 토큰 또는 null
 */
export const getToken = () => {
  return localStorage.getItem(AUTH_TOKEN_KEY);
};

/**
 * 토큰 삭제
 */
export const removeToken = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
};

/**
 * 사용자 정보 저장
 * @param {Object} user - 사용자 정보 객체
 */
export const setUser = (user) => {
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
};

/**
 * 사용자 정보 가져오기
 * @returns {Object|null} 저장된 사용자 정보 또는 null
 */
export const getUser = () => {
  const userStr = localStorage.getItem(AUTH_USER_KEY);
  if (!userStr) return null;

  try {
    return JSON.parse(userStr);
  } catch (error) {
    console.error('Failed to parse user data:', error);
    return null;
  }
};

/**
 * 사용자 정보 삭제
 */
export const removeUser = () => {
  localStorage.removeItem(AUTH_USER_KEY);
};

/**
 * 로그인 상태 확인
 * @returns {boolean} 로그인 여부
 */
export const isAuthenticated = () => {
  return !!getToken();
};

/**
 * 로그인 처리
 * @param {string} token - JWT 토큰
 * @param {Object} user - 사용자 정보
 */
export const login = (token, user) => {
  setToken(token);
  setUser(user);
};

/**
 * 로그아웃 처리
 * 모든 인증 정보를 삭제합니다.
 */
export const logout = () => {
  removeToken();
  removeUser();
};

/**
 * 인증 헤더 생성
 * @returns {Object} Authorization 헤더 객체
 */
export const getAuthHeader = () => {
  const token = getToken();
  if (!token) return {};

  return {
    Authorization: `Bearer ${token}`,
  };
};

/**
 * 모든 인증 정보 가져오기
 * @returns {Object} 토큰과 사용자 정보를 포함한 객체
 */
export const getAuthData = () => {
  return {
    token: getToken(),
    user: getUser(),
    isAuthenticated: isAuthenticated(),
  };
};

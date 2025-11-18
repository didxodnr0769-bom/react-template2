/**
 * User Role Constants
 * 사용자 역할 상수 정의
 */

/**
 * 사용자 역할 타입
 * @readonly
 * @enum {string}
 */
export const ROLES = {
  /** 관리자 - 모든 화면 접근 가능 */
  ADMIN: "admin",
  /** 일반 사용자 - 특정 화면만 접근 가능 */
  USER: "user",
  /** 미로그인 사용자 - 홈 화면만 접근 가능 */
  GUEST: "guest",
};

/**
 * 역할 우선순위 (높을수록 더 많은 권한)
 * 역할 비교에 사용됩니다.
 */
export const ROLE_PRIORITY = {
  [ROLES.GUEST]: 0,
  [ROLES.USER]: 1,
  [ROLES.ADMIN]: 2,
};

/**
 * 역할 표시 이름
 */
export const ROLE_LABELS = {
  [ROLES.ADMIN]: "관리자",
  [ROLES.USER]: "일반 사용자",
  [ROLES.GUEST]: "미로그인",
};

/**
 * 사용자가 특정 역할을 가지고 있는지 확인
 * @param {string} userRole - 확인할 사용자 역할
 * @param {string|string[]} requiredRoles - 필요한 역할(들)
 * @returns {boolean} 역할 일치 여부
 */
export const hasRole = (userRole, requiredRoles) => {
  if (!requiredRoles || requiredRoles.length === 0) return true;

  const roles = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];
  return roles.includes(userRole);
};

/**
 * 사용자가 특정 역할보다 높은 권한을 가지고 있는지 확인
 * @param {string} userRole - 확인할 사용자 역할
 * @param {string} minimumRole - 최소 필요 역할
 * @returns {boolean} 권한 충족 여부
 */
export const hasMinimumRole = (userRole, minimumRole) => {
  return (
    ROLE_PRIORITY[userRole] >= (ROLE_PRIORITY[minimumRole] || 0)
  );
};

/**
 * 현재 사용자의 역할을 반환 (미인증 시 GUEST 반환)
 * @param {Object|null} user - 사용자 객체
 * @returns {string} 사용자 역할
 */
export const getUserRole = (user) => {
  if (!user) return ROLES.GUEST;
  return user.role || ROLES.GUEST;
};

export default ROLES;

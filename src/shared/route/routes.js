import Home from "@/pages/Home";
import About from "@/pages/About";
import Login from "@/pages/Login";
import Profile from "@/pages/Profile";
import Dashboard from "@/pages/Dashboard";
import Admin from "@/pages/Admin";
import AdminUsers from "@/pages/AdminUsers";
import AdminSettings from "@/pages/AdminSettings";
import NotFound from "@/pages/NotFound";
import { URL } from "@/shared/constants/URL";
import { ROLES } from "@/shared/constants/roles";

/**
 * 라우트 설정 객체
 * @typedef {Object} RouteConfig
 * @property {string} path - 라우트 경로
 * @property {React.Component} component - 렌더링할 컴포넌트
 * @property {string} name - 라우트 이름
 * @property {boolean} [exact] - 정확한 경로 매칭 여부
 * @property {boolean} [private] - 인증이 필요한 페이지 여부 (deprecated: allowedRoles 사용 권장)
 * @property {string[]} [allowedRoles] - 접근 가능한 역할 배열
 * @property {boolean} [requireAuth] - 인증 필요 여부
 * @property {boolean} [guestOnly] - 미인증 사용자만 접근 가능 (로그인/회원가입 페이지용)
 * @property {boolean} [showInSidebar] - 사이드바에 표시할지 여부
 * @property {Object} [meta] - 추가 메타 정보 (title, description, icon 등)
 */

/**
 * 애플리케이션의 모든 라우트 설정
 * @type {RouteConfig[]}
 */
export const routes = [
  // 공개 페이지 (모든 사용자 접근 가능)
  {
    path: URL.HOME,
    component: Home,
    name: "Home",
    exact: true,
    allowedRoles: [ROLES.GUEST, ROLES.USER, ROLES.ADMIN], // 모든 사용자 접근 가능
    showInSidebar: true,
    meta: {
      title: "홈",
      description: "React Template Home Page",
      icon: "🏠",
    },
  },
  {
    path: URL.ABOUT,
    component: About,
    name: "About",
    exact: true,
    allowedRoles: [ROLES.GUEST, ROLES.USER, ROLES.ADMIN], // 모든 사용자 접근 가능
    showInSidebar: true,
    meta: {
      title: "소개",
      description: "About Page",
      icon: "ℹ️",
    },
  },

  // 인증 관련 페이지 (미로그인 사용자만 접근 가능)
  {
    path: URL.LOGIN,
    component: Login,
    name: "Login",
    exact: true,
    guestOnly: true, // 미인증 사용자만 접근 가능
    showInSidebar: false,
    meta: {
      title: "로그인",
      description: "Login Page",
      icon: "🔑",
    },
  },

  // 일반 사용자 페이지 (로그인한 사용자만 접근 가능)
  {
    path: URL.PROFILE,
    component: Profile,
    name: "Profile",
    exact: true,
    requireAuth: true,
    allowedRoles: [ROLES.USER, ROLES.ADMIN],
    showInSidebar: true,
    meta: {
      title: "프로필",
      description: "User Profile Page",
      icon: "👤",
    },
  },
  {
    path: URL.DASHBOARD,
    component: Dashboard,
    name: "Dashboard",
    exact: true,
    requireAuth: true,
    allowedRoles: [ROLES.USER, ROLES.ADMIN],
    showInSidebar: true,
    meta: {
      title: "대시보드",
      description: "User Dashboard Page",
      icon: "📊",
    },
  },

  // 관리자 페이지 (관리자만 접근 가능)
  {
    path: URL.ADMIN,
    component: Admin,
    name: "Admin",
    exact: true,
    requireAuth: true,
    allowedRoles: [ROLES.ADMIN],
    showInSidebar: true,
    meta: {
      title: "관리자",
      description: "Admin Dashboard",
      icon: "⚙️",
    },
  },
  {
    path: URL.ADMIN_USERS,
    component: AdminUsers,
    name: "AdminUsers",
    exact: true,
    requireAuth: true,
    allowedRoles: [ROLES.ADMIN],
    showInSidebar: false, // 관리자 페이지 내부 링크
    meta: {
      title: "사용자 관리",
      description: "User Management Page",
      icon: "👥",
    },
  },
  {
    path: URL.ADMIN_SETTINGS,
    component: AdminSettings,
    name: "AdminSettings",
    exact: true,
    requireAuth: true,
    allowedRoles: [ROLES.ADMIN],
    showInSidebar: false, // 관리자 페이지 내부 링크
    meta: {
      title: "시스템 설정",
      description: "System Settings Page",
      icon: "🔧",
    },
  },
];

/**
 * 404 Not Found 라우트 설정
 * 모든 라우트의 마지막에 배치되어야 합니다.
 */
export const notFoundRoute = {
  path: URL.NOT_FOUND,
  component: NotFound,
  name: "NotFound",
  meta: {
    title: "404 - Page Not Found",
    description: "Page not found",
  },
};

/**
 * 라우트 경로로 라우트 설정을 찾습니다
 * @param {string} path - 찾을 라우트 경로
 * @returns {RouteConfig|undefined} 라우트 설정 또는 undefined
 */
export const findRouteByPath = (path) => {
  return routes.find((route) => route.path === path);
};

/**
 * 라우트 이름으로 라우트 설정을 찾습니다
 * @param {string} name - 찾을 라우트 이름
 * @returns {RouteConfig|undefined} 라우트 설정 또는 undefined
 */
export const findRouteByName = (name) => {
  return routes.find((route) => route.name === name);
};

/**
 * 모든 공개 라우트를 반환합니다
 * @returns {RouteConfig[]} 공개 라우트 배열
 */
export const getPublicRoutes = () => {
  return routes.filter((route) => !route.private);
};

/**
 * 모든 비공개(인증 필요) 라우트를 반환합니다
 * @returns {RouteConfig[]} 비공개 라우트 배열
 */
export const getPrivateRoutes = () => {
  return routes.filter((route) => route.private);
};

/**
 * 라우트 이름으로 경로를 생성합니다
 * @param {string} name - 라우트 이름
 * @param {Object} [params] - URL 파라미터 (예: { id: 123 })
 * @returns {string|null} 생성된 경로 또는 null
 *
 * @example
 * generatePath('Home') // returns '/'
 * generatePath('About') // returns '/about'
 */
export const generatePath = (name, params = {}) => {
  const route = findRouteByName(name);
  if (!route) return null;

  let path = route.path;

  // URL 파라미터 치환
  Object.keys(params).forEach((key) => {
    path = path.replace(`:${key}`, params[key]);
  });

  return path;
};

/**
 * 네비게이션 메뉴를 위한 라우트 목록을 반환합니다
 * NotFound를 제외한 공개 라우트만 반환합니다.
 * @deprecated 대신 getSidebarRoutes 사용 권장
 * @returns {Array<{path: string, name: string}>} 네비게이션 메뉴 항목 배열
 */
export const getNavigationRoutes = () => {
  return routes
    .filter((route) => !route.private && route.name !== "NotFound")
    .map((route) => ({
      path: route.path,
      name: route.name,
      title: route.meta?.title || route.name,
    }));
};

/**
 * 사이드바에 표시할 라우트 목록을 반환합니다 (권한 필터링 포함)
 * @param {string} userRole - 현재 사용자의 역할
 * @returns {Array<{path: string, name: string, title: string, icon: string}>} 사이드바 메뉴 항목 배열
 */
export const getSidebarRoutes = (userRole) => {
  return routes
    .filter((route) => {
      // 사이드바에 표시하지 않는 라우트 제외
      if (!route.showInSidebar) return false;

      // 권한이 없는 라우트 제외
      if (route.allowedRoles && route.allowedRoles.length > 0) {
        return route.allowedRoles.includes(userRole);
      }

      return true;
    })
    .map((route) => ({
      path: route.path,
      name: route.name,
      title: route.meta?.title || route.name,
      icon: route.meta?.icon || "",
    }));
};

/**
 * 특정 역할에 대한 기본 리다이렉트 경로를 반환합니다
 * @param {string} role - 사용자 역할
 * @returns {string} 리다이렉트 경로
 */
export const getDefaultRouteForRole = (role) => {
  switch (role) {
    case "admin":
      return URL.ADMIN;
    case "user":
      return URL.DASHBOARD;
    default:
      return URL.HOME;
  }
};

export default routes;

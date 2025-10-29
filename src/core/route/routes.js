import Home from "../../pages/Home";
import About from "../../pages/About";
import NotFound from "../../pages/NotFound";
import { URL } from "../constants/URL";

/**
 * 라우트 설정 객체
 * @typedef {Object} RouteConfig
 * @property {string} path - 라우트 경로
 * @property {React.Component} component - 렌더링할 컴포넌트
 * @property {string} name - 라우트 이름
 * @property {boolean} [exact] - 정확한 경로 매칭 여부
 * @property {boolean} [private] - 인증이 필요한 페이지 여부
 * @property {Object} [meta] - 추가 메타 정보 (title, description 등)
 */

/**
 * 애플리케이션의 모든 라우트 설정
 * @type {RouteConfig[]}
 */
export const routes = [
  {
    path: URL.HOME,
    component: Home,
    name: "Home",
    exact: true,
    meta: {
      title: "Home",
      description: "React Template Home Page",
    },
  },
  {
    path: URL.ABOUT,
    component: About,
    name: "About",
    exact: true,
    meta: {
      title: "About",
      description: "About Page",
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

export default routes;

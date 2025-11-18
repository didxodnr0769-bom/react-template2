/**
 * Application URL constants
 * Centralized URL path management for better maintainability
 */

/**
 * Page route paths
 */
export const URL = {
  // Home page
  HOME: "/",

  // About page
  ABOUT: "/about",

  // Login page
  LOGIN: "/login",

  // User pages
  PROFILE: "/profile",
  DASHBOARD: "/dashboard",

  // Admin pages
  ADMIN: "/admin",
  ADMIN_USERS: "/admin/users",
  ADMIN_SETTINGS: "/admin/settings",

  // 404 Not Found page (wildcard)
  NOT_FOUND: "*",
};

/**
 * API endpoint paths
 */
export const API_URL = {
  // Auth endpoints
  LOGIN: "/api/auth/login",
  LOGOUT: "/api/auth/logout",
  ME: "/api/auth/me",
};

export default URL;

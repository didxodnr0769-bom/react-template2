/**
 * Environment Configuration Utility
 * Centralized access to environment variables
 */

/**
 * Get environment variable value
 * @param {string} key - Environment variable key (without VITE_ prefix)
 * @param {*} defaultValue - Default value if not found
 * @returns {*} Environment variable value or default
 */
export const getEnv = (key, defaultValue = undefined) => {
  const value = import.meta.env[`VITE_${key}`];
  return value !== undefined ? value : defaultValue;
};

/**
 * Check if environment is development
 * @returns {boolean}
 */
export const isDevelopment = () => {
  return import.meta.env.MODE === "development";
};

/**
 * Check if environment is staging
 * @returns {boolean}
 */
export const isStaging = () => {
  return import.meta.env.MODE === "staging";
};

/**
 * Check if environment is production
 * @returns {boolean}
 */
export const isProduction = () => {
  return import.meta.env.MODE === "production";
};

/**
 * Get current environment mode
 * @returns {string}
 */
export const getMode = () => {
  return import.meta.env.MODE;
};

/**
 * Application configuration object
 */
const config = {
  // App Info
  app: {
    title: getEnv("APP_TITLE", "My App"),
    version: getEnv("APP_VERSION", "1.0.0"),
  },

  // API Configuration
  api: {
    baseUrl: getEnv("API_BASE_URL", "http://localhost:3000"),
    timeout: parseInt(getEnv("API_TIMEOUT", "30000"), 10),
  },

  // Feature Flags
  features: {
    analytics: getEnv("ENABLE_ANALYTICS", "false") === "true",
    debug: getEnv("ENABLE_DEBUG", "false") === "true",
  },

  // Environment Info
  env: {
    mode: getMode(),
    isDevelopment: isDevelopment(),
    isStaging: isStaging(),
    isProduction: isProduction(),
  },
};

export default config;

/**
 * GITHUB_CONFIG - Centralized configuration object for GitHub API usage.
 * Pulls values from environment variables (e.g., .env) with fallbacks for development.
 */
export const GITHUB_CONFIG = {
  BASE_URL: process.env.REACT_APP_GITHUB_BASE_URL ?? 'https://api.github.com', // Base URL for GitHub API
  TOKEN: process.env.REACT_APP_GITHUB_TOKEN ?? '', // Personal access token for GitHub API requests
  SEARCH_PATH: 'search/users', // Endpoint for searching GitHub users
  USER_PATH: 'users', // Endpoint for accessing specific user data or their repositories
};

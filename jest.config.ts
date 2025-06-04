import type { Config } from 'jest';

// Jest configuration for a React + TypeScript project
const config: Config = {
  // Use ts-jest to transpile TypeScript files before running tests
  preset: 'ts-jest',

  // Simulate a browser-like environment using jsdom (necessary for React component testing)
  testEnvironment: 'jsdom',

  // File(s) to be executed after Jest is initialized (used to configure testing environment)
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],

  // Mock static asset imports like CSS, SCSS, etc. to avoid errors during testing
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },

  // Skip transforming modules inside node_modules to improve performance
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
};

export default config;

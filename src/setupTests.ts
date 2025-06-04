// src/setupTests.ts

// Ensure TextEncoder and TextDecoder are available in the test environment
import { TextEncoder, TextDecoder } from 'util'; //  Must be at the top
import '@testing-library/jest-dom'; // Provides custom DOM matchers for testing
import 'whatwg-fetch'; // Polyfill fetch for Node.js environment
import { server } from './mocks/server'; // MSW mock server instance

//  Assign only if not already defined (safe for Node.js test environment)
if (typeof global.TextEncoder === 'undefined') {
  Object.assign(global, {
    TextEncoder,
    TextDecoder,
  });
}

//  Setup mock service worker (MSW) lifecycle hooks
beforeAll(() => server.listen());        // Start mock server before all tests
afterEach(() => server.resetHandlers()); // Reset handlers after each test
afterAll(() => server.close());          // Clean up after all tests

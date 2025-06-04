// Import the MSW server setup utility for Node.js
import { setupServer } from 'msw/node';

// Import an array of predefined request handlers (e.g., GET, POST mocks)
import { handlers } from './handlers';

// Create and export a mock server instance with all defined handlers.
// This will intercept HTTP requests in test environments and return mocked responses.
export const server = setupServer(...handlers);
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux'; // Provide Redux store context
import { store } from './store/store'; // Import the Redux store instance
import { MemoryRouter } from 'react-router-dom'; // MemoryRouter is used for testing routing in isolation
import App from './App'; // Import the root App component

// Test case: Ensure the title "GitHub Repositories Explorer" is rendered
test('renders GitHub Repositories Explorer', () => {
  render(
    // Wrap the app with Redux and Router context for testing
    <Provider store={store}>
      {/* MemoryRouter is suitable for testing because it doesn't rely on the browser URL */}
      {/* Use `future` flags to suppress React Router v7 transition warnings */}
      <MemoryRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
        <App />
      </MemoryRouter>
    </Provider>
  );

  // Assert that the text is present in the document
  expect(screen.getByText(/GitHub Repositories Explorer/i)).toBeInTheDocument();
});

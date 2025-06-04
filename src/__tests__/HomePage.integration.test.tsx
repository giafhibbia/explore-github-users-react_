import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { MemoryRouter } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import { server } from '../mocks/server';

// Setup MSW mock server before all tests
beforeAll(() => server.listen());

// Reset handlers after each test to avoid test pollution
afterEach(() => server.resetHandlers());

// Close server once all tests are done
afterAll(() => server.close());

test('searches users and loads repositories', async () => {
  // Render the HomePage wrapped in Provider and MemoryRouter
  render(
    <Provider store={store}>
      <MemoryRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
        <HomePage />
      </MemoryRouter>
    </Provider>
  );

  // Simulate typing into the search input and clicking the search button
  const input = screen.getByPlaceholderText(/enter github username/i);
  const button = screen.getByRole('button', { name: /search/i });
  fireEvent.change(input, { target: { value: 'example' } });
  fireEvent.click(button);

  // Verify that the correct search label appears
  expect(await screen.findByText(/showing users for "example"/i)).toBeInTheDocument();

  // Check if the user appears in the list
  const userRow = await screen.findByText('example-user');
  expect(userRow).toBeInTheDocument();

  // Click the user row to expand and fetch repos
  fireEvent.click(userRow);

  // Verify that the repository appears after expansion
  expect(await screen.findByText(/Repository 1/)).toBeInTheDocument();
});

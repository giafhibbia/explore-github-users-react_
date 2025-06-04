import { render, screen, fireEvent } from '@testing-library/react'; // Import testing utilities
import { MemoryRouter } from 'react-router-dom'; // Provides routing context for components that use React Router
import SearchInput from './SearchInput'; // Import the component to be tested

// Unit test: verifies that the input renders and triggers the onSearch callback
test('renders input and calls onSearch', () => {
  const onSearchMock = jest.fn(); // Create a mock function to spy on the onSearch call

  render(
    // Wrap the component with MemoryRouter to support useNavigate and useLocation hooks
    <MemoryRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
      <SearchInput onSearch={onSearchMock} isLoading={false} />
    </MemoryRouter>
  );

  // Get the input element using its placeholder text
  const input = screen.getByPlaceholderText(/enter github username/i);

  // Get the search button using its role and accessible name
  const button = screen.getByRole('button', { name: /search/i });

  // Simulate typing "example" into the input field
  fireEvent.change(input, { target: { value: 'example' } });

  // Simulate clicking the search button
  fireEvent.click(button);

  // Assert that the onSearch function was called with the value "example"
  expect(onSearchMock).toHaveBeenCalledWith('example');
});

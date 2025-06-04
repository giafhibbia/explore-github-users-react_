// A search input component that syncs with URL query params and triggers search logic.
import React, { useState, useEffect, ChangeEvent, KeyboardEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface SearchInputProps {
  onSearch: (query: string) => void; // Callback to perform search
  isLoading?: boolean;               // Indicates if search is in progress
  placeholder?: string;              // Optional custom placeholder
}

/**
 * SearchInput Component
 * - Handles user input for GitHub username search
 * - Triggers search on Enter key or button click
 * - Syncs query state with the URL (?q=...)
 */
const SearchInput: React.FC<SearchInputProps> = ({
  onSearch,
  isLoading,
  placeholder = "Enter GitHub username..."
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState<string>('');

  // On first render, extract search term from URL query (?q=...)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlQuery = params.get('q') || '';
    setQuery(urlQuery);
    if (urlQuery.trim()) {
      onSearch(urlQuery.trim()); // Perform initial search if query exists
    }
  }, [location.search, onSearch]);

  // Handle user typing in the input field
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  // If Enter is pressed and input is valid, trigger search
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !isLoading && query.trim()) {
      handleSearch();
    }
  };

  // Trigger search and update the URL with query param
  const handleSearch = () => {
    if (query.trim()) {
      navigate(`?q=${encodeURIComponent(query.trim())}`);
      onSearch(query.trim());
    }
  };

  return (
    <div className="my-4">
      <div className="flex flex-col">
        {/* Text input field for username search */}
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={isLoading}
          aria-label="Search GitHub users"
          className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm
                     focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500
                     dark:bg-gray-50 dark:border-gray-100 dark:placeholder-gray-400 dark:text-gray-700
                     dark:focus:ring-sky-500 dark:focus:border-sky-500
                     disabled:bg-gray-100 dark:disabled:bg-gray-200 disabled:cursor-not-allowed"
        />

        {/* Search button with loading indicator */}
        <button
          onClick={handleSearch}
          disabled={isLoading || !query.trim()}
          className="mt-2 px-6 py-2 bg-sky-500 text-white font-semibold rounded-lg shadow-md
                     hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-75
                     disabled:bg-sky-300 dark:disabled:bg-sky-600 disabled:text-sky-500 dark:disabled:text-sky-200
                     disabled:cursor-not-allowed transition duration-150 ease-in-out"
        >
          {isLoading ? (
            // Spinner while loading
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          ) : 'Search'}
        </button>
      </div>
    </div>
  );
};

export default SearchInput;
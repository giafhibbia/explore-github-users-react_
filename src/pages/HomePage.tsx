import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import {
  searchUsersThunk,
  fetchUserReposThunk,
  toggleUserExpansion,
  resetSearchState,
  clearError as clearGithubError,
} from '../store/github/githubSlice';

import SearchInput from '../components/SearchInput/SearchInput';
import UserList from '../components/UserList/UserList';

/**
 * HomePage - Main GitHub user search & repository viewer page.
 *
 * Features:
 * - Allows users to search GitHub users by username
 * - Displays search results
 * - Enables toggling of user cards to reveal their public repositories
 */
const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Select GitHub-related state from the Redux store
  const {
    users,
    repositories,
    selectedUserLogin,
    isLoadingUsers,
    isLoadingReposForUser,
    error,
    currentSearchTerm,
  } = useSelector((state: RootState) => state.github);

  /**
   * Handle the user search submission.
   * - Resets state if search input is empty
   * - Otherwise triggers user search thunk
   */
  const handleSearchUsers = useCallback((username: string) => {
    if (!username.trim()) {
      dispatch(resetSearchState());
    } else {
      dispatch(clearGithubError());
      dispatch(searchUsersThunk(username));
    }
  }, [dispatch]);

  /**
   * Toggle selected user card and trigger repository fetch if necessary
   */
  const handleToggleUserRepos = useCallback((userLogin: string) => {
    dispatch(toggleUserExpansion(userLogin));
    dispatch(fetchUserReposThunk(userLogin));
  }, [dispatch]);

  return (
    <div className="min-h-screen px-4 py-6 bg-gray-100">
      <div className="max-w-2xl mx-auto w-full bg-white p-4 rounded-lg shadow">
        <h1 className="text-xl font-bold text-center mb-4">
          GitHub Repositories Explorer
        </h1>

        {/* Search input component */}
        <SearchInput onSearch={handleSearchUsers} isLoading={isLoadingUsers} />

        {/* Loading state indicator */}
        {isLoadingUsers && (
          <p className="text-center text-gray-500 mt-4">Loading users...</p>
        )}

        {/* Error display */}
        {error && (
          <p className="text-center text-red-500 mt-4">{error}</p>
        )}

        {/* Display search results if users are found */}
        {!isLoadingUsers && users.length > 0 && currentSearchTerm && (
          <>
            <p className="mb-2 text-sm text-gray-600">
              Showing users for "{currentSearchTerm}"
            </p>
            <UserList
              users={users}
              repositories={repositories}
              selectedUserLogin={selectedUserLogin}
              onToggleUser={handleToggleUserRepos}
              loadingReposForUser={isLoadingReposForUser}
            />
          </>
        )}

        {/* Empty result state */}
        {!isLoadingUsers && users.length === 0 && currentSearchTerm && !error && (
          <p className="text-center text-sm text-gray-500">
            No users found for "{currentSearchTerm}".
          </p>
        )}
      </div>
    </div>
  );
};

export default HomePage;

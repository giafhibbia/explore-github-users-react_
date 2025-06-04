// Redux Toolkit utilities for creating slices and async thunks
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { GitHubUser, GitHubRepo } from '../../interfaces'; // Custom types
import { githubService } from '../../services/githubService'; // API service layer

// Define the state structure for GitHub-related data
interface GithubState {
  users: GitHubUser[];                            // List of searched GitHub users
  repositories: { [userLogin: string]: GitHubRepo[] }; // Repositories mapped by user login
  selectedUserLogin: string | null;              // Currently selected user (expanded to show repos)
  isLoadingUsers: boolean;                       // Loading state for user search
  isLoadingReposForUser: string | null;          // Indicates which user's repos are being loaded
  error: string | null;                          // Error message if an error occurs
  currentSearchTerm: string;                     // Current search term input
}

// Initial state for the GitHub slice
const initialState: GithubState = {
  users: [],
  repositories: {},
  selectedUserLogin: null,
  isLoadingUsers: false,
  isLoadingReposForUser: null,
  error: null,
  currentSearchTerm: '',
};

// Async thunk to search GitHub users
export const searchUsersThunk = createAsyncThunk(
  'github/searchUsers',
  async (username: string, { rejectWithValue }) => {
    if (!username.trim()) return { items: [], searchTerm: '' }; // No input = no result
    try {
      const data = await githubService.searchUsers(username);
      return { items: data.items, searchTerm: username };
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to search users.');
    }
  }
);

// Async thunk to fetch repos for a specific user
export const fetchUserReposThunk = createAsyncThunk(
  'github/fetchUserRepos',
  async (userLogin: string, { rejectWithValue }) => {
    try {
      const repos = await githubService.getUserRepos(userLogin);
      return { userLogin, repos };
    } catch (err: any) {
      return rejectWithValue({
        userLogin,
        message: err.message || 'Failed to fetch repositories.',
      });
    }
  }
);

// GitHub slice definition
const githubSlice = createSlice({
  name: 'github',
  initialState,
  reducers: {
    // Reset all GitHub-related state (used when clearing results)
    resetSearchState: (state) => {
      state.users = [];
      state.repositories = {};
      state.selectedUserLogin = null;
      state.error = null;
      state.currentSearchTerm = '';
      state.isLoadingUsers = false;
      state.isLoadingReposForUser = null;
    },

    // Expand/collapse user's repository list
    toggleUserExpansion: (state, action: PayloadAction<string>) => {
      const userLogin = action.payload;
      state.selectedUserLogin = state.selectedUserLogin === userLogin ? null : userLogin;
    },

    // Clear any existing error messages
    clearError: (state) => {
      state.error = null;
    },
  },

  // Handle async actions using extraReducers
  extraReducers: (builder) => {
    builder
      // Search users
      .addCase(searchUsersThunk.pending, (state, action) => {
        const searchTerm = action.meta.arg;
        if (!searchTerm.trim()) {
          state.isLoadingUsers = false;
          return;
        }

        state.isLoadingUsers = true;
        state.error = null;
        state.currentSearchTerm = searchTerm;
        state.users = [];
        state.repositories = {};
        state.selectedUserLogin = null;
      })
      .addCase(searchUsersThunk.fulfilled, (state, action) => {
        state.isLoadingUsers = false;

        if (action.payload.searchTerm === '') {
          state.users = [];
          state.currentSearchTerm = '';
          state.error = null;
          return;
        }

        state.users = action.payload.items;
        if (action.payload.items.length === 0) {
          state.error = `No users found for "${action.payload.searchTerm}".`;
        }
      })
      .addCase(searchUsersThunk.rejected, (state, action) => {
        state.isLoadingUsers = false;
        state.error = action.payload as string;
        state.users = [];
      })

      // Fetch repositories
      .addCase(fetchUserReposThunk.pending, (state, action) => {
        state.isLoadingReposForUser = action.meta.arg;
        state.error = null;
      })
      .addCase(fetchUserReposThunk.fulfilled, (state, action) => {
        const { userLogin, repos } = action.payload;
        state.repositories[userLogin] = repos;
        state.isLoadingReposForUser = null;
      })
      .addCase(fetchUserReposThunk.rejected, (state, action) => {
        state.isLoadingReposForUser = null;
        const payload = action.payload as { userLogin: string; message: string };
        state.error = payload.message;
      });
  },
});

// Export actions and reducer
export const { resetSearchState, toggleUserExpansion, clearError } = githubSlice.actions;
export default githubSlice.reducer;
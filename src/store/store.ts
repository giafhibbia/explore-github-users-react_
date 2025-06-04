// Import the Redux Toolkit utility to configure the Redux store
import { configureStore } from '@reduxjs/toolkit';

// Import the GitHub slice reducer (adjust the import path if necessary)
import githubReducer from './github/githubSlice'; 

// Configure the Redux store and register all reducers
// In this case, we're registering the 'github' slice reducer
export const store = configureStore({
  reducer: {
    github: githubReducer,
  },
});

// Export the RootState type derived from the store's state
// This is useful for typing useSelector hooks and state access
export type RootState = ReturnType<typeof store.getState>;

// Export the AppDispatch type derived from the store's dispatch function
// This is useful for typing useDispatch hooks
export type AppDispatch = typeof store.dispatch;
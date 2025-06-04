import React from 'react';
import { GitHubUser, GitHubRepo } from '../../interfaces';
import UserListItem from '../UserListItem/UserListItem';

// Define the props accepted by the UserList component
interface UserListProps {
  users: GitHubUser[];  // Array of GitHub users to display
  repositories: {        // Mapping of user login to their repositories
    [userLogin: string]: GitHubRepo[];
  };
  selectedUserLogin: string | null;         // Currently selected/expanded user
  onToggleUser: (userLogin: string) => void; // Callback when a user is toggled
  loadingReposForUser: string | null;        // Username currently being loaded
}

/**
 * UserList - Displays a list of GitHub users.
 * Each user item is expandable to show their public repositories.
 * 
 * Props:
 * - users: Array of GitHubUser objects
 * - repositories: Object mapping each username to their repositories
 * - selectedUserLogin: The currently expanded user's login
 * - onToggleUser: Callback to toggle user expansion
 * - loadingReposForUser: Indicates which user's repos are currently being fetched
 */
const UserList: React.FC<UserListProps> = ({
  users,
  repositories,
  selectedUserLogin,
  onToggleUser,
  loadingReposForUser
}) => {
  return (
    // Render each user as a UserListItem component
    <ul className="user-list space-y-4">
      {users.map(user => (
        <UserListItem
          key={user.id}
          user={user}
          isExpanded={selectedUserLogin === user.login} // Check if this user is expanded
          onToggle={() => onToggleUser(user.login)}     // Handle expansion toggle
          repos={repositories[user.login] || []}        // Pass corresponding repositories
          isLoadingRepos={loadingReposForUser === user.login} // Show loader if fetching repos
        />
      ))}
    </ul>
  );
};

export default UserList;
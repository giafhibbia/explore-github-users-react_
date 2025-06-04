import React from 'react';
import { GitHubUser, GitHubRepo } from '../../interfaces';
import RepoList from '../RepoList/RepoList'; // Displays a list of repositories
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

// Define the props expected by the UserListItem component
interface UserListItemProps {
  user: GitHubUser;             // The GitHub user being displayed
  isExpanded: boolean;          // Whether the user's repo list is expanded
  onToggle: () => void;         // Callback for toggling expansion
  repos: GitHubRepo[];          // Repositories belonging to the user
  isLoadingRepos: boolean;      // Whether the repos are currently being fetched
}

/**
 * UserListItem - Displays a single GitHub user with optional expandable section to show repositories.
 * Props:
 * - user: GitHubUser object to render basic info (avatar, username)
 * - isExpanded: Boolean flag to toggle the repo list visibility
 * - onToggle: Trigger to expand/collapse the repo list
 * - repos: Array of repositories (if already loaded)
 * - isLoadingRepos: Boolean to show loading indicator while fetching repos
 */
const UserListItem: React.FC<UserListItemProps> = ({
  user,
  isExpanded,
  onToggle,
  repos,
  isLoadingRepos
}) => {
  return (
    <li className="border border-gray-300 rounded-lg overflow-hidden bg-white">
      {/* Header section: user avatar, name, and expand/collapse icon */}
      <div
        onClick={onToggle}
        className="flex justify-between items-center p-3 cursor-pointer hover:bg-gray-50"
      >
        <div className="flex items-center space-x-3">
          <img
            src={user.avatar_url}
            alt={`${user.login} avatar`}
            className="w-8 h-8 rounded-full"
          />
          <span className="font-medium text-sm md:text-base">{user.login}</span>
        </div>
        <span className="text-gray-500 text-sm">
          {isExpanded ? <FaChevronUp className="inline" /> : <FaChevronDown className="inline" />}
        </span>
      </div>

      {/* Expandable content section: shows repo list or loading indicator */}
      {isExpanded && (
        <div className="bg-gray-50 px-4 py-2 space-y-2">
          {isLoadingRepos && <p className="text-sm">Loading repositories...</p>}
          {!isLoadingRepos && repos.length === 0 && (
            <p className="text-sm text-gray-500">No public repositories.</p>
          )}
          {!isLoadingRepos && repos.length > 0 && <RepoList repos={repos} />}
        </div>
      )}
    </li>
  );
};

export default UserListItem;
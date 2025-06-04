import React from 'react';
import { GitHubRepo } from '../../interfaces';
import RepoListItem from '../RepoListItem/RepoListItem';

interface RepoListProps {
  repos: GitHubRepo[]; // List of repositories to render
}

// RepoList - renders a list of GitHub repositories using RepoListItem
const RepoList: React.FC<RepoListProps> = ({ repos }) => {
  // If no repositories are available, return null (nothing to render)
  // This fallback can be handled in the parent component (e.g., UserListItem)
  if (repos.length === 0) {
    return null;
  }

  return (
    <ul className="space-y-2">
      {/* Render each repository as a RepoListItem */}
      {repos.map(repo => (
        <RepoListItem key={repo.id} repo={repo} />
      ))}
    </ul>
  );
};

export default RepoList;
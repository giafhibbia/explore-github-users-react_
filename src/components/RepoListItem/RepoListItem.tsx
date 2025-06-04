import React from 'react';
import { GitHubRepo } from '../../interfaces';
import { FaStar } from 'react-icons/fa';

interface RepoListItemProps {
  repo: GitHubRepo; // Repository object containing metadata like name, stars, and description
}

// Single repository item displayed in the user repository list
const RepoListItem: React.FC<RepoListItemProps> = ({ repo }) => {
  return (
    <li>
      <a
        href={repo.html_url} // Link to the actual GitHub repository
        target="_blank" // Open in a new tab
        rel="noopener noreferrer" // Prevent security vulnerability
        className="bg-gray-200 rounded-lg p-3 shadow-sm hover:bg-gray-300 transition flex justify-between items-start"
      >
        {/* Left section: Repository name and description */}
        <div className="flex-1 text-left">
          <h4 className="font-semibold text-sm text-sky-700">
            {/* Repository name or fallback title */}
            {repo.name || 'Repository Title'}
          </h4>
          <p className="text-xs text-gray-600 mt-1">
            {/* Description or fallback message */}
            {repo.description || 'No description available.'}
          </p>
        </div>

        {/* Right section: Star count with icon */}
        <div className="flex items-center gap-1 text-sm font-bold text-gray-700 ml-4">
          <span>{repo.stargazers_count ?? 0}</span>
          <FaStar className="text-yellow-500 h-4 w-4" /> {/* GitHub star icon */}
        </div>
      </a>
    </li>
  );
};

export default RepoListItem;

/**
 * Represents a GitHub user object.
 */
export interface GitHubUser {
  followers: number;       // Total number of followers
  login: string;           // GitHub username
  id: number;              // Unique user ID
  avatar_url: string;      // Avatar image URL
  html_url: string;        // Link to GitHub profile
}

/**
 * Represents a GitHub repository.
 */
export interface GitHubRepo {
  id: number;              // Unique repository ID
  name: string;            // Repository name
  html_url: string;        // Link to GitHub repo
  description: string | null; // Repo description (can be null)
  stargazers_count: number;   // Number of stars
  owner: GitHubUser;          // Owner info (nested)
}

/**
 * Represents the structure of the GitHub Search Users API response.
 */
export interface GitHubUserSearchResponse {
  total_count: number;        // Total number of matching users
  incomplete_results: boolean; // Indicates if results are incomplete
  items: GitHubUser[];         // List of matched users
}
import { GitHubUser, GitHubRepo } from '../interfaces';
import { GITHUB_CONFIG } from '../config/githubConfig';

// Define the expected response structure from GitHub's user search API
interface SearchUsersResponse {
  items: GitHubUser[];
  total_count: number;
}

// Set up headers with authorization token for GitHub API requests
const headers = {
  Authorization: `Bearer ${GITHUB_CONFIG.TOKEN}`,
};

export const githubService = {
  /**
   * Search GitHub users based on a username keyword.
   * - Sends a request to GitHub Search API to retrieve users.
   * - For each user found, it fetches additional details like follower count.
   * - Results are sorted by number of followers and top 5 are returned (shuffled).
   *
   * @param username - GitHub username or keyword
   * @returns A Promise resolving to top 5 GitHub users with most followers
   */
  searchUsers: async (username: string): Promise<SearchUsersResponse> => {
    if (!username.trim()) {
      return { total_count: 0, items: [] };
    }

    const searchUrl = `${GITHUB_CONFIG.BASE_URL}/${GITHUB_CONFIG.SEARCH_PATH}?q=${encodeURIComponent(
      username
    )}+in:login&per_page=10`;

    try {
      const response = await fetch(searchUrl, { headers });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: response.statusText }));
        throw new Error(errorData.message || 'Failed to search users');
      }

      const searchData = await response.json();

      // Fetch detailed follower data for each user
      const usersWithDetails: GitHubUser[] = await Promise.all(
        searchData.items.map(async (user: any) => {
          try {
            const detailRes = await fetch(
              `${GITHUB_CONFIG.BASE_URL}/${GITHUB_CONFIG.USER_PATH}/${user.login}`,
              { headers }
            );
            const detailData = await detailRes.json();
            return {
              ...user,
              followers: detailData.followers,
            };
          } catch {
            return {
              ...user,
              followers: 0,
            };
          }
        })
      );

      // Sort users by follower count (descending)
      const sorted = usersWithDetails.sort((a, b) => (b.followers ?? 0) - (a.followers ?? 0));

      // Select the top 5 users
      const top5 = sorted.slice(0, 5);

      // Shuffle top 5 for random order
      for (let i = top5.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [top5[i], top5[j]] = [top5[j], top5[i]];
      }

      return { total_count: top5.length, items: top5 };
    } catch (error) {
      console.error('Error searching users:', error);
      throw error;
    }
  },

  /**
   * Fetch all public repositories of a GitHub user.
   * - Uses pagination (up to 100 repos per page).
   * - Continues until all repositories are retrieved.
   *
   * @param username - GitHub username to fetch repositories from
   * @returns A Promise resolving to a list of GitHub repositories
   */
  getUserRepos: async (username: string): Promise<GitHubRepo[]> => {
    const allRepos: GitHubRepo[] = [];
    let page = 1;
    const perPage = 100;

    while (true) {
      const res = await fetch(
        `${GITHUB_CONFIG.BASE_URL}/${GITHUB_CONFIG.USER_PATH}/${encodeURIComponent(
          username
        )}/repos?per_page=${perPage}&page=${page}&sort=updated&direction=desc`,
        { headers }
      );

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ message: res.statusText }));
        throw new Error(errorData.message || `Failed to fetch repositories for ${username}`);
      }

      const data: GitHubRepo[] = await res.json();
      allRepos.push(...data);
      if (data.length < perPage) break; // Last page reached
      page++;
    }

    return allRepos;
  },
};

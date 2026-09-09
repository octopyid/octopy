import { defineCachedEventHandler, getQuery, createError } from '#imports';

interface GithubRepoResponse {
  stargazers_count?: number;
  forks_count?: number;
}

// Only allow `owner/repo` slugs so the interpolated API path can't be abused.
const REPO_RE = /^[\w.-]+\/[\w.-]+$/;

export default defineCachedEventHandler(
  async (event) => {
    const query = getQuery(event);
    const repo = query.repo as string;

    if (!repo || !REPO_RE.test(repo)) {
      throw createError({ statusCode: 400, statusMessage: 'Valid repository is required' });
    }

    try {
      const config = useRuntimeConfig(event);
      const headers: Record<string, string> = {
        'User-Agent': 'OctopyID-Portfolio',
      };
      if (config.githubToken) {
        headers.Authorization = `Bearer ${config.githubToken}`;
      }

      const data = await $fetch<GithubRepoResponse>(`https://api.github.com/repos/${repo}`, {
        headers,
      });

      return {
        stars: data.stargazers_count || 0,
        forks: data.forks_count || 0,
      };
    } catch (error) {
      // Return 0 if repo doesn't exist, is private, or rate limited
      return { stars: 0, forks: 0 };
    }
  },
  {
    name: 'github-repo-stats',
    maxAge: 3600, // Cache for 1 hour to prevent API rate limits
    getKey: (event) => {
      const query = getQuery(event);
      return query.repo as string;
    },
  },
);

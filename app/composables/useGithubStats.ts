export interface GithubStats {
  stars: number;
  forks: number;
}

/**
 * Fetch cached GitHub stars/forks for a repository.
 * Enhancement-only: fails silently and renders nothing when unavailable.
 */
export function useGithubStats(repo?: string | null, enabled = true) {
  const stats = ref<GithubStats>({ stars: 0, forks: 0 });

  onMounted(async () => {
    if (!enabled || !repo) return;
    try {
      stats.value = await $fetch<GithubStats>('/api/github-stats', { params: { repo } });
    } catch {
      // Stats are decorative; keep the zero state.
    }
  });

  return stats;
}

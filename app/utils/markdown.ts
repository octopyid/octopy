const ABSOLUTE_URL_RE = /^(https?:|\/\/|data:|#|mailto:)/i;
const ABSOLUTE_LINK_RE = /^(https?:|\/\/|#|mailto:)/i;

function stripRelativePrefix(url: string): string {
  const trimmed = url.trim();
  if (trimmed.startsWith('./')) return trimmed.slice(2);
  if (trimmed.startsWith('/')) return trimmed.slice(1);
  return trimmed;
}

/**
 * Rewrite relative asset/link URLs in remote markdown to absolute URLs.
 * Used for repository READMEs rendered on lab detail pages.
 */
export function resolveMarkdownAssets(content: string, docsUrl: string, repo?: string): string {
  if (!content) return '';
  const rawBase = docsUrl.substring(0, docsUrl.lastIndexOf('/') + 1);
  const repoBase = repo ? `https://github.com/${repo}/blob/main/` : rawBase;

  const toAbsoluteRaw = (url: string): string => {
    if (!url) return url;
    const trimmed = url.trim();
    if (ABSOLUTE_URL_RE.test(trimmed)) return trimmed;
    return `${rawBase}${stripRelativePrefix(trimmed)}`;
  };

  const toAbsoluteLink = (url: string): string => {
    if (!url) return url;
    const trimmed = url.trim();
    if (ABSOLUTE_LINK_RE.test(trimmed)) return trimmed;
    return `${repoBase}${stripRelativePrefix(trimmed)}`;
  };

  let resolved = content;

  // 1. HTML <img> tags: src="..." or src='...'
  resolved = resolved.replace(
    /<img\b([^>]*?)(\bsrc=["'])([^"']+)(["'])([^>]*?)>/gi,
    (_match, before, srcOpen, srcVal, srcClose, after) => {
      return `<img${before}${srcOpen}${toAbsoluteRaw(srcVal)}${srcClose}${after}>`;
    },
  );

  // 2. Markdown images: ![alt](url "title") or ![alt](url)
  resolved = resolved.replace(
    /!\[(.*?)\]\((\S+?)(?:\s+["'](.*?)["'])?\)/g,
    (_match, alt, url, title) => {
      const absUrl = toAbsoluteRaw(url);
      return title ? `![${alt}](${absUrl} "${title}")` : `![${alt}](${absUrl})`;
    },
  );

  // 3. Markdown relative links: [text](url) where url is relative and not an anchor
  resolved = resolved.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => {
    const trimmedUrl = url.trim();
    if (ABSOLUTE_LINK_RE.test(trimmedUrl)) return match;
    return `[${text}](${toAbsoluteLink(trimmedUrl)})`;
  });

  return resolved;
}

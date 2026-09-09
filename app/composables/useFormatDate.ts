export type DateFormatStyle = 'long' | 'short';

/**
 * Shared date formatting for article/project timestamps.
 * Guards against missing or invalid dates (content schema allows `z.any()`).
 */
export function useFormatDate() {
  const toDate = (value: string | Date | undefined | null): Date | null => {
    if (!value) return null;
    const date = value instanceof Date ? value : new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
  };

  const formatDate = (
    value: string | Date | undefined | null,
    style: DateFormatStyle = 'long',
  ): string => {
    const date = toDate(value);
    if (!date) return '';
    return new Intl.DateTimeFormat('en-US', {
      month: style === 'long' ? 'long' : 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  /** ISO string for machine-readable `<time datetime>` attributes. */
  const toIsoDate = (value: string | Date | undefined | null): string | undefined => {
    return toDate(value)?.toISOString();
  };

  return { formatDate, toIsoDate };
}

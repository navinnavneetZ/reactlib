const MINUTE = 60;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;
const MONTH = 30 * DAY;
const YEAR = 365 * DAY;

export const formatRelativeTime = (
  timestamp: Date | string | number,
  now: Date = new Date()
): string => {
  const then = timestamp instanceof Date ? timestamp : new Date(timestamp);
  const diffSec = Math.round((now.getTime() - then.getTime()) / 1000);

  if (Number.isNaN(diffSec)) return '';

  if (diffSec < 0) return 'in the future';
  if (diffSec < 5) return 'just now';
  if (diffSec < MINUTE) return `${diffSec} seconds ago`;
  if (diffSec < 2 * MINUTE) return '1 minute ago';
  if (diffSec < HOUR) return `${Math.floor(diffSec / MINUTE)} minutes ago`;
  if (diffSec < 2 * HOUR) return '1 hour ago';
  if (diffSec < DAY) return `${Math.floor(diffSec / HOUR)} hours ago`;
  if (diffSec < 2 * DAY) return 'yesterday';
  if (diffSec < WEEK) return `${Math.floor(diffSec / DAY)} days ago`;
  if (diffSec < 2 * WEEK) return '1 week ago';
  if (diffSec < MONTH) return `${Math.floor(diffSec / WEEK)} weeks ago`;
  if (diffSec < 2 * MONTH) return '1 month ago';
  if (diffSec < YEAR) return `${Math.floor(diffSec / MONTH)} months ago`;
  if (diffSec < 2 * YEAR) return '1 year ago';
  return `${Math.floor(diffSec / YEAR)} years ago`;
};

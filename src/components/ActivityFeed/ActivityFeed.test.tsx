import React from 'react';
import { render, screen } from '@testing-library/react';
import ActivityFeed from './ActivityFeed';
import { formatRelativeTime } from './formatRelativeTime';

const NOW = new Date('2026-04-29T12:00:00Z');
const minutesAgo = (m: number) => new Date(NOW.getTime() - m * 60 * 1000);

describe('formatRelativeTime', () => {
  it('returns "just now" for very recent timestamps', () => {
    expect(formatRelativeTime(minutesAgo(0), NOW)).toBe('just now');
  });

  it('formats minutes', () => {
    expect(formatRelativeTime(minutesAgo(5), NOW)).toBe('5 minutes ago');
  });

  it('formats single minute as "1 minute ago"', () => {
    expect(formatRelativeTime(minutesAgo(1), NOW)).toBe('1 minute ago');
  });

  it('formats hours', () => {
    expect(formatRelativeTime(minutesAgo(60 * 3), NOW)).toBe('3 hours ago');
  });

  it('formats yesterday', () => {
    expect(formatRelativeTime(minutesAgo(60 * 30), NOW)).toBe('yesterday');
  });

  it('formats days', () => {
    expect(formatRelativeTime(minutesAgo(60 * 24 * 4), NOW)).toBe('4 days ago');
  });

  it('handles future timestamps', () => {
    const future = new Date(NOW.getTime() + 5000);
    expect(formatRelativeTime(future, NOW)).toBe('in the future');
  });

  it('accepts ISO strings and numeric timestamps', () => {
    expect(formatRelativeTime(minutesAgo(5).toISOString(), NOW)).toBe(
      '5 minutes ago'
    );
    expect(formatRelativeTime(minutesAgo(5).getTime(), NOW)).toBe(
      '5 minutes ago'
    );
  });
});

describe('ActivityFeed', () => {
  const items = [
    {
      id: 1,
      description: 'First event',
      timestamp: minutesAgo(2),
    },
    {
      id: 2,
      description: 'Second event',
      timestamp: minutesAgo(60 * 3),
    },
  ];

  it('renders all items', () => {
    render(<ActivityFeed items={items} now={NOW} />);
    expect(screen.getByText('First event')).toBeInTheDocument();
    expect(screen.getByText('Second event')).toBeInTheDocument();
  });

  it('renders relative timestamps', () => {
    render(<ActivityFeed items={items} now={NOW} />);
    expect(screen.getByText('2 minutes ago')).toBeInTheDocument();
    expect(screen.getByText('3 hours ago')).toBeInTheDocument();
  });

  it('renders icons when provided', () => {
    render(
      <ActivityFeed
        now={NOW}
        items={[
          {
            id: 1,
            description: 'with icon',
            timestamp: minutesAgo(1),
            icon: <svg data-testid="feed-icon" />,
          },
        ]}
      />
    );
    expect(screen.getByTestId('feed-icon')).toBeInTheDocument();
  });

  it('shows default empty message when items is empty', () => {
    render(<ActivityFeed items={[]} />);
    expect(screen.getByText('No activity yet.')).toBeInTheDocument();
  });

  it('shows custom empty message', () => {
    render(<ActivityFeed items={[]} emptyMessage="Nothing here." />);
    expect(screen.getByText('Nothing here.')).toBeInTheDocument();
  });

  it('does not show empty message while loading', () => {
    render(<ActivityFeed items={[]} loading />);
    expect(screen.queryByText('No activity yet.')).not.toBeInTheDocument();
  });

  it('does not render items while loading', () => {
    render(<ActivityFeed items={items} loading now={NOW} />);
    expect(screen.queryByText('First event')).not.toBeInTheDocument();
  });
});

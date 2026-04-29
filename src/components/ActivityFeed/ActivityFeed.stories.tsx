import type { Meta, StoryObj } from '@storybook/react';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ActivityFeed from './ActivityFeed';

const meta: Meta<typeof ActivityFeed> = {
  title: 'Components/ActivityFeed',
  component: ActivityFeed,
  tags: ['autodocs'],
  argTypes: {
    loading: { control: 'boolean' },
    emptyMessage: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof ActivityFeed>;

const FIXED_NOW = new Date('2026-04-29T12:00:00Z');
const minutesAgo = (m: number) =>
  new Date(FIXED_NOW.getTime() - m * 60 * 1000);

export const Basic: Story = {
  args: {
    now: FIXED_NOW,
    items: [
      {
        id: 1,
        description: 'New patient registered at City Hospital',
        timestamp: minutesAgo(2),
        icon: <PersonAddIcon />,
        iconColor: '#1976d2',
      },
      {
        id: 2,
        description: 'Facility marked operational: West Clinic',
        timestamp: minutesAgo(45),
        icon: <CheckCircleIcon />,
        iconColor: '#2e7d32',
      },
      {
        id: 3,
        description: 'Bed occupancy crossed 90% at Metro General',
        timestamp: minutesAgo(60 * 3),
        icon: <WarningAmberIcon />,
        iconColor: '#ed6c02',
      },
      {
        id: 4,
        description: 'Daily metrics ingestion completed',
        timestamp: minutesAgo(60 * 26),
        icon: <LocalHospitalIcon />,
      },
    ],
  },
};

export const Empty: Story = {
  args: {
    items: [],
  },
};

export const CustomEmptyMessage: Story = {
  args: {
    items: [],
    emptyMessage: 'No events in the selected window.',
  },
};

export const Loading: Story = {
  args: {
    items: [],
    loading: true,
  },
};

export const Scrollable: Story = {
  args: {
    now: FIXED_NOW,
    maxHeight: 250,
    items: Array.from({ length: 20 }, (_, i) => ({
      id: i,
      description: `Event #${i + 1} happened`,
      timestamp: minutesAgo(i * 15),
      icon: <LocalHospitalIcon />,
    })),
  },
};

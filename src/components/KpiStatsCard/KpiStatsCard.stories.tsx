import type { Meta, StoryObj } from '@storybook/react';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PeopleIcon from '@mui/icons-material/People';
import KpiStatsCard from './KpiStatsCard';

const meta: Meta<typeof KpiStatsCard> = {
  title: 'Components/KpiStatsCard',
  component: KpiStatsCard,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    value: { control: 'text' },
    unit: { control: 'text' },
    delta: { control: { type: 'number', step: 0.1 } },
    deltaSuffix: { control: 'text' },
    loading: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof KpiStatsCard>;

export const Basic: Story = {
  args: {
    title: 'Total Patients',
    value: '12,430',
    delta: 8.2,
  },
};

export const WithUnit: Story = {
  args: {
    title: 'Avg. Wait Time',
    value: 18,
    unit: 'min',
    delta: -3.5,
  },
};

export const WithIconAndStatus: Story = {
  args: {
    title: 'Active Facilities',
    value: 142,
    icon: <LocalHospitalIcon />,
    status: { label: 'Operational', color: 'success' },
    delta: 0,
  },
};

export const WarningStatus: Story = {
  args: {
    title: 'Bed Occupancy',
    value: '94',
    unit: '%',
    icon: <PeopleIcon />,
    status: { label: 'High', color: 'warning' },
    delta: 12.4,
  },
};

export const NegativeDelta: Story = {
  args: {
    title: 'Mortality Rate',
    value: '2.1',
    unit: '%',
    delta: -0.4,
    deltaSuffix: ' pts',
  },
};

export const Loading: Story = {
  args: {
    title: 'Total Revenue',
    value: '—',
    loading: true,
  },
};

export const Grid: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 16,
        maxWidth: 1000,
      }}
    >
      <KpiStatsCard title="Total Patients" value="12,430" delta={8.2} />
      <KpiStatsCard
        title="Avg. Wait Time"
        value={18}
        unit="min"
        delta={-3.5}
      />
      <KpiStatsCard
        title="Active Facilities"
        value={142}
        status={{ label: 'Operational', color: 'success' }}
      />
      <KpiStatsCard
        title="Bed Occupancy"
        value="94"
        unit="%"
        status={{ label: 'High', color: 'warning' }}
        delta={12.4}
      />
    </div>
  ),
};

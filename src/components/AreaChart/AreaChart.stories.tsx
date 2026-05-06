import type { Meta, StoryObj } from '@storybook/react';
import AreaChart from './AreaChart';

const meta: Meta<typeof AreaChart> = {
  title: 'Components/AreaChart',
  component: AreaChart,
  tags: ['autodocs'],
  argTypes: {
    width: { control: { type: 'number', min: 200, max: 1200, step: 50 } },
    height: { control: { type: 'number', min: 100, max: 800, step: 50 } },
    loading: { control: 'boolean' },
    showMarks: { control: 'boolean' },
    xAxisLabel: { control: 'text' },
    yAxisLabel: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof AreaChart>;

export const Basic: Story = {
  args: {
    series: [{ data: [10, 30, 25, 50, 40, 65, 55], label: 'Admissions' }],
    xAxisData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    xAxisLabel: 'Day',
    yAxisLabel: 'Patients',
    width: 600,
    height: 400,
  },
};

export const MultiSeries: Story = {
  args: {
    series: [
      { data: [10, 30, 25, 50, 40, 65, 55], label: 'Inpatient' },
      { data: [5, 20, 15, 35, 28, 45, 38], label: 'Outpatient' },
    ],
    xAxisData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    xAxisLabel: 'Day',
    yAxisLabel: 'Visits',
    width: 600,
    height: 400,
  },
};

export const Stacked: Story = {
  args: {
    series: [
      { data: [10, 30, 25, 50, 40, 65, 55], label: 'Inpatient', stack: 'total' },
      { data: [5, 20, 15, 35, 28, 45, 38], label: 'Outpatient', stack: 'total' },
      { data: [3, 8, 6, 12, 10, 15, 13], label: 'Emergency', stack: 'total' },
    ],
    xAxisData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    xAxisLabel: 'Day',
    yAxisLabel: 'Patients',
    width: 600,
    height: 400,
  },
};

export const FiveYearTrend: Story = {
  args: {
    series: [
      { data: [120, 145, 168, 192, 215], label: 'Total Patients (k)' },
    ],
    xAxisData: ['2021', '2022', '2023', '2024', '2025'],
    xAxisLabel: 'Year',
    yAxisLabel: 'Patients (thousands)',
    width: 600,
    height: 400,
  },
};

export const WithMarks: Story = {
  args: {
    series: [{ data: [2, 5.5, 2, 8.5, 1.5, 5], label: 'Temperature' }],
    xAxisData: [0, 1, 2, 3, 4, 5],
    xAxisLabel: 'Hour',
    yAxisLabel: '°C',
    showMarks: true,
    width: 600,
    height: 400,
  },
};

export const Loading: Story = {
  args: {
    series: [{ data: [10, 30, 25, 50], label: 'Data' }],
    xAxisData: [1, 2, 3, 4],
    loading: true,
    width: 600,
    height: 400,
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import LineChart from './LineChart';

const meta: Meta<typeof LineChart> = {
  title: 'Components/LineChart',
  component: LineChart,
  tags: ['autodocs'],
  argTypes: {
    width: { control: { type: 'number', min: 200, max: 1200, step: 50 } },
    height: { control: { type: 'number', min: 100, max: 800, step: 50 } },
    loading: { control: 'boolean' },
    xAxisLabel: { control: 'text' },
    yAxisLabel: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof LineChart>;

export const Basic: Story = {
  args: {
    series: [{ data: [10, 30, 25, 50, 40, 65, 55], label: 'Sales' }],
    xAxisData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    xAxisLabel: 'Day',
    yAxisLabel: 'Units',
    width: 600,
    height: 400,
  },
};

export const MultiSeries: Story = {
  args: {
    series: [
      { data: [10, 30, 25, 50, 40, 65, 55], label: 'Revenue' },
      { data: [5, 20, 15, 35, 28, 45, 38], label: 'Expenses' },
    ],
    xAxisData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    xAxisLabel: 'Day',
    yAxisLabel: 'Amount ($)',
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

export const NumericXAxis: Story = {
  args: {
    series: [{ data: [2, 5.5, 2, 8.5, 1.5, 5], label: 'Temperature' }],
    xAxisData: [0, 1, 2, 3, 4, 5],
    xAxisLabel: 'Hour',
    yAxisLabel: '°C',
    width: 600,
    height: 400,
  },
};

export const NoAxisLabels: Story = {
  args: {
    series: [{ data: [100, 200, 150, 300, 250], label: 'Visits' }],
    xAxisData: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    width: 600,
    height: 400,
  },
};

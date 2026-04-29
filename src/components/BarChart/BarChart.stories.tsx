import type { Meta, StoryObj } from '@storybook/react';
import BarChart from './BarChart';

const meta: Meta<typeof BarChart> = {
  title: 'Components/BarChart',
  component: BarChart,
  tags: ['autodocs'],
  argTypes: {
    layout: { control: 'radio', options: ['vertical', 'horizontal'] },
    width: { control: { type: 'number', min: 200, max: 1200, step: 50 } },
    height: { control: { type: 'number', min: 100, max: 800, step: 50 } },
    loading: { control: 'boolean' },
    xAxisLabel: { control: 'text' },
    yAxisLabel: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof BarChart>;

export const Vertical: Story = {
  args: {
    series: [{ data: [40, 65, 30, 80, 55], label: 'Sales' }],
    categories: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5'],
    xAxisLabel: 'Quarter',
    yAxisLabel: 'Units',
    layout: 'vertical',
    width: 600,
    height: 400,
  },
};

export const HorizontalTopN: Story = {
  args: {
    series: [{ data: [320, 280, 240, 210, 180, 150, 120, 90, 70, 50], label: 'Cases' }],
    categories: [
      'Disease A',
      'Disease B',
      'Disease C',
      'Disease D',
      'Disease E',
      'Disease F',
      'Disease G',
      'Disease H',
      'Disease I',
      'Disease J',
    ],
    layout: 'horizontal',
    xAxisLabel: 'Cases',
    yAxisLabel: 'Disease',
    width: 700,
    height: 500,
  },
};

export const Grouped: Story = {
  args: {
    series: [
      { data: [40, 65, 30, 80], label: 'Male' },
      { data: [35, 70, 45, 60], label: 'Female' },
    ],
    categories: ['18-30', '31-45', '46-60', '60+'],
    xAxisLabel: 'Age group',
    yAxisLabel: 'Patients',
    layout: 'vertical',
    width: 600,
    height: 400,
  },
};

export const Stacked: Story = {
  args: {
    series: [
      { data: [40, 65, 30, 80], label: 'Male', stack: 'total' },
      { data: [35, 70, 45, 60], label: 'Female', stack: 'total' },
    ],
    categories: ['18-30', '31-45', '46-60', '60+'],
    xAxisLabel: 'Age group',
    yAxisLabel: 'Patients',
    layout: 'vertical',
    width: 600,
    height: 400,
  },
};

export const Loading: Story = {
  args: {
    series: [{ data: [10, 20, 30], label: 'Data' }],
    categories: ['A', 'B', 'C'],
    loading: true,
    width: 600,
    height: 400,
  },
};

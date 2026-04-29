import type { Meta, StoryObj } from '@storybook/react';
import DonutChart from './DonutChart';

const meta: Meta<typeof DonutChart> = {
  title: 'Components/DonutChart',
  component: DonutChart,
  tags: ['autodocs'],
  argTypes: {
    width: { control: { type: 'number', min: 200, max: 800, step: 50 } },
    height: { control: { type: 'number', min: 200, max: 800, step: 50 } },
    innerRadius: { control: { type: 'number', min: 0, max: 200, step: 10 } },
    outerRadius: { control: { type: 'number', min: 50, max: 250, step: 10 } },
    paddingAngle: { control: { type: 'number', min: 0, max: 10, step: 1 } },
    loading: { control: 'boolean' },
    hideLegend: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof DonutChart>;

export const Basic: Story = {
  args: {
    data: [
      { id: 1, value: 40, label: 'Inpatient' },
      { id: 2, value: 30, label: 'Outpatient' },
      { id: 3, value: 20, label: 'Emergency' },
      { id: 4, value: 10, label: 'Other' },
    ],
    width: 400,
    height: 400,
  },
};

export const ThinRing: Story = {
  args: {
    data: [
      { id: 1, value: 60, label: 'Public' },
      { id: 2, value: 40, label: 'Private' },
    ],
    innerRadius: 100,
    outerRadius: 120,
    width: 400,
    height: 400,
  },
};

export const Pie: Story = {
  args: {
    data: [
      { id: 1, value: 25, label: 'A' },
      { id: 2, value: 25, label: 'B' },
      { id: 3, value: 25, label: 'C' },
      { id: 4, value: 25, label: 'D' },
    ],
    innerRadius: 0,
    outerRadius: 140,
    width: 400,
    height: 400,
  },
};

export const NoLegend: Story = {
  args: {
    data: [
      { id: 1, value: 70, label: 'Active' },
      { id: 2, value: 30, label: 'Inactive' },
    ],
    hideLegend: true,
    width: 400,
    height: 400,
  },
};

export const Loading: Story = {
  args: {
    data: [
      { id: 1, value: 50, label: 'A' },
      { id: 2, value: 50, label: 'B' },
    ],
    loading: true,
    width: 400,
    height: 400,
  },
};

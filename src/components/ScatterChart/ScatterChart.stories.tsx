import type { Meta, StoryObj } from '@storybook/react';
import ScatterChart from './ScatterChart';

const meta: Meta<typeof ScatterChart> = {
  title: 'Components/ScatterChart',
  component: ScatterChart,
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
type Story = StoryObj<typeof ScatterChart>;

export const Basic: Story = {
  args: {
    series: [
      {
        label: 'Group A',
        data: [
          { x: 1, y: 2, id: 1 },
          { x: 2, y: 5.5, id: 2 },
          { x: 3, y: 2, id: 3 },
          { x: 4, y: 8.5, id: 4 },
          { x: 5, y: 1.5, id: 5 },
          { x: 6, y: 5, id: 6 },
        ],
      },
    ],
    xAxisLabel: 'X',
    yAxisLabel: 'Y',
    width: 600,
    height: 400,
  },
};

export const MultiSeries: Story = {
  args: {
    series: [
      {
        label: 'Control',
        data: [
          { x: 1, y: 3, id: 'c1' },
          { x: 2, y: 4, id: 'c2' },
          { x: 3, y: 2, id: 'c3' },
          { x: 4, y: 6, id: 'c4' },
        ],
      },
      {
        label: 'Treatment',
        data: [
          { x: 1, y: 5, id: 't1' },
          { x: 2, y: 7, id: 't2' },
          { x: 3, y: 6, id: 't3' },
          { x: 4, y: 9, id: 't4' },
        ],
      },
    ],
    xAxisLabel: 'Dose',
    yAxisLabel: 'Response',
    width: 600,
    height: 400,
  },
};

export const Loading: Story = {
  args: {
    series: [
      {
        label: 'Data',
        data: [
          { x: 1, y: 2, id: 1 },
          { x: 2, y: 4, id: 2 },
        ],
      },
    ],
    loading: true,
    width: 600,
    height: 400,
  },
};

export const NoAxisLabels: Story = {
  args: {
    series: [
      {
        label: 'Points',
        data: [
          { x: 10, y: 20, id: 1 },
          { x: 15, y: 35, id: 2 },
          { x: 20, y: 25, id: 3 },
          { x: 25, y: 45, id: 4 },
        ],
      },
    ],
    width: 600,
    height: 400,
  },
};

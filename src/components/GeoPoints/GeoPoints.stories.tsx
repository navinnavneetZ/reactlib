import type { Meta, StoryObj } from '@storybook/react';
import GeoPoints, { GeoPoint } from './GeoPoints';

const facilities: GeoPoint[] = [
  { id: 1, lat: 19.076, lng: 72.8777, label: 'City General — Mumbai', description: '420 beds · 88% occupancy' },
  { id: 2, lat: 28.6139, lng: 77.209, label: 'Metro Health — Delhi', description: '310 beds · 76% occupancy' },
  { id: 3, lat: 18.5204, lng: 73.8567, label: 'Sunrise Clinic — Pune', description: '90 beds · 64% occupancy' },
  { id: 4, lat: 12.9716, lng: 77.5946, label: 'West Hospital — Bangalore', description: '540 beds · 92% occupancy' },
  { id: 5, lat: 13.0827, lng: 80.2707, label: 'Harbor Medical — Chennai', description: '220 beds · 71% occupancy' },
  { id: 6, lat: 22.5726, lng: 88.3639, label: 'North Central — Kolkata', description: '380 beds · 95% occupancy' },
  { id: 7, lat: 17.385, lng: 78.4867, label: 'Riverside Care — Hyderabad', description: '150 beds · 58% occupancy' },
  { id: 8, lat: 23.0225, lng: 72.5714, label: 'Eastpoint — Ahmedabad', description: '280 beds · 80% occupancy' },
  { id:  9, lat: 20.3,   lng: 85.82, label: 'Eastpoint — Bhubaneswar', description: '280 beds · 80% occupancy'},
];

const meta: Meta<typeof GeoPoints> = {
  title: 'Components/GeoPoints',
  component: GeoPoints,
  tags: ['autodocs'],
  argTypes: {
    points: { table: { disable: true }, control: false },
    variant: { control: 'radio', options: ['marker', 'circle'] },
    zoom: { control: { type: 'number', min: 1, max: 18, step: 1 } },
    height: { control: { type: 'number', min: 200, max: 900, step: 50 } },
    fitBounds: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
  render: (args) => (
    <GeoPoints {...args} points={args.points ?? facilities} />
  ),
};

export default meta;
type Story = StoryObj<typeof GeoPoints>;

export const Basic: Story = {
  args: {
    height: 500,
  },
};

export const CircleMarkers: Story = {
  args: {
    variant: 'circle',
    height: 500,
  },
};

export const ColoredCircles: Story = {
  args: {
    variant: 'circle',
    height: 500,
    fitBounds: true,
  },
  render: (args) => (
    <GeoPoints
      {...args}
      points={facilities.map((f) => ({
        ...f,
        color: (f.description as string).includes('9') ? '#d32f2f' : '#2e7d32',
      }))}
    />
  ),
};

export const SinglePoint: Story = {
  args: {
    height: 400,
    zoom: 12,
  },
  render: (args) => <GeoPoints {...args} points={[facilities[0]]} />,
};

export const ManualCenter: Story = {
  args: {
    center: [22.0, 78.0],
    zoom: 5,
    fitBounds: false,
    height: 500,
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    height: 500,
  },
};

export const Empty: Story = {
  args: {
    height: 400,
  },
  render: (args) => <GeoPoints {...args} points={[]} />,
};

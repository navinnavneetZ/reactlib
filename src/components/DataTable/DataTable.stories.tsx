import type { Meta, StoryObj } from '@storybook/react';
import DataTable, { DataTableColumn } from './DataTable';

interface FacilityRow {
  id: number;
  name: string;
  type: string;
  city: string;
  beds: number;
  occupancy: number;
  status: string;
}

const facilityRows: FacilityRow[] = [
  { id: 1, name: 'City General', type: 'Public', city: 'Mumbai', beds: 420, occupancy: 88, status: 'Operational' },
  { id: 2, name: 'Metro Health', type: 'Private', city: 'Delhi', beds: 310, occupancy: 76, status: 'Operational' },
  { id: 3, name: 'Sunrise Clinic', type: 'Private', city: 'Pune', beds: 90, occupancy: 64, status: 'Operational' },
  { id: 4, name: 'West Hospital', type: 'Public', city: 'Bangalore', beds: 540, occupancy: 92, status: 'Strained' },
  { id: 5, name: 'Harbor Medical', type: 'Private', city: 'Chennai', beds: 220, occupancy: 71, status: 'Operational' },
  { id: 6, name: 'North Central', type: 'Public', city: 'Kolkata', beds: 380, occupancy: 95, status: 'Strained' },
  { id: 7, name: 'Riverside Care', type: 'Private', city: 'Hyderabad', beds: 150, occupancy: 58, status: 'Operational' },
  { id: 8, name: 'Eastpoint', type: 'Public', city: 'Ahmedabad', beds: 280, occupancy: 80, status: 'Operational' },
  { id: 9, name: 'Lakeview', type: 'Private', city: 'Jaipur', beds: 110, occupancy: 49, status: 'Operational' },
  { id: 10, name: 'Hilltop General', type: 'Public', city: 'Lucknow', beds: 350, occupancy: 87, status: 'Operational' },
  { id: 11, name: 'Greenfield', type: 'Private', city: 'Surat', beds: 130, occupancy: 53, status: 'Operational' },
  { id: 12, name: 'Skyline', type: 'Public', city: 'Indore', beds: 270, occupancy: 78, status: 'Operational' },
];

const facilityColumns: DataTableColumn<FacilityRow>[] = [
  { field: 'name', headerName: 'Facility', flex: 1, minWidth: 160 },
  { field: 'type', headerName: 'Type', width: 110 },
  { field: 'city', headerName: 'City', width: 130 },
  { field: 'beds', headerName: 'Beds', type: 'number', width: 100 },
  {
    field: 'occupancy',
    headerName: 'Occupancy',
    type: 'number',
    width: 130,
    valueFormatter: (params) => `${params.value}%`,
  },
  { field: 'status', headerName: 'Status', width: 130 },
];

const meta: Meta<typeof DataTable<FacilityRow>> = {
  title: 'Components/DataTable',
  component: DataTable,
  tags: ['autodocs'],
  argTypes: {
    rows: { table: { disable: true }, control: false },
    columns: { table: { disable: true }, control: false },
    loading: { control: 'boolean' },
    density: { control: 'radio', options: ['compact', 'standard', 'comfortable'] },
    pageSize: { control: { type: 'number', min: 5, max: 100, step: 5 } },
    height: { control: { type: 'number', min: 200, max: 900, step: 50 } },
    checkboxSelection: { control: 'boolean' },
    disablePagination: { control: 'boolean' },
  },
  render: (args) => (
    <DataTable
      {...args}
      rows={args.rows ?? facilityRows}
      columns={args.columns ?? facilityColumns}
    />
  ),
};

export default meta;
type Story = StoryObj<typeof DataTable<FacilityRow>>;

export const Basic: Story = {
  args: {
    height: 500,
  },
};

export const SortedByOccupancy: Story = {
  args: {
    initialSort: [{ field: 'occupancy', sort: 'desc' }],
    height: 500,
  },
};

export const Compact: Story = {
  args: {
    density: 'compact',
    height: 400,
  },
};

export const WithSelection: Story = {
  args: {
    checkboxSelection: true,
    height: 500,
  },
};

export const NoPagination: Story = {
  args: {
    disablePagination: true,
    height: 350,
  },
  render: (args) => (
    <DataTable {...args} rows={facilityRows.slice(0, 5)} columns={facilityColumns} />
  ),
};

export const Loading: Story = {
  args: {
    loading: true,
    height: 400,
  },
  render: (args) => <DataTable {...args} rows={[]} columns={facilityColumns} />,
};

export const Empty: Story = {
  args: {
    height: 300,
  },
  render: (args) => <DataTable {...args} rows={[]} columns={facilityColumns} />,
};

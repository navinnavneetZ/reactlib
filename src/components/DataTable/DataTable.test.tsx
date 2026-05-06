import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DataTable, { DataTableColumn } from './DataTable';

interface Row {
  id: number;
  name: string;
  count: number;
}

const rows: Row[] = [
  { id: 1, name: 'Alpha', count: 30 },
  { id: 2, name: 'Bravo', count: 10 },
  { id: 3, name: 'Charlie', count: 20 },
];

const columns: DataTableColumn<Row>[] = [
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'count', headerName: 'Count', type: 'number', width: 100 },
];

describe('DataTable', () => {
  it('renders column headers', () => {
    render(<DataTable rows={rows} columns={columns} />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Count')).toBeInTheDocument();
  });

  it('renders all row values', () => {
    render(<DataTable rows={rows} columns={columns} />);
    expect(screen.getByText('Alpha')).toBeInTheDocument();
    expect(screen.getByText('Bravo')).toBeInTheDocument();
    expect(screen.getByText('Charlie')).toBeInTheDocument();
  });

  it('shows the no-rows overlay when rows is empty', () => {
    render(<DataTable rows={[]} columns={columns} />);
    expect(screen.getByText(/no rows/i)).toBeInTheDocument();
  });

  it('fires onRowClick with the row data', () => {
    const onRowClick = jest.fn();
    render(<DataTable rows={rows} columns={columns} onRowClick={onRowClick} />);
    fireEvent.click(screen.getByText('Alpha'));
    expect(onRowClick).toHaveBeenCalledTimes(1);
    expect(onRowClick.mock.calls[0][0]).toMatchObject({ id: 1, name: 'Alpha' });
  });

  it('renders checkbox column when checkboxSelection is true', () => {
    render(<DataTable rows={rows} columns={columns} checkboxSelection />);
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes.length).toBeGreaterThan(0);
  });

  it('does not render checkbox column by default', () => {
    render(<DataTable rows={rows} columns={columns} />);
    expect(screen.queryAllByRole('checkbox')).toHaveLength(0);
  });
});

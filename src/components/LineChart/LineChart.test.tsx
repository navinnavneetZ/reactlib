import React from 'react';
import { render, screen } from '@testing-library/react';
import LineChart from './LineChart';

jest.mock('@mui/x-charts/LineChart', () => ({
  LineChart: ({
    series,
    xAxis,
    yAxis,
    width,
    height,
    loading,
  }: {
    series: { data: number[]; label?: string }[];
    xAxis?: { label?: string }[];
    yAxis?: { label?: string }[];
    width: number;
    height: number;
    loading: boolean;
  }) => (
    <div
      data-testid="mui-line-chart"
      data-loading={loading}
      data-width={width}
      data-height={height}
    >
      {series.map((s, i) => (
        <span key={i} data-testid="series-label">
          {s.label}
        </span>
      ))}
      {xAxis?.[0]?.label && (
        <span data-testid="x-axis-label">{xAxis[0].label}</span>
      )}
      {yAxis?.[0]?.label && (
        <span data-testid="y-axis-label">{yAxis[0].label}</span>
      )}
    </div>
  ),
}));

const defaultSeries = [{ data: [10, 20, 30], label: 'Sales' }];
const defaultXAxis = ['Jan', 'Feb', 'Mar'];

describe('LineChart', () => {
  it('renders without crashing', () => {
    render(<LineChart series={defaultSeries} />);
    expect(screen.getByTestId('mui-line-chart')).toBeInTheDocument();
  });

  it('renders series labels', () => {
    render(
      <LineChart
        series={[
          { data: [1, 2, 3], label: 'Revenue' },
          { data: [4, 5, 6], label: 'Expenses' },
        ]}
      />
    );
    expect(screen.getByText('Revenue')).toBeInTheDocument();
    expect(screen.getByText('Expenses')).toBeInTheDocument();
    expect(screen.getAllByTestId('series-label')).toHaveLength(2);
  });

  it('passes xAxisLabel to the chart', () => {
    render(
      <LineChart
        series={defaultSeries}
        xAxisData={defaultXAxis}
        xAxisLabel="Month"
      />
    );
    expect(screen.getByTestId('x-axis-label')).toHaveTextContent('Month');
  });

  it('passes yAxisLabel to the chart', () => {
    render(
      <LineChart
        series={defaultSeries}
        yAxisLabel="Units Sold"
      />
    );
    expect(screen.getByTestId('y-axis-label')).toHaveTextContent('Units Sold');
  });

  it('applies default width and height', () => {
    render(<LineChart series={defaultSeries} />);
    const chart = screen.getByTestId('mui-line-chart');
    expect(chart).toHaveAttribute('data-width', '600');
    expect(chart).toHaveAttribute('data-height', '400');
  });

  it('applies custom width and height', () => {
    render(<LineChart series={defaultSeries} width={800} height={500} />);
    const chart = screen.getByTestId('mui-line-chart');
    expect(chart).toHaveAttribute('data-width', '800');
    expect(chart).toHaveAttribute('data-height', '500');
  });

  it('shows loading state', () => {
    render(<LineChart series={defaultSeries} loading />);
    expect(screen.getByTestId('mui-line-chart')).toHaveAttribute(
      'data-loading',
      'true'
    );
  });

  it('defaults loading to false', () => {
    render(<LineChart series={defaultSeries} />);
    expect(screen.getByTestId('mui-line-chart')).toHaveAttribute(
      'data-loading',
      'false'
    );
  });

  it('does not render axis labels when not provided', () => {
    render(<LineChart series={defaultSeries} />);
    expect(screen.queryByTestId('x-axis-label')).not.toBeInTheDocument();
    expect(screen.queryByTestId('y-axis-label')).not.toBeInTheDocument();
  });

  it('renders with xAxisData but no axis labels', () => {
    render(<LineChart series={defaultSeries} xAxisData={defaultXAxis} />);
    expect(screen.queryByTestId('x-axis-label')).not.toBeInTheDocument();
  });
});

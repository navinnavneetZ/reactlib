import React from 'react';
import { render, screen } from '@testing-library/react';
import BarChart from './BarChart';

jest.mock('@mui/x-charts/BarChart', () => ({
  BarChart: ({
    series,
    xAxis,
    yAxis,
    layout,
    width,
    height,
    loading,
  }: {
    series: { data: number[]; label?: string; stack?: string }[];
    xAxis?: { data?: (number | string)[]; label?: string }[];
    yAxis?: { data?: (number | string)[]; label?: string }[];
    layout: string;
    width: number;
    height: number;
    loading: boolean;
  }) => (
    <div
      data-testid="mui-bar-chart"
      data-layout={layout}
      data-loading={loading}
      data-width={width}
      data-height={height}
    >
      {series.map((s, i) => (
        <span key={i} data-testid="series-label" data-stack={s.stack ?? ''}>
          {s.label}
        </span>
      ))}
      {xAxis?.[0]?.label && (
        <span data-testid="x-axis-label">{xAxis[0].label}</span>
      )}
      {yAxis?.[0]?.label && (
        <span data-testid="y-axis-label">{yAxis[0].label}</span>
      )}
      {xAxis?.[0]?.data && (
        <span data-testid="x-axis-data">{xAxis[0].data.join(',')}</span>
      )}
      {yAxis?.[0]?.data && (
        <span data-testid="y-axis-data">{yAxis[0].data.join(',')}</span>
      )}
    </div>
  ),
}));

const defaultSeries = [{ data: [10, 20, 30], label: 'Sales' }];
const defaultCategories = ['Jan', 'Feb', 'Mar'];

describe('BarChart', () => {
  it('renders without crashing', () => {
    render(<BarChart series={defaultSeries} categories={defaultCategories} />);
    expect(screen.getByTestId('mui-bar-chart')).toBeInTheDocument();
  });

  it('defaults to vertical layout', () => {
    render(<BarChart series={defaultSeries} categories={defaultCategories} />);
    expect(screen.getByTestId('mui-bar-chart')).toHaveAttribute(
      'data-layout',
      'vertical'
    );
  });

  it('puts categories on the x-axis when vertical', () => {
    render(
      <BarChart
        series={defaultSeries}
        categories={defaultCategories}
        xAxisLabel="Month"
        yAxisLabel="Units"
      />
    );
    expect(screen.getByTestId('x-axis-data')).toHaveTextContent('Jan,Feb,Mar');
    expect(screen.getByTestId('x-axis-label')).toHaveTextContent('Month');
    expect(screen.getByTestId('y-axis-label')).toHaveTextContent('Units');
    expect(screen.queryByTestId('y-axis-data')).not.toBeInTheDocument();
  });

  it('puts categories on the y-axis when horizontal', () => {
    render(
      <BarChart
        series={defaultSeries}
        categories={defaultCategories}
        layout="horizontal"
        xAxisLabel="Cases"
        yAxisLabel="Disease"
      />
    );
    expect(screen.getByTestId('y-axis-data')).toHaveTextContent('Jan,Feb,Mar');
    expect(screen.getByTestId('y-axis-label')).toHaveTextContent('Disease');
    expect(screen.getByTestId('x-axis-label')).toHaveTextContent('Cases');
    expect(screen.queryByTestId('x-axis-data')).not.toBeInTheDocument();
  });

  it('renders multiple series for grouped bars', () => {
    render(
      <BarChart
        series={[
          { data: [1, 2, 3], label: 'Male' },
          { data: [4, 5, 6], label: 'Female' },
        ]}
        categories={defaultCategories}
      />
    );
    expect(screen.getAllByTestId('series-label')).toHaveLength(2);
    expect(screen.getByText('Male')).toBeInTheDocument();
    expect(screen.getByText('Female')).toBeInTheDocument();
  });

  it('passes stack key through to series', () => {
    render(
      <BarChart
        series={[
          { data: [1, 2, 3], label: 'M', stack: 'total' },
          { data: [4, 5, 6], label: 'F', stack: 'total' },
        ]}
        categories={defaultCategories}
      />
    );
    const labels = screen.getAllByTestId('series-label');
    expect(labels[0]).toHaveAttribute('data-stack', 'total');
    expect(labels[1]).toHaveAttribute('data-stack', 'total');
  });

  it('applies default width and height', () => {
    render(<BarChart series={defaultSeries} categories={defaultCategories} />);
    const chart = screen.getByTestId('mui-bar-chart');
    expect(chart).toHaveAttribute('data-width', '600');
    expect(chart).toHaveAttribute('data-height', '400');
  });

  it('applies custom width and height', () => {
    render(
      <BarChart
        series={defaultSeries}
        categories={defaultCategories}
        width={800}
        height={500}
      />
    );
    const chart = screen.getByTestId('mui-bar-chart');
    expect(chart).toHaveAttribute('data-width', '800');
    expect(chart).toHaveAttribute('data-height', '500');
  });

  it('shows loading state', () => {
    render(
      <BarChart series={defaultSeries} categories={defaultCategories} loading />
    );
    expect(screen.getByTestId('mui-bar-chart')).toHaveAttribute(
      'data-loading',
      'true'
    );
  });
});

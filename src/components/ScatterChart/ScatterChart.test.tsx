import React from 'react';
import { render, screen } from '@testing-library/react';
import ScatterChart from './ScatterChart';

jest.mock('@mui/x-charts/ScatterChart', () => ({
  ScatterChart: ({
    series,
    xAxis,
    yAxis,
    width,
    height,
    loading,
  }: {
    series: { data: { x: number; y: number; id: number | string }[]; label?: string }[];
    xAxis?: { label?: string }[];
    yAxis?: { label?: string }[];
    width: number;
    height: number;
    loading: boolean;
  }) => (
    <div
      data-testid="mui-scatter-chart"
      data-loading={loading}
      data-width={width}
      data-height={height}
    >
      {series.map((s, i) => (
        <span key={i} data-testid="series-label" data-points={s.data.length}>
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

const defaultSeries = [
  {
    label: 'Sales',
    data: [
      { x: 1, y: 10, id: 1 },
      { x: 2, y: 20, id: 2 },
      { x: 3, y: 30, id: 3 },
    ],
  },
];

describe('ScatterChart', () => {
  it('renders without crashing', () => {
    render(<ScatterChart series={defaultSeries} />);
    expect(screen.getByTestId('mui-scatter-chart')).toBeInTheDocument();
  });

  it('renders series labels', () => {
    render(
      <ScatterChart
        series={[
          { label: 'Revenue', data: [{ x: 1, y: 2, id: 1 }] },
          { label: 'Expenses', data: [{ x: 1, y: 3, id: 2 }] },
        ]}
      />
    );
    expect(screen.getByText('Revenue')).toBeInTheDocument();
    expect(screen.getByText('Expenses')).toBeInTheDocument();
    expect(screen.getAllByTestId('series-label')).toHaveLength(2);
  });

  it('passes xAxisLabel to the chart', () => {
    render(<ScatterChart series={defaultSeries} xAxisLabel="Dose" />);
    expect(screen.getByTestId('x-axis-label')).toHaveTextContent('Dose');
  });

  it('passes yAxisLabel to the chart', () => {
    render(<ScatterChart series={defaultSeries} yAxisLabel="Response" />);
    expect(screen.getByTestId('y-axis-label')).toHaveTextContent('Response');
  });

  it('applies default width and height', () => {
    render(<ScatterChart series={defaultSeries} />);
    const chart = screen.getByTestId('mui-scatter-chart');
    expect(chart).toHaveAttribute('data-width', '600');
    expect(chart).toHaveAttribute('data-height', '400');
  });

  it('applies custom width and height', () => {
    render(<ScatterChart series={defaultSeries} width={800} height={500} />);
    const chart = screen.getByTestId('mui-scatter-chart');
    expect(chart).toHaveAttribute('data-width', '800');
    expect(chart).toHaveAttribute('data-height', '500');
  });

  it('shows loading state', () => {
    render(<ScatterChart series={defaultSeries} loading />);
    expect(screen.getByTestId('mui-scatter-chart')).toHaveAttribute(
      'data-loading',
      'true'
    );
  });

  it('defaults loading to false', () => {
    render(<ScatterChart series={defaultSeries} />);
    expect(screen.getByTestId('mui-scatter-chart')).toHaveAttribute(
      'data-loading',
      'false'
    );
  });

  it('does not render axis labels when not provided', () => {
    render(<ScatterChart series={defaultSeries} />);
    expect(screen.queryByTestId('x-axis-label')).not.toBeInTheDocument();
    expect(screen.queryByTestId('y-axis-label')).not.toBeInTheDocument();
  });

  it('passes point data through to series', () => {
    render(<ScatterChart series={defaultSeries} />);
    expect(screen.getByTestId('series-label')).toHaveAttribute(
      'data-points',
      '3'
    );
  });
});

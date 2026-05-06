import React from 'react';
import { render, screen } from '@testing-library/react';
import AreaChart from './AreaChart';

jest.mock('@mui/x-charts/LineChart', () => ({
  LineChart: ({
    series,
    xAxis,
    yAxis,
    width,
    height,
    loading,
  }: {
    series: {
      data: number[];
      label?: string;
      area?: boolean;
      stack?: string;
      showMark?: boolean;
    }[];
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
        <span
          key={i}
          data-testid="series"
          data-area={s.area}
          data-stack={s.stack ?? ''}
          data-show-mark={s.showMark}
        >
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

const defaultSeries = [{ data: [10, 20, 30], label: 'Visits' }];

describe('AreaChart', () => {
  it('renders without crashing', () => {
    render(<AreaChart series={defaultSeries} />);
    expect(screen.getByTestId('mui-line-chart')).toBeInTheDocument();
  });

  it('marks every series with area=true', () => {
    render(
      <AreaChart
        series={[
          { data: [1, 2, 3], label: 'A' },
          { data: [4, 5, 6], label: 'B' },
        ]}
      />
    );
    const seriesEls = screen.getAllByTestId('series');
    expect(seriesEls).toHaveLength(2);
    seriesEls.forEach((el) => {
      expect(el).toHaveAttribute('data-area', 'true');
    });
  });

  it('disables marks by default', () => {
    render(<AreaChart series={defaultSeries} />);
    expect(screen.getByTestId('series')).toHaveAttribute(
      'data-show-mark',
      'false'
    );
  });

  it('enables marks when showMarks is true', () => {
    render(<AreaChart series={defaultSeries} showMarks />);
    expect(screen.getByTestId('series')).toHaveAttribute(
      'data-show-mark',
      'true'
    );
  });

  it('passes stack key through to series', () => {
    render(
      <AreaChart
        series={[
          { data: [1, 2, 3], label: 'A', stack: 'total' },
          { data: [4, 5, 6], label: 'B', stack: 'total' },
        ]}
      />
    );
    const seriesEls = screen.getAllByTestId('series');
    expect(seriesEls[0]).toHaveAttribute('data-stack', 'total');
    expect(seriesEls[1]).toHaveAttribute('data-stack', 'total');
  });

  it('passes axis labels through', () => {
    render(
      <AreaChart
        series={defaultSeries}
        xAxisLabel="Day"
        yAxisLabel="Count"
      />
    );
    expect(screen.getByTestId('x-axis-label')).toHaveTextContent('Day');
    expect(screen.getByTestId('y-axis-label')).toHaveTextContent('Count');
  });

  it('applies default width and height', () => {
    render(<AreaChart series={defaultSeries} />);
    const chart = screen.getByTestId('mui-line-chart');
    expect(chart).toHaveAttribute('data-width', '600');
    expect(chart).toHaveAttribute('data-height', '400');
  });

  it('shows loading state', () => {
    render(<AreaChart series={defaultSeries} loading />);
    expect(screen.getByTestId('mui-line-chart')).toHaveAttribute(
      'data-loading',
      'true'
    );
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import DonutChart from './DonutChart';

jest.mock('@mui/x-charts/PieChart', () => ({
  PieChart: ({
    series,
    width,
    height,
    loading,
    hideLegend,
  }: {
    series: {
      data: { id: number | string; value: number; label?: string }[];
      innerRadius: number;
      outerRadius: number;
      paddingAngle: number;
    }[];
    width: number;
    height: number;
    loading: boolean;
    hideLegend: boolean;
  }) => {
    const s = series[0];
    return (
      <div
        data-testid="mui-pie-chart"
        data-loading={loading}
        data-hide-legend={hideLegend}
        data-width={width}
        data-height={height}
        data-inner-radius={s.innerRadius}
        data-outer-radius={s.outerRadius}
        data-padding-angle={s.paddingAngle}
      >
        {s.data.map((d) => (
          <span key={d.id} data-testid="slice" data-value={d.value}>
            {d.label}
          </span>
        ))}
      </div>
    );
  },
}));

const defaultData = [
  { id: 1, value: 40, label: 'A' },
  { id: 2, value: 30, label: 'B' },
  { id: 3, value: 30, label: 'C' },
];

describe('DonutChart', () => {
  it('renders without crashing', () => {
    render(<DonutChart data={defaultData} />);
    expect(screen.getByTestId('mui-pie-chart')).toBeInTheDocument();
  });

  it('renders one slice per data entry', () => {
    render(<DonutChart data={defaultData} />);
    expect(screen.getAllByTestId('slice')).toHaveLength(3);
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
    expect(screen.getByText('C')).toBeInTheDocument();
  });

  it('passes slice values through', () => {
    render(<DonutChart data={defaultData} />);
    const slices = screen.getAllByTestId('slice');
    expect(slices[0]).toHaveAttribute('data-value', '40');
    expect(slices[1]).toHaveAttribute('data-value', '30');
  });

  it('applies default radii (donut shape)', () => {
    render(<DonutChart data={defaultData} />);
    const chart = screen.getByTestId('mui-pie-chart');
    expect(chart).toHaveAttribute('data-inner-radius', '60');
    expect(chart).toHaveAttribute('data-outer-radius', '120');
  });

  it('applies custom radii', () => {
    render(<DonutChart data={defaultData} innerRadius={20} outerRadius={80} />);
    const chart = screen.getByTestId('mui-pie-chart');
    expect(chart).toHaveAttribute('data-inner-radius', '20');
    expect(chart).toHaveAttribute('data-outer-radius', '80');
  });

  it('supports pie shape via innerRadius=0', () => {
    render(<DonutChart data={defaultData} innerRadius={0} />);
    expect(screen.getByTestId('mui-pie-chart')).toHaveAttribute(
      'data-inner-radius',
      '0'
    );
  });

  it('applies default width and height', () => {
    render(<DonutChart data={defaultData} />);
    const chart = screen.getByTestId('mui-pie-chart');
    expect(chart).toHaveAttribute('data-width', '400');
    expect(chart).toHaveAttribute('data-height', '400');
  });

  it('applies custom paddingAngle', () => {
    render(<DonutChart data={defaultData} paddingAngle={5} />);
    expect(screen.getByTestId('mui-pie-chart')).toHaveAttribute(
      'data-padding-angle',
      '5'
    );
  });

  it('shows loading state', () => {
    render(<DonutChart data={defaultData} loading />);
    expect(screen.getByTestId('mui-pie-chart')).toHaveAttribute(
      'data-loading',
      'true'
    );
  });

  it('hides legend when hideLegend is set', () => {
    render(<DonutChart data={defaultData} hideLegend />);
    expect(screen.getByTestId('mui-pie-chart')).toHaveAttribute(
      'data-hide-legend',
      'true'
    );
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import KpiStatsCard from './KpiStatsCard';

describe('KpiStatsCard', () => {
  it('renders title and value', () => {
    render(<KpiStatsCard title="Patients" value="1,234" />);
    expect(screen.getByText('Patients')).toBeInTheDocument();
    expect(screen.getByText('1,234')).toBeInTheDocument();
  });

  it('renders unit next to value', () => {
    render(<KpiStatsCard title="Wait" value={18} unit="min" />);
    expect(screen.getByText('18')).toBeInTheDocument();
    expect(screen.getByText('min')).toBeInTheDocument();
  });

  it('renders positive delta with + sign', () => {
    render(<KpiStatsCard title="Sales" value={100} delta={8.2} />);
    expect(screen.getByText('+8.2%')).toBeInTheDocument();
  });

  it('renders negative delta without extra sign', () => {
    render(<KpiStatsCard title="Sales" value={100} delta={-3.5} />);
    expect(screen.getByText('-3.5%')).toBeInTheDocument();
  });

  it('uses custom deltaSuffix', () => {
    render(
      <KpiStatsCard title="Rate" value={2} delta={-0.4} deltaSuffix=" pts" />
    );
    expect(screen.getByText('-0.4 pts')).toBeInTheDocument();
  });

  it('omits delta when not provided', () => {
    render(<KpiStatsCard title="Static" value={50} />);
    expect(screen.queryByText(/[+-]\d/)).not.toBeInTheDocument();
  });

  it('renders status chip with label', () => {
    render(
      <KpiStatsCard
        title="Beds"
        value={94}
        status={{ label: 'High', color: 'warning' }}
      />
    );
    expect(screen.getByText('High')).toBeInTheDocument();
  });

  it('renders icon when provided', () => {
    render(
      <KpiStatsCard
        title="Cards"
        value={1}
        icon={<svg data-testid="kpi-icon" />}
      />
    );
    expect(screen.getByTestId('kpi-icon')).toBeInTheDocument();
  });

  it('hides value, delta, and status when loading', () => {
    render(
      <KpiStatsCard
        title="Loading"
        value="123"
        delta={5}
        status={{ label: 'OK' }}
        loading
      />
    );
    expect(screen.queryByText('123')).not.toBeInTheDocument();
    expect(screen.queryByText('+5%')).not.toBeInTheDocument();
    expect(screen.queryByText('OK')).not.toBeInTheDocument();
  });

  it('still shows the title while loading', () => {
    render(<KpiStatsCard title="Revenue" value="—" loading />);
    expect(screen.getByText('Revenue')).toBeInTheDocument();
  });
});

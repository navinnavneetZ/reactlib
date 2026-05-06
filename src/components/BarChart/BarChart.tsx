import React from 'react';
import { BarChart as MuiBarChart } from '@mui/x-charts/BarChart';

export interface BarChartSeries {
  data: number[];
  label?: string;
  color?: string;
  stack?: string;
}

export interface BarChartProps {
  series: BarChartSeries[];
  categories: (number | string)[];
  layout?: 'vertical' | 'horizontal';
  xAxisLabel?: string;
  yAxisLabel?: string;
  width?: number;
  height?: number;
  loading?: boolean;
}

const BarChart: React.FC<BarChartProps> = ({
  series,
  categories,
  layout = 'vertical',
  xAxisLabel,
  yAxisLabel,
  width = 600,
  height = 400,
  loading = false,
}) => {
  const categoryAxis = {
    data: categories,
    scaleType: 'band' as const,
    label: layout === 'vertical' ? xAxisLabel : yAxisLabel,
  };

  const valueAxisLabel = layout === 'vertical' ? yAxisLabel : xAxisLabel;
  const valueAxis = valueAxisLabel ? [{ label: valueAxisLabel }] : undefined;

  const xAxis = layout === 'vertical' ? [categoryAxis] : valueAxis;
  const yAxis = layout === 'vertical' ? valueAxis : [categoryAxis];

  return (
    <MuiBarChart
      series={series}
      xAxis={xAxis}
      yAxis={yAxis}
      layout={layout}
      width={width}
      height={height}
      loading={loading}
    />
  );
};

export default BarChart;

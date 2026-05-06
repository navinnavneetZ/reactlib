import React from 'react';
import { ScatterChart as MuiScatterChart } from '@mui/x-charts/ScatterChart';

export interface ScatterChartPoint {
  x: number;
  y: number;
  id: number | string;
}

export interface ScatterChartSeries {
  data: ScatterChartPoint[];
  label?: string;
  color?: string;
}

export interface ScatterChartProps {
  series: ScatterChartSeries[];
  xAxisLabel?: string;
  yAxisLabel?: string;
  width?: number;
  height?: number;
  loading?: boolean;
}

const ScatterChart: React.FC<ScatterChartProps> = ({
  series,
  xAxisLabel,
  yAxisLabel,
  width = 600,
  height = 400,
  loading = false,
}) => {
  const xAxis = xAxisLabel ? [{ label: xAxisLabel }] : undefined;
  const yAxis = yAxisLabel ? [{ label: yAxisLabel }] : undefined;

  return (
    <MuiScatterChart
      series={series}
      xAxis={xAxis}
      yAxis={yAxis}
      width={width}
      height={height}
      loading={loading}
    />
  );
};

export default ScatterChart;

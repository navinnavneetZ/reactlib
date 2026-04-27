import React from 'react';
import { LineChart as MuiLineChart } from '@mui/x-charts/LineChart';

export interface LineChartSeries {
  data: number[];
  label?: string;
  color?: string;
}

export interface LineChartProps {
  series: LineChartSeries[];
  xAxisData?: (number | string)[];
  xAxisLabel?: string;
  yAxisLabel?: string;
  width?: number;
  height?: number;
  loading?: boolean;
}

const LineChart: React.FC<LineChartProps> = ({
  series,
  xAxisData,
  xAxisLabel,
  yAxisLabel,
  width = 600,
  height = 400,
  loading = false,
}) => {
  const xAxis = xAxisData
    ? [{ data: xAxisData, scaleType: 'point' as const, label: xAxisLabel }]
    : xAxisLabel
    ? [{ label: xAxisLabel }]
    : undefined;

  const yAxis = yAxisLabel ? [{ label: yAxisLabel }] : undefined;

  return (
    <MuiLineChart
      series={series}
      xAxis={xAxis}
      yAxis={yAxis}
      width={width}
      height={height}
      loading={loading}
    />
  );
};

export default LineChart;

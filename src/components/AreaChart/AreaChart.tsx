import React from 'react';
import { LineChart as MuiLineChart } from '@mui/x-charts/LineChart';

export interface AreaChartSeries {
  data: number[];
  label?: string;
  color?: string;
  stack?: string;
}

export interface AreaChartProps {
  series: AreaChartSeries[];
  xAxisData?: (number | string)[];
  xAxisLabel?: string;
  yAxisLabel?: string;
  width?: number;
  height?: number;
  loading?: boolean;
  showMarks?: boolean;
}

const AreaChart: React.FC<AreaChartProps> = ({
  series,
  xAxisData,
  xAxisLabel,
  yAxisLabel,
  width = 600,
  height = 400,
  loading = false,
  showMarks = false,
}) => {
  const xAxis = xAxisData
    ? [{ data: xAxisData, scaleType: 'point' as const, label: xAxisLabel }]
    : xAxisLabel
    ? [{ label: xAxisLabel }]
    : undefined;

  const yAxis = yAxisLabel ? [{ label: yAxisLabel }] : undefined;

  const areaSeries = series.map((s) => ({
    ...s,
    area: true,
    showMark: showMarks,
  }));

  return (
    <MuiLineChart
      series={areaSeries}
      xAxis={xAxis}
      yAxis={yAxis}
      width={width}
      height={height}
      loading={loading}
    />
  );
};

export default AreaChart;

import React from 'react';
import { PieChart as MuiPieChart } from '@mui/x-charts/PieChart';

export interface DonutChartSlice {
  id: number | string;
  value: number;
  label?: string;
  color?: string;
}

export interface DonutChartProps {
  data: DonutChartSlice[];
  width?: number;
  height?: number;
  innerRadius?: number;
  outerRadius?: number;
  paddingAngle?: number;
  loading?: boolean;
  hideLegend?: boolean;
}

const DonutChart: React.FC<DonutChartProps> = ({
  data,
  width = 400,
  height = 400,
  innerRadius = 60,
  outerRadius = 120,
  paddingAngle = 2,
  loading = false,
  hideLegend = false,
}) => {
  return (
    <MuiPieChart
      series={[
        {
          data,
          innerRadius,
          outerRadius,
          paddingAngle,
        },
      ]}
      width={width}
      height={height}
      loading={loading}
      hideLegend={hideLegend}
    />
  );
};

export default DonutChart;

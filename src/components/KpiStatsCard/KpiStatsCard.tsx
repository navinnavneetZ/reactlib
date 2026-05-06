import React from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography,
  Chip,
  Skeleton,
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

export type KpiStatusColor =
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info';

export interface KpiStatsCardProps {
  title: string;
  value: string | number;
  unit?: string;
  delta?: number;
  deltaSuffix?: string;
  status?: { label: string; color?: KpiStatusColor };
  icon?: React.ReactNode;
  loading?: boolean;
}

const formatDelta = (delta: number, suffix: string) => {
  const sign = delta > 0 ? '+' : '';
  return `${sign}${delta}${suffix}`;
};

const KpiStatsCard: React.FC<KpiStatsCardProps> = ({
  title,
  value,
  unit,
  delta,
  deltaSuffix = '%',
  status,
  icon,
  loading = false,
}) => {
  const deltaColor =
    delta === undefined
      ? undefined
      : delta > 0
      ? 'success.main'
      : delta < 0
      ? 'error.main'
      : 'text.secondary';

  return (
    <Card variant="outlined" sx={{ minWidth: 200 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>
          {icon && (
            <Box color="text.secondary" display="flex" alignItems="center">
              {icon}
            </Box>
          )}
        </Box>

        <Box mt={1} display="flex" alignItems="baseline" gap={0.5}>
          {loading ? (
            <Skeleton width={80} height={40} />
          ) : (
            <>
              <Typography variant="h4" component="div">
                {value}
              </Typography>
              {unit && (
                <Typography variant="body2" color="text.secondary">
                  {unit}
                </Typography>
              )}
            </>
          )}
        </Box>

        <Box mt={1} display="flex" alignItems="center" gap={1}>
          {delta !== undefined && !loading && (
            <Box display="flex" alignItems="center" sx={{ color: deltaColor }}>
              {delta > 0 ? (
                <ArrowUpwardIcon fontSize="small" />
              ) : delta < 0 ? (
                <ArrowDownwardIcon fontSize="small" />
              ) : null}
              <Typography variant="body2" component="span" sx={{ fontWeight: 500 }}>
                {formatDelta(delta, deltaSuffix)}
              </Typography>
            </Box>
          )}
          {status && !loading && (
            <Chip
              label={status.label}
              size="small"
              color={status.color ?? 'default'}
            />
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default KpiStatsCard;

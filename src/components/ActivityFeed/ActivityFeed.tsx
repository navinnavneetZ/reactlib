import React from 'react';
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Skeleton,
  Box,
} from '@mui/material';
import { formatRelativeTime } from './formatRelativeTime';

export interface ActivityFeedItem {
  id: string | number;
  description: React.ReactNode;
  timestamp: Date | string | number;
  icon?: React.ReactNode;
  iconColor?: string;
}

export interface ActivityFeedProps {
  items: ActivityFeedItem[];
  loading?: boolean;
  emptyMessage?: string;
  maxHeight?: number | string;
  now?: Date;
}

const SKELETON_COUNT = 3;

const ActivityFeed: React.FC<ActivityFeedProps> = ({
  items,
  loading = false,
  emptyMessage = 'No activity yet.',
  maxHeight,
  now,
}) => {
  if (loading) {
    return (
      <List dense sx={{ maxHeight, overflowY: maxHeight ? 'auto' : undefined }}>
        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
          <ListItem key={i} alignItems="flex-start">
            <ListItemAvatar>
              <Skeleton variant="circular" width={40} height={40} />
            </ListItemAvatar>
            <ListItemText
              primary={<Skeleton width="60%" />}
              secondary={<Skeleton width="30%" />}
            />
          </ListItem>
        ))}
      </List>
    );
  }

  if (items.length === 0) {
    return (
      <Box p={2}>
        <Typography variant="body2" color="text.secondary">
          {emptyMessage}
        </Typography>
      </Box>
    );
  }

  return (
    <List dense sx={{ maxHeight, overflowY: maxHeight ? 'auto' : undefined }}>
      {items.map((item) => (
        <ListItem key={item.id} alignItems="flex-start">
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: item.iconColor }}>{item.icon}</Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={item.description}
            secondary={formatRelativeTime(item.timestamp, now)}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default ActivityFeed;

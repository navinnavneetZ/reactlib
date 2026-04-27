import React from 'react';
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
  CircularProgress,
} from '@mui/material';

export interface ButtonProps extends Omit<MuiButtonProps, 'variant'> {
  variant?: 'contained' | 'outlined' | 'text';
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  loading = false,
  disabled,
  variant = 'contained',
  startIcon,
  ...rest
}) => {
  return (
    <MuiButton
      variant={variant}
      disabled={disabled || loading}
      startIcon={loading ? <CircularProgress size={16} color="inherit" /> : startIcon}
      {...rest}
    >
      {children}
    </MuiButton>
  );
};

export default Button;

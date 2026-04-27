import type { Meta, StoryObj } from '@storybook/react';
import { Delete, Save } from '@mui/icons-material';
import Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['contained', 'outlined', 'text'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'error', 'warning', 'info', 'success'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'contained',
    color: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'outlined',
    color: 'secondary',
  },
};

export const Text: Story = {
  args: {
    children: 'Text Button',
    variant: 'text',
  },
};

export const Loading: Story = {
  args: {
    children: 'Saving...',
    variant: 'contained',
    loading: true,
  },
};

export const WithIcon: Story = {
  args: {
    children: 'Save',
    variant: 'contained',
    startIcon: <Save />,
  },
};

export const Danger: Story = {
  args: {
    children: 'Delete',
    variant: 'contained',
    color: 'error',
    startIcon: <Delete />,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    variant: 'contained',
    disabled: true,
  },
};

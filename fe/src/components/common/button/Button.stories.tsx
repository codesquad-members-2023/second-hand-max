import type { Meta, StoryObj } from '@storybook/react';
import { ReactComponent as ChevronLeft } from '@assets/chevron-left.svg';
import { Button } from './Button';

const meta: Meta = {
  title: 'Example/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: ['rectangle', 'category', 'text', 'fab'],
      },
      defaultValue: 'rectangle',
    },
    state: {
      control: { type: 'select', options: ['default', 'active'] },
    },
    size: {
      control: { type: 'select', options: ['s', 'l'] },
      defaultValue: 's',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const RectangleDefault: Story = {
  args: {
    variant: 'rectangle',
    state: 'default',
    size: 's',
    children: 'Rectangle Default',
  },
};

export const RectangleActive: Story = {
  args: {
    variant: 'rectangle',
    state: 'active',
    size: 'l',
    children: 'Rectangle Active',
  },
};

export const CategoryDefault: Story = {
  args: {
    variant: 'category',
    state: 'default',
    children: 'Category Default',
  },
};

export const TextWithIcon: Story = {
  args: {
    variant: 'text',
    children: (
      <>
        <ChevronLeft stroke="#000" />
        뒤로
      </>
    ),
  },
};

export const Text: Story = {
  args: {
    variant: 'text',
    children: '닫기',
  },
};

export const FabLarge: Story = {
  args: {
    variant: 'fab',
    size: 'l',
    children: 'FabLarge',
  },
};

export const FabSmall: Story = {
  args: {
    variant: 'fab',
    size: 's',
    children: 'FabSmall',
  },
};

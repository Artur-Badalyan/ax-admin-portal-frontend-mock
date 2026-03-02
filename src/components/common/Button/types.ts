// button.types.ts
import type { ButtonProps } from 'antd';

export type ButtonColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info';

export type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'link';

export type ButtonSize = 'sm' | 'md' | 'lg';

export interface AppButtonProps extends Omit<
  ButtonProps,
  'type' | 'size' | 'danger' | 'color' | 'variant'
> {
  color?: ButtonColor;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

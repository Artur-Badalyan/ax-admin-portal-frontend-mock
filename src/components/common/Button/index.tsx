// Button.tsx
import { Button as AntButton } from 'antd';
import clsx from 'clsx';
import type { AppButtonProps } from './types';
import { useStyles } from './styles';

const SIZE_MAP = {
  sm: 'small',
  md: 'middle',
  lg: 'large',
} as const;

export function Button({
  color = 'primary',
  variant = 'outline',
  size = 'md',
  className,
  ...props
}: AppButtonProps) {
  const { styles } = useStyles();

  type Variant = NonNullable<AppButtonProps['variant']>;
  type Color = NonNullable<AppButtonProps['color']>;

  const variantClasses: Record<Variant, string> = {
    solid: styles.variantSolid,
    outline: styles.variantOutline,
    ghost: styles.variantGhost,
    link: styles.variantLink,
  };

  const colorVariantClasses: Partial<
    Record<Variant, Partial<Record<Color, string>>>
  > = {
    solid: {
      primary: styles.solidPrimary,
      success: styles.solidSuccess,
      warning: styles.solidWarning,
      danger: styles.solidDanger,
      info: styles.solidInfo,
    },
    outline: {
      primary: styles.outlinePrimary,
      success: styles.outlineSuccess,
    },
    ghost: {
      primary: styles.ghostPrimary,
    },
  };

  return (
    <AntButton
      {...props}
      size={SIZE_MAP[size]}
      type={variant === 'solid' ? 'primary' : 'default'}
      danger={color === 'danger'}
      className={clsx(
        styles.button,
        variantClasses[variant],
        colorVariantClasses[variant]?.[color],
        className,
      )}
    />
  );
}

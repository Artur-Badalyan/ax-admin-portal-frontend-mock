import { Typography } from 'antd';

type Props = React.ComponentProps<'span'> & {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
};

const sizeMap: Record<NonNullable<Props['size']>, number> = {
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  '2xl': 22,
  '3xl': 26,
};

export function Text({ size = 'md', style, ...props }: Props) {
  return (
    <Typography.Text style={{ fontSize: sizeMap[size], ...style }} {...props} />
  );
}

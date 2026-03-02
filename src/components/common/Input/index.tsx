import { Input as AntInput, type InputProps as AntInputProps } from 'antd';

type InputProps = AntInputProps & {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'error';
};

export function Input({ size, status, variant, ...props }: InputProps) {
  const mappedSize =
    size === 'sm' ? 'small' : size === 'lg' ? 'large' : 'middle';
  const mappedStatus = variant === 'error' ? 'error' : status;

  return <AntInput size={mappedSize} status={mappedStatus} {...props} />;
}

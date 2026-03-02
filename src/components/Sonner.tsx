import { Toaster as Sonner } from 'sonner';
import type { ToasterProps } from 'sonner';

type CustomToasterProps = ToasterProps;

const Toaster = ({
  position,
  theme,
  className,
  ...props
}: CustomToasterProps) => {
  return (
    <Sonner
      position={position}
      theme={theme}
      className={className}
      {...props}
    />
  );
};

export { Toaster };

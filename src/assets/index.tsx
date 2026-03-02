import React from 'react';
import type { IconProps } from '@/lib/types/icon.type';

import { LoaderCircleIcon } from 'lucide-react';

export const LoaderAnimated: React.FC<IconProps> = ({
  width = 20,
  height = 20,
  className,
  stroke,
  ...props
}) => (
  <LoaderCircleIcon
    size={width}
    className={`${className} text-foreground animate-spin`}
    {...props}
  />
);

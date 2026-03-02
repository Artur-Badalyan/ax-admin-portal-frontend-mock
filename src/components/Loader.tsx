import React from 'react';
import { Spin } from 'antd';
interface LoaderProps {
  className?: string;
  fullscreen?: boolean;
}

export const PageSpinner: React.FC<LoaderProps> = ({
  className = '',
  fullscreen = true,
  ...props
}) => {
  return (
    <div
      style={{
        height: fullscreen ? '100vh' : '50vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      {...props}
    >
      <Spin size="large" {...props} />
    </div>
  );
};

export interface IconProps {
  width?: string | number;
  height?: string | number;
  className?: string;
  fill?: string;
  stroke?: string;
  color?: string;
}

export interface SVGIconProps extends IconProps {
  viewBox?: string;
}

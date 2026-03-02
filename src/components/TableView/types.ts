export interface CustomComponentType {
  data?: Record<string, any>;
  cellItem?: any;
  onIconClick?: (e: React.MouseEvent, values: any) => void;
}
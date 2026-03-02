/* eslint-disable @typescript-eslint/no-explicit-any */
export interface QueryParams {
  search?: {
    value: string;
  };
  limit?: number;
  offset?: number;
  sort?: SortObj;
  [key: string]: any;
}

export interface SortObj {
  field: string;
  order: 'asc' | 'desc';
}

export type TableRowType = any;

export interface TableSource {
  data: any[];
  count: number;
}

export interface TableField {
  id: string;
  label: string;
  sortable?: boolean;
  orderField?: string;
  show?: (params: { currentUser?: any; isUserAdmin?: boolean }) => boolean;
  headAlign?: 'left' | 'center' | 'right';
  textAlign?: 'left' | 'center' | 'right';
  width?: number | string;
  cellPaddingRight?: number;
  cellPaddingLeft?: number;
  type?:
    | 'text'
    | 'customComponent'
    | 'textWithComponent'
    | 'link'
    | 'img'
    | 'bool';
  component?: React.FC<any>;
  translate?: boolean;
  getValue?: (data: any) => string;
  withTooltip?: boolean;
  componentDataName?: string;
  componentTextPath?: string;
  route?: string;
  routeIdKey?: string;
  newTab?: boolean;
  showIcon?: boolean;
}

export interface CommonTableConfig {
  fields: TableField[];
  filterFields?: any[];
  rowsPerPageOptions: number[];
}

export interface TableFilterProps {
  filterFields?: any[];
  filteredParams?: QueryParams;
  onFilterCallback?: (filters: any) => void;
}

export interface ToolbarActionsProps {
  action: string;
  visibleWithoutSelection?: boolean;
  callback: () => void;
  titleView?: boolean;
  label?: string;
}

export interface CommonTableProps {
  tableSource: TableSource;
  tableConfig: CommonTableConfig;
  toolbarActions?: ToolbarActionsProps[];
  filteredParams: QueryParams;
  isSelectable?: boolean;
  selectedRows?: TableRowType[];
  rowUniqueKey?: string;
  emptyMessage?: string;
  withOpenAction?: boolean;
  withEditAction?: boolean;
  withDownloadAction?: boolean;
  withCloneAction?: boolean;
  withRemoveAction?: boolean;
  withPagination?: boolean;
  loading?: boolean;

  openPath?: (row: any) => string;
  handleClickIcon?: (row: any) => void;
  handleOpenAction?: (row: any) => void;
  handleEditAction?: (id: string | number) => void;
  handleDownloadAction?: (id: string | number) => void;
  handleRemoveAction?: (id: string | number) => void;
  setSelectedRows?: (rows: TableRowType[]) => void;
  setFilteredParams: (params: QueryParams) => void;

  onToolbarAction?: (action: string) => void;
  onSearchCallback?: (value: string) => void;
  onFilterCallback?: (filters: any) => void;

  onRowClick?: (row: any) => void;
  getDataOnChange: (params: QueryParams) => void;
}

export interface TableHeadProps {
  sortObj?: SortObj;
  rowCount?: number;
  fields: TableField[];
  filteredParams?: QueryParams;
  tableSelects: number;
  withCheckbox?: boolean;
  withOpenAction?: boolean;
  withEditAction?: boolean;
  withCloneAction?: boolean;
  withRemoveAction?: boolean;
  withDownloadAction?: boolean;
  onRequestSort?: (event: React.MouseEvent<unknown>, property: string) => void;
  handleAllSelected?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface CommonToolbarType {
  searchValue: string;
  filterFields?: any[];
  numSelected: number;
  filteredParams?: QueryParams;
  toolbarActions?: ToolbarActionsProps[];
  onSearchCallback?: (value: string) => void;
  onFilterCallback?: (filters: any) => void;
}

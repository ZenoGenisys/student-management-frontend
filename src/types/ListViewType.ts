export type PaginationType = {
  currentPage: number;
  totalPages: number;
  totalRows: number;
};

export type Row = {
  [key: string]: any;
};

export type CellRender<T = any> = {
  column: ColumnDefsProps<T>;
  row: T;
  rows: T[];
};

export type ColumnDefsProps<T = any> = {
  id: string;
  label: string | React.ReactNode;
  onSort?: (orderBy: string, direction: 'asc' | 'desc') => void;
  sortable?: boolean;
  align?: 'left' | 'right' | 'center';
  width?: string;
  dateFormat?: boolean;
  hidden?: boolean;
  cellRenderer?: ({ column, row, rows }: CellRender<T>) => React.ReactNode;
};

export type ListViewProps<T extends Row = Row> = {
  columns: ColumnDefsProps<T>[];
  rows: T[];
  showCheckbox?: boolean;
  sort?: { orderBy: string; order?: 'asc' | 'desc' } | null;
  handleSort?: (orderBy: string, order?: 'asc' | 'desc') => void;
  onChangeSelectedRows?: (selectedRows: T[]) => void;
  getRowId?: (row: T) => string;
  selectedRows?: T[];
  onSelectedRowsChange?: (selectedRows: T[]) => void;
};

export type GridViewProps<T extends Row = Row> = {
  type: 'STAFF' | 'STUDENT';
  rows: T[];
  onClickEdit?: (id: number) => void;
  onClickDelete?: (id: number) => void;
  onClickView?: (id: number) => void;
};

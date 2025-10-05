export type PaginationType = {
  currentPage: number;
  totalPages: number;
  totalRows: number;
};

export type CellRender<T> = {
  column: ColumnDefsProps<T>;
  row: T;
  rows: T[];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ColumnDefsProps<T = any> = {
  id: string;
  label: string | React.ReactNode;
  onSort?: (orderBy: string, direction: 'asc' | 'desc') => void;
  sortable?: boolean;
  align?: 'left' | 'right' | 'center';
  width?: string;
  cellRenderer?: ({ column, row, rows }: CellRender<T>) => React.ReactNode;
};

export type Row = {
  [key: string]: any;
};

export type ListViewProps<T extends Row = Row> = {
  columns: ColumnDefsProps[];
  rows: T[];
  showCheckbox?: boolean;
  sort?: { orderBy: string; order?: 'asc' | 'desc' } | null;
  handleSort?: (orderBy: string, order?: 'asc' | 'desc') => void;
  onChangeSelectedRows?: (selectedRows: string[]) => void;
  getRowId?: (row: T) => string;
};

export type GridViewProps<T extends Row = Row> = {
  type: 'STAFF' | 'STUDENT';
  rows: T[];
  onClickEdit?: (id: number) => void;
  onClickDelete?: (id: number) => void;
  onClickView?: (id: number) => void;
};

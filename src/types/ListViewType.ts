export type PaginationProps = {
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
  pagination?: PaginationProps;
  page?: number;
  rowsPerPage?: number;
  sort?: { orderBy: string; order?: 'asc' | 'desc' } | null;
  handleRowPerPageChange?: (rowsPerPage: number) => void;
  handleSort?: (orderBy: string, order?: 'asc' | 'desc') => void;
  onChangeSelectedRows?: (selectedRows: string[]) => void;
  handlePageChange?: (page: number) => void;
};

export type GridViewProps<T extends Row = Row> = {
  type: 'STAFF' | 'STUDENT';
  rows: T[];
};

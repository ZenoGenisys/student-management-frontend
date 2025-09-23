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

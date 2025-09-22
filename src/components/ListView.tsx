import React, { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Select,
  MenuItem,
  Checkbox,
  TableSortLabel,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';
import type { ColumnDefsProps, PaginationProps } from '../types';
import { useTheme } from '@mui/material/styles';

type Row = {
  [key: string]: any;
};

type ListViewProps<T extends Row = Row> = {
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

const ListView = <T extends Row = Row>({
  columns,
  rows,
  pagination = {
    currentPage: 1,
    totalPages: 1,
    totalRows: rows.length,
  },
  showCheckbox = true,
  page = 1,
  rowsPerPage = 50,
  sort = null,
  handleRowPerPageChange,
  handleSort,
  onChangeSelectedRows,
  handlePageChange,
}: ListViewProps<T>) => {
  const theme = useTheme();
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  useEffect(() => {
    onChangeSelectedRows?.(selectedRows);
  }, [selectedRows, onChangeSelectedRows]);

  const handleChangeRowsPerPage = useCallback(
    (event: SelectChangeEvent<number>) => {
      const newRowsPerPage = Number(event.target.value);
      handleRowPerPageChange?.(newRowsPerPage);
    },
    [handleRowPerPageChange],
  );

  const handleSelectAllClick = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        const newSelectedRows = rows.map((row) => row.staffId);
        setSelectedRows(newSelectedRows);
        return;
      }
      setSelectedRows([]);
    },
    [rows],
  );

  const handleRowClick = useCallback(
    (staffId: string) => {
      const selectedIndex = selectedRows.indexOf(staffId);
      let newSelectedRows: string[] = [];

      if (selectedIndex === -1) {
        newSelectedRows = newSelectedRows.concat(selectedRows, staffId);
      } else if (selectedIndex === 0) {
        newSelectedRows = newSelectedRows.concat(selectedRows.slice(1));
      } else if (selectedIndex === selectedRows.length - 1) {
        newSelectedRows = newSelectedRows.concat(selectedRows.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelectedRows = newSelectedRows.concat(
          selectedRows.slice(0, selectedIndex),
          selectedRows.slice(selectedIndex + 1),
        );
      }

      setSelectedRows(newSelectedRows);
    },
    [selectedRows],
  );

  const handleRequestSort = useCallback(
    (id: string, order?: 'asc' | 'desc') => {
      handleSort?.(id, order);
    },
    [handleSort],
  );

  const handlePrevPage = useCallback(() => {
    if (page > 0) {
      const newPage = Math.max(page - 1, 0);
      handlePageChange?.(newPage);
    }
  }, [page, handlePageChange]);

  const handleNextPage = useCallback(() => {
    if (page < pagination?.totalPages) {
      const newPage = Math.min(page + 1, pagination?.totalPages);
      handlePageChange?.(newPage);
    }
  }, [page, pagination?.totalPages, handlePageChange]);

  return (
    <Paper
      sx={{
        p: 2,
        borderRadius: 0,
        border: `1px solid ${theme.palette.divider}`,
        borderTop: 'none',
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="body1" color="textSecondary">
            Row Per Page
          </Typography>
          <Select
            size="small"
            value={rowsPerPage}
            onChange={handleChangeRowsPerPage}
          >
            {[25, 50, 75, 100].map((n) => (
              <MenuItem key={n} value={n}>
                {n}
              </MenuItem>
            ))}
          </Select>
          <Typography variant="body1" color="textSecondary">
            Entries
          </Typography>
        </Box>
      </Box>

      {/* Table */}
      <TableContainer>
        <Table
          sx={{
            '& th, & td': {
              borderBottom: '1px solid #e0e0e0', // only horizontal line
            },
          }}
        >
          <TableHead
            sx={{
              bgcolor: '#F9FAFB',
              '& th': {
                fontWeight: 'bold',
                fontSize: '1rem',
              },
            }}
          >
            <TableRow>
              {showCheckbox && (
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    indeterminate={
                      selectedRows.length > 0 &&
                      selectedRows.length < rows.length
                    }
                    checked={selectedRows.length === rows.length}
                    onChange={handleSelectAllClick}
                    inputProps={{
                      'aria-label': 'select all desserts',
                    }}
                  />
                </TableCell>
              )}
              {columns?.map((column) => (
                <TableCell
                  key={`staff-${column.id}`}
                  align={column.align || 'center'}
                  style={{ width: column.width || 'auto', fontWeight: 'bold' }}
                >
                  {column.sortable ? (
                    <TableSortLabel
                      active={sort?.orderBy === column.id}
                      direction={sort?.order}
                      onClick={() => handleRequestSort(column.id, sort?.order)}
                    >
                      {column.label}
                    </TableSortLabel>
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={`staff-${row.staffId}`}
                selected={selectedRows.indexOf(row.staffId) !== -1}
                sx={{ borderBottom: '1px solid #ddd' }}
              >
                {showCheckbox && (
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={selectedRows.indexOf(row.staffId) !== -1}
                      onChange={() => handleRowClick(row.staffId)}
                    />
                  </TableCell>
                )}
                {columns.map((column) => {
                  if (typeof column.cellRenderer === 'function') {
                    return (
                      <TableCell
                        key={column.id}
                        align={column.align || 'center'}
                      >
                        {column.cellRenderer({ column, row, rows })}
                      </TableCell>
                    );
                  }
                  // fallback to default rendering if no cellRenderer provided
                  return (
                    <TableCell key={column.id} align={column.align || 'center'}>
                      {row[column.id]}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box display="flex" justifyContent="flex-end" alignItems="center" mt={2}>
        <Button
          size="large"
          variant="text"
          onClick={handlePrevPage}
          disabled={page === 1}
        >
          Prev
        </Button>
        <Typography mx={1}>
          {page} / {pagination?.totalPages}
        </Typography>
        <Button
          size="large"
          variant="text"
          onClick={handleNextPage}
          disabled={page >= pagination?.totalPages}
        >
          Next
        </Button>
      </Box>
    </Paper>
  );
};

export default ListView;

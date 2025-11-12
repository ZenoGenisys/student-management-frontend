import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  TableSortLabel,
} from '@mui/material';
import type { ListViewProps, Row } from '../types';
import { useTheme } from '@mui/material/styles';
import { useCallback } from 'react';
import { getFormattedDate } from '../utils';

const ListView = <T extends Row = Row>({
  columns,
  rows,
  selectedRows = [],
  showCheckbox = true,
  sort = null,
  handleSort,
  onSelectedRowsChange,
  getRowId = (row: T) => (row as Row).id,
}: ListViewProps<T>) => {
  const theme = useTheme();

  const handleSelectAllClick = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        onSelectedRowsChange?.(rows);
        return;
      }
      onSelectedRowsChange?.([]);
    },
    [rows, onSelectedRowsChange],
  );

  const handleRowClick = useCallback(
    (row: T) => {
      const rowId = getRowId(row);
      const selectedIndex = selectedRows.findIndex((selected) => getRowId(selected) === rowId);
      let newSelectedRows: T[] = [];

      if (selectedIndex === -1) {
        newSelectedRows = newSelectedRows.concat(selectedRows, row);
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

      onSelectedRowsChange?.(newSelectedRows);
    },
    [selectedRows, onSelectedRowsChange, getRowId],
  );

  const handleRequestSort = useCallback(
    (id: string, order?: 'asc' | 'desc') => {
      handleSort?.(id, order);
    },
    [handleSort],
  );

  return (
    <Paper
      sx={{
        borderRadius: 0,
        border: `1px solid ${theme.palette.divider}`,
        borderTop: 'none',
      }}
    >
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
                      selectedRows.length > 0 && selectedRows.length < (rows?.length ?? 0)
                    }
                    checked={(rows?.length ?? 0) > 0 && selectedRows.length === (rows?.length ?? 0)}
                    onChange={handleSelectAllClick}
                    inputProps={{
                      'aria-label': 'select all',
                    }}
                  />
                </TableCell>
              )}
              {columns?.map((column) => (
                <>
                  {!column?.hidden ? (
                    <TableCell
                      key={`column-${column.id}`}
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
                  ) : null}
                </>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={getRowId(row)}
                selected={selectedRows.some((selected) => getRowId(selected) === getRowId(row))}
                sx={{ borderBottom: '1px solid #ddd' }}
              >
                {showCheckbox && (
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={selectedRows.some(
                        (selected) => getRowId(selected) === getRowId(row),
                      )}
                      onChange={() => handleRowClick(row)}
                    />
                  </TableCell>
                )}
                {columns.map((column) => {
                  if (column?.hidden) {
                    return null;
                  }
                  if (typeof column.cellRenderer === 'function') {
                    return (
                      <TableCell key={column.id} align={column.align || 'center'}>
                        {column.cellRenderer({ column, row, rows })}
                      </TableCell>
                    );
                  }
                  // fallback to default rendering if no cellRenderer provided
                  return (
                    <TableCell key={column.id} align={column.align || 'center'}>
                      {column.dateFormat ? getFormattedDate(row[column.id]) : row[column.id]}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ListView;

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
import { useCallback, useEffect, useState } from 'react';

const ListView = <T extends Row = Row>({
  columns,
  rows,
  showCheckbox = true,
  sort = null,
  handleSort,
  onChangeSelectedRows,
  getRowId = (row: T) => (row as Row).id,
}: ListViewProps<T>) => {
  const theme = useTheme();
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  useEffect(() => {
    onChangeSelectedRows?.(selectedRows);
  }, [selectedRows, onChangeSelectedRows]);

  const handleSelectAllClick = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        const newSelectedRows = rows.map((row) => getRowId(row));
        setSelectedRows(newSelectedRows);
        return;
      }
      setSelectedRows([]);
    },
    [rows, getRowId],
  );

  const handleRowClick = useCallback(
    (rowId: string) => {
      const selectedIndex = selectedRows.indexOf(rowId);
      let newSelectedRows: string[] = [];

      if (selectedIndex === -1) {
        newSelectedRows = newSelectedRows.concat(selectedRows, rowId);
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

  return (
    <Paper
      sx={{
        p: 2,
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
                    indeterminate={selectedRows.length > 0 && selectedRows.length < rows.length}
                    checked={selectedRows.length === rows.length}
                    onChange={handleSelectAllClick}
                    inputProps={{
                      'aria-label': 'select all',
                    }}
                  />
                </TableCell>
              )}
              {columns?.map((column) => (
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
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={getRowId(row)}
                selected={selectedRows.indexOf(getRowId(row)) !== -1}
                sx={{ borderBottom: '1px solid #ddd' }}
              >
                {showCheckbox && (
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={selectedRows.indexOf(getRowId(row)) !== -1}
                      onChange={() => handleRowClick(getRowId(row))}
                    />
                  </TableCell>
                )}
                {columns.map((column) => {
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
                      {row[column.id]}
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

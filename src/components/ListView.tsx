import React, { useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Typography,
  Chip,
  Button,
  Select,
  MenuItem,
  Checkbox,
  TableSortLabel,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

// Updated Row type to allow dynamic property access
interface Row {
  admissionNo: string;
  rollNo: string;
  name: string;
  avatar: string;
  gender: string;
  level: string;
  status: string;
  doj: string;
  dob: string;
  [key: string]: string; // Added index signature
}

const rows: Row[] = [
  {
    admissionNo: 'A001',
    rollNo: '101',
    name: 'John Doe',
    avatar: '',
    gender: 'Male',
    level: '1',
    status: 'Active',
    doj: '2022-06-01',
    dob: '2007-05-15',
  },
  {
    admissionNo: 'A002',
    rollNo: '102',
    name: 'Jane Smith',
    avatar: '',
    gender: 'Female',
    level: '1',
    status: 'Inactive',
    doj: '2021-07-10',
    dob: '2007-08-22',
  },
  // Add more sample rows as needed
];

const ListView: React.FC = () => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<string>('admissionNo');

  const handlePrev = () => setPage((p) => Math.max(p - 1, 0));
  const handleNext = () =>
    setPage((p) => Math.min(p + 1, Math.ceil(rows.length / rowsPerPage) - 1));

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>,
  ) => {
    const value = event.target.value;
    if (typeof value === 'number' || typeof value === 'string') {
      setRowsPerPage(parseInt(value as string, 10));
      setPage(0);
    }
  };

  const filteredRows = rows; // No search functionality in this version

  const paginatedRows = filteredRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  const sortedRows = [...paginatedRows].sort((a, b) => {
    if (a[orderBy] < b[orderBy]) {
      return order === 'asc' ? -1 : 1;
    }
    if (a[orderBy] > b[orderBy]) {
      return order === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelectedRows = paginatedRows.map((row) => row.admissionNo);
      setSelectedRows(newSelectedRows);
      return;
    }
    setSelectedRows([]);
  };

  const handleRowClick = (admissionNo: string) => {
    const selectedIndex = selectedRows.indexOf(admissionNo);
    let newSelectedRows: string[] = [];

    if (selectedIndex === -1) {
      newSelectedRows = newSelectedRows.concat(selectedRows, admissionNo);
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
  };

  const handleRequestSort = (property: string) => {
    const isAscending = orderBy === property && order === 'asc';
    setOrder(isAscending ? 'desc' : 'asc');
    setOrderBy(property);
  };

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
          <Typography variant="body1" color="textSecondary">Row Per Page</Typography>
          <Select
            size="small"
            value={rowsPerPage}
            onChange={handleChangeRowsPerPage}
          >
            {[5, 10, 25, 50].map((n) => (
              <MenuItem key={n} value={n}>
                {n}
              </MenuItem>
            ))}
          </Select>
          <Typography variant="body1" color="textSecondary">Entries</Typography>
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
          <TableHead sx={{ bgcolor: '#F9FAFB', '& th': {
            fontWeight: 'bold',
            fontSize: '1rem',
          } }}>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  indeterminate={
                    selectedRows.length > 0 &&
                    selectedRows.length < paginatedRows.length
                  }
                  checked={
                    paginatedRows.length > 0 &&
                    selectedRows.length === paginatedRows.length
                  }
                  onChange={handleSelectAllClick}
                  inputProps={{
                    'aria-label': 'select all desserts',
                  }}
                />
              </TableCell>
              <TableCell align="center">
                <TableSortLabel
                  active={orderBy === 'admissionNo'}
                  direction={orderBy === 'admissionNo' ? order : 'asc'}
                  onClick={() => handleRequestSort('admissionNo')}
                >
                  Admission No
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">
                <TableSortLabel
                  active={orderBy === 'rollNo'}
                  direction={orderBy === 'rollNo' ? order : 'asc'}
                  onClick={() => handleRequestSort('rollNo')}
                >
                  Roll No
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">
                <TableSortLabel
                  active={orderBy === 'name'}
                  direction={orderBy === 'name' ? order : 'asc'}
                  onClick={() => handleRequestSort('name')}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">Gender</TableCell>
              <TableCell align="center">Level</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Date of Join</TableCell>
              <TableCell align="center">DOB</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRows.map((row) => (
              <TableRow
                key={row.admissionNo}
                selected={selectedRows.indexOf(row.admissionNo) !== -1}
                sx={{ borderBottom: '1px solid #ddd' }}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    checked={selectedRows.indexOf(row.admissionNo) !== -1}
                    onChange={() => handleRowClick(row.admissionNo)}
                  />
                </TableCell>
                <TableCell align="center">{row.admissionNo}</TableCell>
                <TableCell align="center">{row.rollNo}</TableCell>
                <TableCell align="center">
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    gap={1}
                  >
                    <Avatar src={row.avatar} />
                    {row.name}
                  </Box>
                </TableCell>
                <TableCell align="center">{row.gender}</TableCell>
                <TableCell align="center">{row.level}</TableCell>
                <TableCell align="center">
                  <Chip
                    label={row.status}
                    color={row.status === 'Active' ? 'success' : 'error'}
                    size="small"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell align="center">{row.doj}</TableCell>
                <TableCell align="center">{row.dob}</TableCell>
                <TableCell align="center">
                  <Button size="small" variant="outlined">
                    Collect Fees
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box display="flex" justifyContent="flex-end" alignItems="center" mt={2}>
        <Button
          size="small"
          variant="text"
          onClick={handlePrev}
          disabled={page === 0}
        >
          Prev
        </Button>
        <Typography mx={1}>{page + 1}</Typography>
        <Button
          size="small"
          variant="text"
          onClick={handleNext}
          disabled={page >= Math.ceil(filteredRows.length / rowsPerPage) - 1}
        >
          Next
        </Button>
      </Box>
    </Paper>
  );
};

export default ListView;

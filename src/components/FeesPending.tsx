import {
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React from 'react';
import Pagination from './Pagination';

const pendingFeesData = [
  { id: '1', name: 'John Doe', totalAmount: 5000, outstanding: 1500 },
  { id: '2', name: 'Jane Smith', totalAmount: 4500, outstanding: 500 },
  { id: '3', name: 'Peter Jones', totalAmount: 6000, outstanding: 2000 },
  { id: '4', name: 'Mary Johnson', totalAmount: 5500, outstanding: 1000 },
  { id: '5', name: 'David Williams', totalAmount: 4800, outstanding: 800 },
  { id: '6', name: 'Emily Brown', totalAmount: 5200, outstanding: 1200 },
  { id: '7', name: 'Michael Davis', totalAmount: 6500, outstanding: 2500 },
  { id: '8', name: 'Sarah Miller', totalAmount: 4900, outstanding: 900 },
  { id: '9', name: 'James Wilson', totalAmount: 5800, outstanding: 1800 },
  { id: '0', name: 'Jessica Moore', totalAmount: 5100, outstanding: 1100 },
];

const FeesPending = () => {
  const theme = useTheme();
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(1);
  };
  return (
    <Card>
      <CardHeader title={<Typography variant="h5">Fees Pending</Typography>} />
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          borderTop: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Pagination
          page={page}
          rowsPerPage={rowsPerPage}
          pagination={{
            currentPage: page,
            totalPages: Math.ceil(pendingFeesData.length / rowsPerPage),
            totalRows: pendingFeesData.length,
          }}
          handlePageChange={handleChangePage}
          handleRowPerPageChange={handleChangeRowsPerPage}
          showSearch={false}
        >
          <TableContainer>
            <Table
              sx={{
                '& th, & td': {
                  borderBottom: '1px solid #e0e0e0',
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
                  <TableCell align="center">ID</TableCell>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Total Amount</TableCell>
                  <TableCell align="center">Total Outstanding</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pendingFeesData
                  .slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row" align="center">
                        {row.id}
                      </TableCell>
                      <TableCell align="center">{row.name}</TableCell>
                      <TableCell align="center">${row.totalAmount.toLocaleString()}</TableCell>
                      <TableCell align="center" sx={{ color: 'error.main', fontWeight: 'bold' }}>
                        ${row.outstanding.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Pagination>
      </CardContent>
    </Card>
  );
};

export default FeesPending;
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import { getAvatarProps } from '../utils/avatar';
import { useState, useMemo } from 'react';
import Pagination from './Pagination';

type FeeData = {
  id: string;
  name: string;
  totalAmount: number;
  outstanding: number;
};

type FeesPendingListProps = {
  data: FeeData[];
};

const FeesPendingList = ({ data }: FeesPendingListProps) => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const paginatedData = useMemo(() => {
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return data.slice(startIndex, endIndex);
  }, [data, page, rowsPerPage]);

  const paginationInfo = useMemo(
    () => ({
      currentPage: page,
      totalRows: data.length,
      totalPages: Math.ceil(data.length / rowsPerPage),
    }),
    [data.length, page, rowsPerPage],
  );

  return (
    <Pagination
      page={page}
      rowsPerPage={rowsPerPage}
      pagination={paginationInfo}
      handlePageChange={setPage}
      handleRowPerPageChange={(value) => {
        setRowsPerPage(value);
        setPage(1);
      }}
      showSearch={false}
    >
      <List disablePadding>
        {paginatedData.map((row, index) => (
          <ListItem
            key={row.id}
            divider={index < paginatedData.length - 1}
            sx={{
              py: 2,
              transition: 'background-color 0.3s',
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          >
            <ListItemAvatar>
              <Avatar {...getAvatarProps(row.name)} />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography variant="subtitle1" fontWeight="bold">
                  {row.name}
                </Typography>
              }
              secondary={`ID: ${row.id} | Total: ₹${row.totalAmount.toLocaleString()}`}
            />
            <Box textAlign="right">
              <Typography variant="body2" color="text.secondary">
                Outstanding
              </Typography>
              <Typography variant="h6" color="error.main" fontWeight="bold">
                ₹{row.outstanding.toLocaleString()}
              </Typography>
            </Box>
          </ListItem>
        ))}
      </List>
    </Pagination>
  );
};

export default FeesPendingList;
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { useCallback } from 'react';
import type { PaginationType } from '../types';
import { Search } from '../components';

type PaginationProps = {
  children: React.ReactNode;
  page: number;
  rowsPerPage: number;
  search?: string;
  pagination?: PaginationType;
  handlePageChange?: (page: number) => void;
  handleRowPerPageChange?: (rowsPerPage: number) => void;
  handleSearch?: (value: string) => void;
};
const Pagination = ({
  search,
  children,
  page = 1,
  rowsPerPage = 50,
  pagination = {
    currentPage: 1,
    totalPages: 1,
    totalRows: 1,
  },
  handleSearch,
  handlePageChange,
  handleRowPerPageChange,
}: PaginationProps) => {
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

  const handleChangeRowsPerPage = useCallback(
    (event: SelectChangeEvent<number>) => {
      const newRowsPerPage = Number(event.target.value);
      handleRowPerPageChange?.(newRowsPerPage);
    },
    [handleRowPerPageChange],
  );
  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
        <Box display="flex" alignItems="center" flexWrap={'wrap'} gap={1}>
          <Typography variant="body1" color="textSecondary">
            Row Per Page
          </Typography>
          <Select size="small" value={rowsPerPage} onChange={handleChangeRowsPerPage}>
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
        <Search search={search} onChange={handleSearch} />
      </Box>
      {children}
      <Box display="flex" justifyContent="flex-end" alignItems="center" mt={2}>
        <Button size="large" variant="text" onClick={handlePrevPage} disabled={page === 1}>
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
    </>
  );
};

export default Pagination;

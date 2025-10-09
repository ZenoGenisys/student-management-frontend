import { Box, Button, Typography } from '@mui/material';
import ListView from '../../components/ListView';
import { useStaffSalary } from '../../hooks';
import { MenuCell, Pagination } from '../../components';
import type { CellRender, ColumnDefsProps, StaffSalaryType } from '../../types';
import { useMemo } from 'react';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

const StaffSalaryTab = () => {
  const {
    data,
    search,
    sort,
    page,
    rowsPerPage,
    handleSearch,
    handlePageChange,
    handleSort,
    handleRowPerPageChange,
    handleEdit,
    handleDelete,
  } = useStaffSalary();

  const Column = useMemo<ColumnDefsProps[]>(
    () => [
      { id: 'feesId', label: 'Fees ID', sortable: true },
      { id: 'salaryFor', label: 'Salary For', sortable: true },
      { id: 'date', label: 'Date', sortable: true },
      { id: 'mode', label: 'Mode', sortable: true },
      { id: 'amount', label: 'Net Salary', sortable: true },
      {
        id: 'actions',
        label: 'Action',
        sortable: false,
        cellRenderer: (cellProps: CellRender<StaffSalaryType>) => (
          <MenuCell
            id={cellProps.row?.feesId}
            onClickEdit={handleEdit}
            onClickDelete={handleDelete}
          />
        ),
      },
    ],
    [handleDelete, handleEdit],
  );

  return (
    <Box>
      <Box
        display={'flex'}
        flexWrap={'wrap'}
        alignItems={'center'}
        justifyContent={'space-between'}
        p={2}
        mb={2}
        sx={{ bgcolor: '#fff', border: '1px solid #E3E8EE' }}
      >
        <Typography
          sx={{
            fontWeight: 'bold',
            fontSize: 16,
            pb: { xs: '10px', sm: '0px', md: '0px', lg: '0px', xl: '0px' },
          }}
        >
          Staff Salary
        </Typography>
        <Box display={'flex'} alignItems={'center'} gap={2}>
          <Typography>Last Updated on: 25 Oct 2025</Typography>
          <Button variant="contained" color='primary' startIcon={<AddCircleOutlineOutlinedIcon />}>
            Add Salary
          </Button>
        </Box>
      </Box>
      <Pagination
        page={page}
        pagination={data?.pagination}
        rowsPerPage={rowsPerPage}
        search={search as string | undefined}
        handleSearch={handleSearch}
        handlePageChange={handlePageChange}
        handleRowPerPageChange={handleRowPerPageChange}
      >
        <Box flexGrow={1}>
          <ListView
            columns={Column}
            rows={data?.data ?? []}
            sort={sort}
            showCheckbox={false}
            handleSort={handleSort}
            getRowId={(row) => row.feesId.toString()}
          />
        </Box>
      </Pagination>
    </Box>
  );
};

export default StaffSalaryTab;

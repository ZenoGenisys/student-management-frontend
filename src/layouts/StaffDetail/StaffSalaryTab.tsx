import { Box, Paper } from '@mui/material';
import ListView from '../../components/ListView';
import { useStaffSalary } from '../../hooks';
import { MenuCell, NameCell, Pagination } from '../../components';
import type { CellRender, ColumnDefsProps, StaffSalaryType } from '../../types';
import { useMemo } from 'react';
import GridView from '../../components/GridView';
import { GridFilter } from '../common';

const StaffSalaryTab = () => {
  const {
    data,
    activeView,
    search,
    sort,
    page,
    rowsPerPage,
    handleSearch,
    handleViewToggle,
    handlePageChange,
    handleSort,
    handleRowPerPageChange,
    handleGridSort,
  } = useStaffSalary();

  const Column = useMemo<ColumnDefsProps[]>(
    () => [
      { id: 'feesId', label: 'Fees ID', sortable: true },
      {
        id: 'name',
        label: 'Name',
        sortable: true,
        cellRenderer: NameCell,
        align: 'left' as const,
      },
      { id: 'email', label: 'Email', sortable: true },
      { id: 'mode', label: 'Mode', sortable: true },
      { id: 'date', label: 'Date', sortable: true },
      { id: 'amount', label: 'Amount', sortable: true },
      {
        id: 'actions',
        label: 'Action',
        sortable: false,
        cellRenderer: (cellProps: CellRender<StaffSalaryType>) => (
          <MenuCell id={cellProps.row?.staffId} />
        ),
      },
    ],
    [],
  );

  return (
    <Paper>
      <Box
        flexGrow={1}
        display={'flex'}
        justifyContent="space-between"
        alignItems="center"
        padding={2}
        sx={{ border: '1px solid #E3E8EE', backgroundColor: '#E9EDF4' }}
      >
        <GridFilter
          title="Staff Salary"
          activeView={activeView}
          search={search as string | undefined}
          handleViewToggle={handleViewToggle}
          handleSearch={handleSearch}
          handleSortChange={handleGridSort}
        />
      </Box>
      <Pagination
        page={page}
        pagination={data?.pagination}
        rowsPerPage={rowsPerPage}
        handlePageChange={handlePageChange}
        handleRowPerPageChange={handleRowPerPageChange}
      >
        <Box flexGrow={1}>
          {activeView === 'grid' ? (
            <GridView type="STAFF" rows={data?.data ?? []} />
          ) : (
            <ListView
              columns={Column}
              rows={data?.data ?? []}
              sort={sort}
              showCheckbox={false}
              handleSort={handleSort}
              getRowId={(row) => row.staffId.toString()}
            />
          )}
        </Box>
      </Pagination>
    </Paper>
  );
};

export default StaffSalaryTab;

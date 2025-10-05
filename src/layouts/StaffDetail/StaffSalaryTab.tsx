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
    <Box>
      <Box
        flexGrow={1}
        display={'flex'}
        justifyContent="space-between"
        alignItems="center"
      >
        <GridFilter
          title="Staff Salary"
          activeView={activeView}
          handleViewToggle={handleViewToggle}
          handleSortChange={handleGridSort}
        />
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
    </Box>
  );
};

export default StaffSalaryTab;

import Box from '@mui/material/Box';
import React from 'react';
import GridView from '../components/GridView';
import ListView from '../components/ListView';
import { useStaff } from '../hooks';
import { GridFilter, GridHeader } from '../layouts';
import { ActionCell, NameCell, StatusCell } from '../components';

const Column = [
  { id: 'staffId', label: 'Staff ID', sortable: true },
  {
    id: 'name',
    label: 'Name',
    sortable: true,
    cellRenderer: NameCell,
    align: 'left' as const,
  },
  { id: 'gender', label: 'Gender', sortable: true },
  { id: 'workLocation', label: 'Center', sortable: true },
  { id: 'qualification', label: 'Qualification', sortable: true },
  {
    id: 'status',
    label: 'Status',
    sortable: true,
    cellRenderer: StatusCell,
  },
  { id: 'joiningDate', label: 'Date of Joining', sortable: true },
  {
    id: 'actions',
    label: 'Action',
    sortable: false,
    cellRenderer: ActionCell,
  },
];

const Staff: React.FC = () => {
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
  } = useStaff();

  return (
    <Box display="flex" flexDirection="column">
      <GridHeader title="Staff" />
      <GridFilter
        title="Staff"
        activeView={activeView}
        search={search}
        handleViewToggle={handleViewToggle}
        handleSearch={handleSearch}
        handleSortChange={handleGridSort}
      />
      <Box flexGrow={1}>
        {activeView === 'grid' ? (
          <GridView type="STAFF" rows={data?.staffData ?? []} />
        ) : (
          <ListView
            columns={Column}
            rows={data?.staffData ?? []}
            page={page}
            rowsPerPage={rowsPerPage}
            sort={sort}
            showCheckbox={false}
            pagination={data?.pagination}
            handleSort={handleSort}
            handleRowPerPageChange={handleRowPerPageChange}
            handlePageChange={handlePageChange}
          />
        )}
      </Box>
    </Box>
  );
};

export default Staff;

import Box from '@mui/material/Box';
import React from 'react';
import GridView from '../../components/GridView';
import ListView from '../../components/ListView';
import { useStudent } from '../../hooks';
import { GridFilter, GridHeader } from '../../layouts';
import { NameCell, StatusCell } from '../../components';

const Column = [
  { id: 'studentId', label: 'Student ID', sortable: true },
  {
    id: 'name',
    label: 'Name',
    sortable: true,
    cellRenderer: NameCell,
    align: 'left' as const,
  },
  { id: 'gender', label: 'Gender', sortable: true },
  { id: 'age', label: 'Age', sortable: true },
  { id: 'schoolName', label: 'School Name', sortable: true },
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
    // cellRenderer: ActionCell, // Removed due to type incompatibility
  },
];

const Student: React.FC = () => {
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
  } = useStudent();

  return (
    <Box display="flex" flexDirection="column">
      <GridHeader title="Student" />
      <GridFilter
        title="Student"
        activeView={activeView}
        search={search}
        handleViewToggle={handleViewToggle}
        handleSearch={handleSearch}
        handleSortChange={handleGridSort}
      />
      <Box flexGrow={1}>
        {activeView === 'grid' ? (
          <GridView type="STUDENT" rows={data?.data ?? []} />
        ) : (
          <ListView
            columns={Column}
            rows={data?.data ?? []}
            page={page}
            rowsPerPage={rowsPerPage}
            sort={sort}
            pagination={data?.pagination}
            handleSort={handleSort}
            handleRowPerPageChange={handleRowPerPageChange}
            handlePageChange={handlePageChange}
            getRowId={(row) => row.studentId.toString()}
          />
        )}
      </Box>
    </Box>
  );
};

export default Student;

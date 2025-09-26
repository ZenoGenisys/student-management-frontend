import Box from '@mui/material/Box';
import React, { useMemo } from 'react';
import GridView from '../../components/GridView';
import ListView from '../../components/ListView';
import { useStaff } from '../../hooks';
import { GridFilter, GridHeader } from '../../layouts';
import { ActionCell, NameCell, StatusCell } from '../../components';
import type { ColumnDefsProps } from '../../types';

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
    handleEdit,
    handleDelete,
    handleView,
    handleAddStaff,
  } = useStaff();

  const Column = useMemo<ColumnDefsProps[]>(
    () => [
      { id: 'staffId', label: 'Staff ID', sortable: true },
      {
        id: 'name',
        label: 'Name',
        sortable: true,
        cellRenderer: NameCell as (props: any) => React.ReactNode,
        align: 'left' as const,
      },
      { id: 'gender', label: 'Gender', sortable: true },
      { id: 'center', label: 'Center', sortable: true },
      { id: 'level', label: 'Level', sortable: true },
      { id: 'qualification', label: 'Qualification', sortable: true },
      {
        id: 'status',
        label: 'Status',
        sortable: true,
        cellRenderer: StatusCell as (props: any) => React.ReactNode,
      },
      { id: 'joiningDate', label: 'Date of Joining', sortable: true },
      {
        id: 'actions',
        label: 'Action',
        sortable: false,
        cellRenderer: (cellProps: any) => (
          <ActionCell
            {...cellProps}
            onClickEdit={handleEdit}
            onClickDelete={handleDelete}
            onClickView={handleView}
          />
        ),
      },
    ],
    [handleEdit, handleDelete, handleView],
  );

  return (
    <Box display="flex" flexDirection="column">
      <GridHeader title="Staff" onClickAdd={handleAddStaff} />
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
          <GridView type="STAFF" rows={data?.data ?? []} />
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
            getRowId={(row) => row.staffId.toString()}
          />
        )}
      </Box>
    </Box>
  );
};

export default Staff;

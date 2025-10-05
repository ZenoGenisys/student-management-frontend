import Box from '@mui/material/Box';
import React, { useMemo } from 'react';
import GridView from '../../components/GridView';
import ListView from '../../components/ListView';
import { useStaff } from '../../hooks';
import { GridFilter, GridHeader } from '../../layouts';
import { ActionCell, NameCell, Pagination, StatusCell } from '../../components';
import type { CellRender, ColumnDefsProps, StaffType } from '../../types';

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
        cellRenderer: NameCell,
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
        cellRenderer: StatusCell,
      },
      { id: 'joiningDate', label: 'Date of Joining', sortable: true },
      {
        id: 'actions',
        label: 'Action',
        sortable: false,
        cellRenderer: (cellProps: CellRender<StaffType>) => (
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
        handleViewToggle={handleViewToggle}
        handleSortChange={handleGridSort}
      />
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
            <GridView
              type="STAFF"
              rows={data?.data ?? []}
              onClickEdit={handleEdit}
              onClickDelete={handleDelete}
              onClickView={handleView}
            />
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

export default Staff;

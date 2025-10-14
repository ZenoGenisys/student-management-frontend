import Box from '@mui/material/Box';
import React, { useMemo } from 'react';
import GridView from '../../components/GridView';
import ListView from '../../components/ListView';
import { useStudent } from '../../hooks';
import { GridFilter, GridHeader } from '../../layouts';
import { ActionCell, NameCell, Pagination, StatusCell } from '../../components';
import type { CellRender, ColumnDefsProps, StudentType } from '../../types';
import { PATH } from '../../routes';

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
    handleEdit,
    handleDelete,
    handleView,
    handleAdd,
  } = useStudent();

  const Column = useMemo<ColumnDefsProps[]>(
    () => [
      { id: 'studentId', label: 'Student ID', sortable: true },
      {
        id: 'name',
        label: 'Name',
        sortable: true,
        cellRenderer: (cellProps: CellRender<StudentType>) => (
          <NameCell
            name={cellProps.row.name}
            redirectionUrl={PATH.STUDENT_DETAILS.replace(
              ':studentId',
              String(cellProps.row.studentId),
            )}
          />
        ),
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
      { id: 'joiningDate', label: 'Date of Joining', sortable: true, dateFormat: true },
      {
        id: 'actions',
        label: 'Action',
        sortable: false,
        cellRenderer: (cellProps: CellRender<StudentType>) => (
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
      <GridHeader title="Student" onClickAdd={handleAdd} />
      <GridFilter
        title="Student"
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
              type="STUDENT"
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
              getRowId={(row) => row.studentId.toString()}
            />
          )}
        </Box>
      </Pagination>
    </Box>
  );
};

export default Student;

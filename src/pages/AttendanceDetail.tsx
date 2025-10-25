import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Paper, ToggleButtonGroup, ToggleButton, styled, Chip } from '@mui/material';
import moment from 'moment';
import ListView from '../components/ListView';
import { useAttendanceDetails } from '../hooks';
import DeleteConfirmation from '../components/DeleteConfirmation';
import AttendanceModal from '../layouts/AttendanceDetails/AttendanceModal';
import AttendanceActions from '../layouts/AttendanceDetails/AttendanceActions';
import { AttendanceLayout } from '../layouts';
import type { StaffAttendanceDay, StudentAttendanceDay, AttendanceStatus } from '../types';

const isStudentAttendance = (
  item: StudentAttendanceDay | StaffAttendanceDay,
): item is StudentAttendanceDay => 'studentId' in item;

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  '& .MuiToggleButton-root': {
    '&.Mui-selected': {
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.primary.light,
      '&:hover': {
        backgroundColor: theme.palette.primary.light,
      },
    },
  },
}));

const AttendanceDetail: React.FC = () => {
  const { date: paramDate } = useParams<{ date: string }>();

  // Ensure the date parameter exists before parsing.
  const isDateValid = paramDate ? moment(paramDate, 'YYYY-MM-DD', true).isValid() : false;
  const selectedDate = isDateValid ? moment(paramDate, 'YYYY-MM-DD') : null;

  const [entityType, setEntityType] = useState<'STUDENT' | 'STAFF'>('STUDENT');

  const {
    data,
    disableDelete,
    disableEdit,
    showModal,
    option,
    selectedRows,
    search,
    sort,
    handleSort,
    onClickAdd,
    onClickEdit,
    onClickDelete,
    onCancel,
    onConfirm,
    onDelete,
    handleSearch,
    onSelectedRowsChange,
  } = useAttendanceDetails(entityType, paramDate);

  const handleEntityTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    newEntityType: 'STUDENT' | 'STAFF' | null,
  ) => {
    if (newEntityType !== null) setEntityType(newEntityType);
  };

  const renderAttendanceCell = ({
    row,
  }: {
    row: StudentAttendanceDay | StaffAttendanceDay;
  }) => {
    const rawStatus = row.attendance;
    const status = typeof rawStatus === 'string' ? rawStatus.toUpperCase() : undefined;

    let chipProps: {
      label: string;
      color: 'success' | 'error' | 'warning'; // Removed 'default' as it's not a standard MUI color for Chip
      variant: 'filled' | 'outlined';
    };

    switch (status) {
      case 'PRESENT':
        chipProps = { label: 'Present', color: 'success', variant: 'filled' };
        break;
      case 'ABSENT':
        chipProps = { label: 'Absent', color: 'error', variant: 'filled' };
        break;
      default:
        chipProps = { label: 'Not Marked', color: 'warning', variant: 'outlined' };
        break;
    }

    return <Chip {...chipProps} size="small" sx={{ color: chipProps.variant === 'filled' ? 'white' : chipProps.color + '.main' }} />;
  };

  const studentColumns = [
    { id: 'studentId', label: 'Student ID', sortable: true },
    { id: 'name', label: 'Name', sortable: true },
    { id: 'attendance', label: 'Attendance', sortable: true, cellRenderer: renderAttendanceCell },
    { id: 'center', label: 'Center', sortable: true },
  ];

  const staffColumns = [
    { id: 'staffId', label: 'Staff ID', sortable: true },
    { id: 'name', label: 'Name', sortable: true },
    { id: 'attendance', label: 'Attendance', sortable: true, cellRenderer: renderAttendanceCell },
    { id: 'center', label: 'Center', sortable: true },
  ];

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flexDirection="row"
        flexWrap="wrap"
        gap={2}
        mb={2}
      >
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          {isDateValid && selectedDate
            ? `Attendance for ${selectedDate.format('MMMM D, YYYY')}`
            : 'Attendance for Invalid Date'}
        </Typography>
        <StyledToggleButtonGroup
          value={entityType}
          exclusive
          onChange={handleEntityTypeChange}
          aria-label="attendance type"
        >
          <ToggleButton
            value="STUDENT"
            aria-label="student attendance"
            sx={{ fontWeight: 'bold', fontSize: 14 }}
          >
            Student
          </ToggleButton>
          <ToggleButton
            value="STAFF"
            aria-label="staff attendance"
            sx={{ fontWeight: 'bold', fontSize: 14 }}
          >
            Staff
          </ToggleButton>
        </StyledToggleButtonGroup>
      </Box>

      {isDateValid ? (
        <AttendanceLayout
          entity={entityType}
          search={search}
          handleSearch={handleSearch}
        >
          <AttendanceActions
            onClickAdd={onClickAdd}
            onClickEdit={onClickEdit}
            onClickDelete={onClickDelete}
            disableEdit={disableEdit}
            disableDelete={disableDelete}
          />
          <ListView
            columns={entityType === 'STUDENT' ? studentColumns : staffColumns}
            rows={data ?? []}
            showCheckbox={true}
            sort={sort}
            handleSort={handleSort}
            getRowId={(row) =>
              isStudentAttendance(row) ? row.studentId.toString() : row.staffId.toString()
            }
            selectedRows={selectedRows}
            onSelectedRowsChange={onSelectedRowsChange}
          />
        </AttendanceLayout>
      ) : (
        <Paper elevation={2} sx={{ p: 3, mt: 2, borderColor: 'error.main' }}>
          <Typography color="error">
            The date provided in the URL is not valid. Please go back to the calendar and select a
            valid date.
          </Typography>
        </Paper>
      )}
      {showModal === 'DELETE' && (
        <DeleteConfirmation open={showModal === 'DELETE'} onClose={onCancel} onConfirm={onDelete} />
      )}
      <AttendanceModal
        open={showModal === 'ADD' || showModal === 'EDIT'}
        data={selectedRows.map((row) =>
          isStudentAttendance(row) ? row.studentId.toString() : row.staffId.toString(),
        )}
        onClose={onCancel}
        onSave={onConfirm}
        option={option}
      />
    </>
  );
};

export default AttendanceDetail;

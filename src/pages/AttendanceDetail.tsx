import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Paper, FormGroup, FormControlLabel, Switch } from '@mui/material';
import moment from 'moment';
import ListView from '../components/ListView';
import { useAttendanceDetails } from '../hooks';
import DeleteConfirmation from '../components/DeleteConfirmation';
import AttendanceModal from '../layouts/AttendanceDetails/AttendanceModal';
import { AttendanceLayout } from '../layouts';
import type { StaffAttendanceDay, StudentAttendanceDay } from '../types';

const isStudentAttendance = (
  item: StudentAttendanceDay | StaffAttendanceDay,
): item is StudentAttendanceDay => 'studentId' in item;

const AttendanceDetail: React.FC = () => {
  const { date: paramDate } = useParams<{ date: string }>();

  // Ensure the date parameter exists before parsing.
  const isDateValid = paramDate ? moment(paramDate, 'YYYY-MM-DD', true).isValid() : false;
  const selectedDate = isDateValid ? moment(paramDate, 'YYYY-MM-DD') : null;

  const [isStudent, setIsStudent] = useState(true);

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
  } = useAttendanceDetails(isStudent ? 'STUDENT' : 'STAFF', paramDate);

  const studentColumns = [
    { id: 'studentId', label: 'Student ID', sortable: true },
    { id: 'name', label: 'Name', sortable: true },
    { id: 'attendance', label: 'Attendance', sortable: true },
    { id: 'batch', label: 'Batch', sortable: true },
    { id: 'center', label: 'Center', sortable: true },
  ];

  const staffColumns = [
    { id: 'staffId', label: 'Staff ID', sortable: true },
    { id: 'name', label: 'Name', sortable: true },
    { id: 'attendance', label: 'Attendance', sortable: true },
    { id: 'center', label: 'Center', sortable: true },
  ];

  return (
    <>
      <Box display="flex" alignItems="center" p={2} gap={2}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          {isDateValid && selectedDate
            ? `Attendance for ${selectedDate.format('MMMM D, YYYY')}`
            : 'Attendance for Invalid Date'}
        </Typography>
      </Box>
      <FormGroup>
        <FormControlLabel
          control={<Switch value={isStudent} />}
          label="Label"
          onChange={() => setIsStudent((prev) => !prev)}
        />
      </FormGroup>

      {isDateValid ? (
        <>
          <AttendanceLayout
            entity={isStudent ? 'STUDENT' : 'STAFF'}
            search={search}
            disableDelete={disableDelete}
            disableEdit={disableEdit}
            handleSearch={handleSearch}
            onClickAdd={onClickAdd}
            onClickEdit={onClickEdit}
            onClickDelete={onClickDelete}
          >
            <ListView
              columns={isStudent ? studentColumns : staffColumns}
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
        </>
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

import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Paper, Button } from '@mui/material';
import moment from 'moment';
import ListView from '../components/ListView';
import { useAttendanceDetails } from '../hooks';
import DeleteConfirmation from '../components/DeleteConfirmation';
import AttendanceModal from '../layouts/AttendanceDetails/AttendanceModal';
import { Search } from '../components';

const AttendanceDetail: React.FC = () => {
  const { date: paramDate } = useParams<{ date: string }>();

  // Ensure the date parameter exists before parsing.
  const isDateValid = paramDate ? moment(paramDate, 'YYYY-MM-DD', true).isValid() : false;
  const selectedDate = isDateValid ? moment(paramDate, 'YYYY-MM-DD') : null;

  const {
    data,
    disableDelete,
    disableEdit,
    showModal,
    studentOption,
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
  } = useAttendanceDetails(paramDate);

  const Columns = [
    { id: 'studentId', label: 'Student ID', sortable: true },
    { id: 'name', label: 'Name', sortable: true },
    { id: 'attendance', label: 'Attendance', sortable: true },
    { id: 'batch', label: 'Batch', sortable: true },
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

      {isDateValid ? (
        <>
          <Box mb={2}>
            <Box
              display={'flex'}
              flexWrap={'wrap'}
              alignItems={'center'}
              justifyContent={'space-between'}
              p={2}
              sx={{ bgcolor: '#fff', border: '1px solid #E3E8EE' }}
            >
              <Typography variant="h5" gutterBottom>
                Student Attendance
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                }}
              >
                <Search search={search} onChange={handleSearch} />
                <Button onClick={onClickAdd}>Add</Button>
                <Button disabled={disableEdit} onClick={onClickEdit}>
                  Edit
                </Button>
                <Button disabled={disableDelete} onClick={onClickDelete}>
                  Delete
                </Button>
              </Box>
            </Box>
            <ListView
              columns={Columns}
              rows={data ?? []}
              showCheckbox={true}
              sort={sort}
              handleSort={handleSort}
              getRowId={(row) => row.studentId.toString()}
              selectedRows={selectedRows}
              onSelectedRowsChange={onSelectedRowsChange}
            />
          </Box>
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
        data={selectedRows.map((row) => row.studentId.toString())}
        onClose={onCancel}
        onSave={onConfirm}
        option={studentOption}
      />
    </>
  );
};

export default AttendanceDetail;

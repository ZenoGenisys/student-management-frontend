import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Paper, Button } from '@mui/material';
import moment from 'moment';
import { Pagination } from '../components';
import ListView from '../components/ListView';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

const AttendanceDetail: React.FC = () => {
  const { date: paramDate } = useParams<{ date: string }>();

  // Ensure the date parameter exists before parsing.
  const isDateValid = paramDate ? moment(paramDate, 'YYYY-MM-DD', true).isValid() : false;
  const selectedDate = isDateValid ? moment(paramDate, 'YYYY-MM-DD') : null;

  // Dummy data for student attendance
  const dummyStudents = [
    { studentId: 1, name: 'John Doe', batch: '', status: 'Present' },
    { studentId: 2, name: 'Jane Smith', batch: '', status: 'Absent' },
    { studentId: 3, name: 'Alice Johnson', batch: '', status: 'Present' },
  ];
  const dummyColumns = [
    { id: 'studentId', label: 'Student ID', sortable: true },
    { id: 'name', label: 'Name', sortable: true },
    { id: 'batch', label: 'Batch', sortable: true },
    { id: 'status', label: 'Status', sortable: true },
    { id: 'actions', label: 'Action', sortable: false },
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
              <Button
                variant="outlined"
                color="primary"
                size="small"
                startIcon={<AddCircleOutlineOutlinedIcon />}
              >
                Add Student
              </Button>
            </Box>
            <Pagination
              page={1}
              pagination={{
                currentPage: 1,
                totalPages: 1,
                totalRows: dummyStudents.length,
              }}
              rowsPerPage={50}
              search=""
              handleSearch={() => {}}
              handlePageChange={() => {}}
              handleRowPerPageChange={() => {}}
            >
              <ListView
                columns={dummyColumns}
                rows={dummyStudents}
                showCheckbox={false}
                getRowId={(row) => row.studentId.toString()}
              />
            </Pagination>
          </Box>
          <Box
            display="flex"
            flexWrap="wrap"
            alignItems="center"
            justifyContent="space-between"
            flexGrow={1}
            p={2}
            sx={{ bgcolor: '#fff', border: '1px solid #E3E8EE' }}
          >
            <Typography variant="h5">Staff Attendace</Typography>
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
    </>
  );
};

export default AttendanceDetail;

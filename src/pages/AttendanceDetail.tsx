import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Paper } from '@mui/material';
import moment from 'moment';

const AttendanceDetail: React.FC = () => {
  const { date: paramDate } = useParams<{ date: string }>();

  // Ensure the date parameter exists before parsing.
  const isDateValid = paramDate ? moment(paramDate, 'YYYY-MM-DD', true).isValid() : false;
  const selectedDate = isDateValid ? moment(paramDate, 'YYYY-MM-DD') : null;

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        p={2}
        gap={2}
      >
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          {isDateValid && selectedDate
            ? `Attendance for ${selectedDate.format('MMMM D, YYYY')}`
            : 'Attendance for Invalid Date'}
        </Typography>
      </Box>

      {isDateValid ? (
        <Paper elevation={2} sx={{ p: 3, mt: 2 }}>
          <Typography variant="h5">
            Detailed attendance records for this day will be displayed here.
          </Typography>
          {/* You would fetch and display detailed data here based on the selectedDate */}
        </Paper>
      ) : (
        <Paper elevation={2} sx={{ p: 3, mt: 2, borderColor: 'error.main' }}>
          <Typography color="error">
            The date provided in the URL is not valid. Please go back to the
            calendar and select a valid date.
          </Typography>
        </Paper>
      )}
    </>
  );
};

export default AttendanceDetail;
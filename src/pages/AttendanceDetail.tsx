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
      <Box display="flex" alignItems="center" p={2} gap={2}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          {isDateValid && selectedDate
            ? `Attendance for ${selectedDate.format('MMMM D, YYYY')}`
            : 'Attendance for Invalid Date'}
        </Typography>
      </Box>

      {isDateValid ? (
        <>
          <Box
            display={'flex'}
            flexWrap={'wrap'}
            alignItems={'center'}
            justifyContent={'space-between'}
            flexGrow={1}
            p={2}
            mb={2}
            sx={{ bgcolor: '#fff', border: '1px solid #E3E8EE' }}
          >
            <Typography variant="h5">Student Attendace</Typography>
          </Box>
          <Box
            display={'flex'}
            flexWrap={'wrap'}
            alignItems={'center'}
            justifyContent={'space-between'}
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

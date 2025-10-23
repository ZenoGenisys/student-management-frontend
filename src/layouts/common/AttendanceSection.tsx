import { Box, Button, FormControl, MenuItem, Typography } from '@mui/material';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../utils/attendanceCalendar.css';
import * as React from 'react';
import Select from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';
import { IoCalendarNumber } from 'react-icons/io5';
import { FaUserCheck } from 'react-icons/fa';
import { FaUserXmark } from 'react-icons/fa6';
import AttendanceDialog from '../../components/AttendanceDialog';
import { useAttendance } from '../../hooks';
import { getFormattedDate } from '../../utils';

type AttendanceSectionProps = {
  type: 'staff' | 'student';
};

const AttendanceSection = ({ type }: AttendanceSectionProps) => {
  const theme = useTheme();
  const {
    enableClearAttendance,
    selected,
    showDialog,
    attendanceFilter,
    attendanceSummary,
    handleSaveAttendance,
    handleDeleteAttendance,
    tileClassName,
    handleActiveStartDateChange,
    handleDateClick,
    handleDialog,
    handleClearSelection,
    handleChange,
  } = useAttendance(type);

  const selectedDates = React.useMemo(() => {
    if (!selected) {
      return null;
    }
    return selected.map((item) => item.date);
  }, [selected]);

  return (
    <Box>
      <Box
        display={'flex'}
        flexWrap={'wrap'}
        alignItems={'center'}
        justifyContent={'space-between'}
        p={2}
        mb={2}
        sx={{ bgcolor: '#fff', border: '1px solid #E3E8EE' }}
      >
        <Typography
          sx={{
            fontWeight: 'bold',
            fontSize: 16,
            pb: { xs: '10px', sm: '0px', md: '0px', lg: '0px', xl: '0px' },
          }}
        >
          Staff Attendance
        </Typography>
        <Box display={'flex'} alignItems={'center'} gap={2}>
          <Typography>
            Last Updated on: {getFormattedDate(attendanceSummary?.lastAttendanceDate)}
          </Typography>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <Select id="attendance-filter" value={attendanceFilter} onChange={handleChange}>
              <MenuItem value={'year'}>This Year</MenuItem>
              <MenuItem value={'month'}>This Month</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      <Box
        display={'flex'}
        flexDirection={'row'}
        flexWrap={'wrap'}
        alignItems={'center'}
        justifyContent={'flex-start'}
        gap={2}
        mb={2}
      >
        <Box
          display={'flex'}
          alignItems={'center'}
          gap={2}
          p={2}
          sx={{ bgcolor: '#fff', border: '1px solid #E3E8EE' }}
        >
          <Box
            sx={{
              background: `${theme.palette.primary.light}`,
              borderRadius: '5px',
              padding: '10px',
            }}
          >
            <IoCalendarNumber fontSize={'24px'} color={`${theme.palette.primary.dark}`} />
          </Box>
          <Box>
            <Typography variant="body1" color="textSecondary">
              Total Working Days
            </Typography>
            <Typography variant="h6" color="textPrimary">
              {attendanceSummary?.totalCount}
            </Typography>
          </Box>
        </Box>

        <Box
          display={'flex'}
          alignItems={'center'}
          gap={2}
          p={2}
          sx={{ bgcolor: '#fff', border: '1px solid #E3E8EE' }}
        >
          <Box
            sx={{
              background: `${theme.palette.success.light}`,
              borderRadius: '5px',
              padding: '10px',
            }}
          >
            <FaUserCheck fontSize={'24px'} color={`${theme.palette.success.dark}`} />
          </Box>
          <Box>
            <Typography variant="body1" color="textSecondary">
              Total Present
            </Typography>
            <Typography variant="h6" color="textPrimary">
              {attendanceSummary?.presentCount}
            </Typography>
          </Box>
        </Box>

        <Box
          display={'flex'}
          alignItems={'center'}
          gap={2}
          p={2}
          sx={{ bgcolor: '#fff', border: '1px solid #E3E8EE' }}
        >
          <Box
            sx={{
              background: `${theme.palette.error.light}`,
              borderRadius: '5px',
              padding: '10px',
            }}
          >
            <FaUserXmark fontSize={'24px'} color={`${theme.palette.error.dark}`} />
          </Box>
          <Box>
            <Typography variant="body1" color="textSecondary">
              Total Absent
            </Typography>
            <Typography variant="h6" color="textPrimary">
              {attendanceSummary?.absentCount}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Calendar
        tileClassName={tileClassName}
        next2Label={null}
        prev2Label={null}
        onClickDay={handleDateClick}
        onActiveStartDateChange={handleActiveStartDateChange}
        tileDisabled={({ date }) => date > new Date()}
      />
      <Box display="flex" justifyContent="flex-start" gap={2} mt={2}>
        <Button variant="contained" onClick={handleDialog} disabled={!selectedDates}>
          Attendance
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={handleDeleteAttendance}
          disabled={!enableClearAttendance || !selected || selected.length === 0}
        >
          Delete Attendance
        </Button>
        <Button
          variant="outlined"
          color="warning"
          onClick={handleClearSelection}
          disabled={!selected || selected.length === 0}
        >
          Clear Selection
        </Button>
      </Box>
      <AttendanceDialog
        open={showDialog}
        onClose={handleDialog}
        onSave={handleSaveAttendance}
        dates={selectedDates}
      />
    </Box>
  );
};

export default AttendanceSection;

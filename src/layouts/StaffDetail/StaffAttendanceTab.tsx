import { Box, Button, FormControl, MenuItem, Typography } from '@mui/material';
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../utils/attendanceCalendar.css';
import * as React from 'react';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';
import { IoCalendarNumber } from 'react-icons/io5';
import { FaUserCheck } from 'react-icons/fa';
import { FaUserXmark } from 'react-icons/fa6';
import AttendanceDialog from '../../components/AttendanceDialog';

// Define types for tileClassName properties
interface TileClassNameProps {
  date: Date;
  view: string;
}

export default function StaffAttendanceTab() {
  const theme = useTheme();
  const [attendance, setAttendance] = useState<{ [key: string]: string }>({
    '2025-09-01': 'present',
    '2025-09-02': 'absent',
    '2025-09-04': 'present',
    '2025-09-06': 'absent',
  });
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentAttendance, setCurrentAttendance] = useState<string | null>(null);

  const handleDateClick = (date: Date) => {
    const dateStr = date.toLocaleDateString('en-CA');
    setCurrentAttendance(attendance[dateStr] || null);
    setSelectedDate(date);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleClearAttendance = () => {
    if (selectedDate) {
      const dateStr = selectedDate.toLocaleDateString('en-CA');
      setAttendance((prev) => {
        const { [dateStr]: _, ...rest } = prev;
        return rest;
      });
      setCurrentAttendance(null);
    }
  };

  const handleSaveAttendance = (status: string) => {
    if (selectedDate) {
      const dateStr = selectedDate.toLocaleDateString('en-CA');
      if (status) {
        setAttendance((prev) => ({ ...prev, [dateStr]: status }));
        setCurrentAttendance(status);
      } else {
        setAttendance((prev) => {
          const { [dateStr]: _, ...rest } = prev;
          return rest;
        });
        setCurrentAttendance(null);
      }
    }
    handleCloseDialog();
  };

  // function to add custom class to each tile
  const tileClassName = ({ date, view }: TileClassNameProps): string | null => {
    if (view === 'month') {
      // Local date string in India timezone
      const dateStr = date.toLocaleDateString('en-CA'); // ✅ keeps IST

      if (attendance[dateStr] === 'present') {
        return 'present-date';
      }
      if (attendance[dateStr] === 'absent') {
        return 'absent-date';
      }
    }
    return null;
  };

  const [attendancefilter, setAttendanceFilter] = React.useState('year');

  const handleChange = (event: SelectChangeEvent) => {
    setAttendanceFilter(event.target.value);
  };

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
          <Typography>Last Updated on: 25 Oct 2025</Typography>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <Select id="attendance-filter" value={attendancefilter} onChange={handleChange}>
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
            <Typography variant='body1' color='textSecondary'>
              Total Working Days
            </Typography>
            <Typography variant='h6' color='textPrimary'>
              240
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
            <Typography variant='body1' color='textSecondary'>
              Total Present
            </Typography>
            <Typography variant='h6' color='textPrimary'>
              210
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
            <Typography variant='body1' color='textSecondary'>
              Total Absent
            </Typography>
            <Typography variant='h6' color='textPrimary'>
              30
            </Typography>
          </Box>
        </Box>
      </Box>
      <Calendar
        tileClassName={tileClassName}
        next2Label={null}
        prev2Label={null}
        onClickDay={handleDateClick}
      />
      <Box display="flex" justifyContent="flex-start" gap={2} mt={2}>
        <Button variant="contained" onClick={handleOpenDialog} disabled={!selectedDate}>
          {currentAttendance ? 'Edit' : 'Add'} Attendance
        </Button>
        <Button
          variant="outlined"
          onClick={handleClearAttendance}
          disabled={!selectedDate || !currentAttendance}
        >
          Clear Attendance
        </Button>
      </Box>
      <AttendanceDialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        onSave={handleSaveAttendance}
        attendanceStatus={currentAttendance}
        date={selectedDate}
      />
    </Box>
  );
}
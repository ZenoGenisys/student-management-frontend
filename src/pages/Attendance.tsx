import React, { useState } from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Attendance.css'; // Import the new stylesheet
import { type AttendanceEvent } from '../types/events';

// Setup the localizer by providing the moment Object
const localizer = momentLocalizer(moment);

// Sample attendance data
const now = new Date();
const attendanceEvents: AttendanceEvent[] = [
  // --- Day 1 Data ---
  {
    title: 'Students: 245 Present',
    start: new Date(now.getFullYear(), now.getMonth(), 1),
    end: new Date(now.getFullYear(), now.getMonth(), 1),
    allDay: true,
    status: 'present',
    type: 'student',
  },
  {
    title: 'Students: 5 Absent',
    start: new Date(now.getFullYear(), now.getMonth(), 1),
    end: new Date(now.getFullYear(), now.getMonth(), 1),
    allDay: true,
    status: 'absent',
    type: 'student',
  },
  {
    title: 'Staff: 48 Present',
    start: new Date(now.getFullYear(), now.getMonth(), 1),
    end: new Date(now.getFullYear(), now.getMonth(), 1),
    allDay: true,
    status: 'present',
    type: 'staff',
  },
  {
    title: 'Staff: 2 Absent',
    start: new Date(now.getFullYear(), now.getMonth(), 1),
    end: new Date(now.getFullYear(), now.getMonth(), 1),
    allDay: true,
    status: 'absent',
    type: 'staff',
  },
];

const eventPropGetter = (event: AttendanceEvent) => {
  // The className will be a combination of type and status, e.g., "student-present"
  // This will match the classes in Attendance.css
  const className = `${event.type}-${event.status}`;
  return { className };
};

const Legend = () => (
  <Box display="flex" gap={2} flexWrap="wrap">
    <Box display="flex" alignItems="center" gap={1}>
      <Box sx={{ width: 14, height: 14, backgroundColor: '#2e7d32' }} />
      <Typography variant="caption">Student Present</Typography>
    </Box>
    <Box display="flex" alignItems="center" gap={1}>
      <Box sx={{ width: 14, height: 14, backgroundColor: '#d32f2f' }} />
      <Typography variant="caption">Student Absent</Typography>
    </Box>
    <Box display="flex" alignItems="center" gap={1}>
      <Box sx={{ width: 14, height: 14, backgroundColor: '#0288d1' }} />
      <Typography variant="caption">Staff Present</Typography>
    </Box>
    <Box display="flex" alignItems="center" gap={1}>
      <Box sx={{ width: 14, height: 14, backgroundColor: '#ed6c02' }} />
      <Typography variant="caption">Staff Absent</Typography>
    </Box>
  </Box>
);

const Attendance: React.FC = () => {
  // State to control the calendar's date
  const [date, setDate] = useState(new Date());

  return (
    <>
      <Box
        display={'flex'}
        justifyContent="space-between"
        alignItems="center"
        p={2}
        flexWrap="wrap"
        gap={2}
      >
        <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold' }}>
          Attendance Management
        </Typography>
        <Legend />
      </Box>

      <Box sx={{ height: '75vh', p: 1 }}>
        <Calendar
          localizer={localizer}
          events={attendanceEvents}
          startAccessor="start"
          endAccessor="end"
          eventPropGetter={eventPropGetter}
          date={date}
          onNavigate={(newDate) => setDate(newDate)}
          view="month"
          views={['month']}
        />
      </Box>
    </>
  );
};

export default Attendance;
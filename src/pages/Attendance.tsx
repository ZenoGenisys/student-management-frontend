import React, { useState } from 'react';
import { Box, Typography, Button, ButtonGroup, useTheme, useMediaQuery } from '@mui/material';
import { Calendar, momentLocalizer, type ToolbarProps } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Attendance.css'; // Import the new stylesheet
import { type AttendanceEvent } from '../types/events';
import { useNavigate } from 'react-router-dom';

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

const CustomToolbar: React.FC<ToolbarProps<AttendanceEvent>> = (toolbar) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const navigate = (action: 'PREV' | 'NEXT' | 'TODAY') => {
    toolbar.onNavigate(action);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 2,
        flexWrap: 'wrap',
        gap: 1,
      }}
    >
      <ButtonGroup variant="outlined" size={isMobile ? 'small' : 'medium'}>
        <Button onClick={() => navigate('PREV')}>Back</Button>
        <Button onClick={() => navigate('TODAY')}>Today</Button>
        <Button onClick={() => navigate('NEXT')}>Next</Button>
      </ButtonGroup>

      <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
        {toolbar.label}
      </Typography>
    </Box>
  );
};

// Custom component to render the event content
const CustomEvent = ({ event }: { event: AttendanceEvent }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Extracts the number from a title like "Students: 245 Present"
  const number = event.title?.toString().match(/\d+/)?.[0];

  if (isMobile) {
    return <span>{number}</span>;
  }
  return <span>{event.title}</span>;
};

const Attendance: React.FC = () => {
  const [date, setDate] = useState(new Date());

  const navigate = useNavigate();
  const handleSelectSlot = (slotInfo: { start: Date; end: Date; slots: Date[] }) => {
    navigate(`/attendance-detail/${moment(slotInfo.start).format('YYYY-MM-DD')}`);
  };

  const handleSelectEvent = (event: AttendanceEvent) => {
    if (event.start) {
      const formattedDate = moment(event.start).format('YYYY-MM-DD');
      navigate(`/attendance-detail/${formattedDate}`);
    }
  };

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

      <Box sx={{ height: 'calc(100vh - 300px)', p: 1 }}>
        <Calendar
          localizer={localizer}
          events={attendanceEvents}
          startAccessor="start"
          endAccessor="end"
          eventPropGetter={eventPropGetter}
          date={date}
          onNavigate={(newDate) => setDate(newDate)}
          view="month" // Lock the view to month
          views={['month']} // Only allow the month view
          components={{
            event: CustomEvent,
            toolbar: CustomToolbar,
          }}
          selectable={true}
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
        />
      </Box>
    </>
  );
};

export default Attendance;

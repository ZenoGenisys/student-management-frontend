import React from 'react';
import { Box, Typography } from '@mui/material';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Attendance.css'; // Import the new stylesheet
import { type AttendanceEvent } from '../types/events';
import { useAttendanceSummary } from '../hooks';
import { Events, Legend, Toolbar } from '../layouts';

// Setup the localizer by providing the moment Object
const localizer = momentLocalizer(moment);

const eventPropGetter = (event: AttendanceEvent) => {
  const className = `${event.type}-${event.status}`;
  return { className };
};

const Attendance: React.FC = () => {
  const { date, attendanceEvents, handleSelectSlot, handleSelectEvent, setDate } =
    useAttendanceSummary();

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
            event: Events,
            toolbar: Toolbar,
          }}
          selectable={true}
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          max={new Date()}
        />
      </Box>
    </>
  );
};

export default Attendance;

import React from 'react';
import { Box, Typography } from '@mui/material';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Attendance.css';
import { type AttendanceEvent } from '../types/events';
import { useAttendanceSummary } from '../hooks';
import { Events, Legend, Toolbar } from '../layouts';
import { useSnackbar } from '../state';

const localizer = momentLocalizer(moment);

const eventPropGetter = (event: AttendanceEvent) => {
  const className = `${event.type}-${event.status}`;
  return { className };
};

const Attendance: React.FC = () => {
  const { date, attendanceEvents, handleSelectSlot, handleSelectEvent, setDate } =
    useAttendanceSummary();

  const { showSnackbar } = useSnackbar();

  const today = new Date();

  // Prevent selecting or clicking future slots
  const handleSlotSelect = (slotInfo: { start: Date; end: Date; slots: Date[] | string[] }) => {
    if (slotInfo.start > today) {
      showSnackbar({ message: 'Future dates are disabled', severity: 'error' });
      return;
    }
    handleSelectSlot(slotInfo);
  };

  // Gray out future cells visually + disable pointer events
  const dayPropGetter = (date: Date) => {
    if (date > today) {
      const style: React.CSSProperties = {
        backgroundColor: '#f5f5f5',
        color: '#aaa',
        pointerEvents: 'none',
        cursor: 'not-allowed',
      };
      return { style };
    }

    return { style: {} };
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
          view="month"
          views={['month']}
          components={{
            event: Events,
            toolbar: Toolbar,
          }}
          selectable
          onSelectSlot={handleSlotSelect}
          onSelectEvent={handleSelectEvent}
          max={today}
          dayPropGetter={dayPropGetter}
        />
      </Box>
    </>
  );
};

export default Attendance;

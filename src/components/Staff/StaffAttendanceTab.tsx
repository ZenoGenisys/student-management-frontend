import { Box } from '@mui/material';
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../utils/attendanceCalendar.css'

// Define types for tileClassName properties
interface TileClassNameProps {
  date: Date;
  view: string;
}

export default function StaffAttendanceTab() {
  const [attendance] = useState<{ [key: string]: string }>({
    '2025-09-01': 'present',
    '2025-09-02': 'absent',
    '2025-09-04': 'present',
    '2025-09-06': 'absent',
  });

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

  return (
    <Box>
      <Calendar tileClassName={tileClassName} next2Label={null} prev2Label={null} />
    </Box>
  );
}

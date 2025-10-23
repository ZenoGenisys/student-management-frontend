import { useMediaQuery, useTheme } from '@mui/material';
import type { AttendanceEvent } from '../../types/events';

const Event = ({ event }: { event: AttendanceEvent }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Extracts the number from a title like "Students: 245 Present"
  const number = event.title?.toString().match(/\d+/)?.[0];

  if (isMobile) {
    return <span>{number}</span>;
  }
  return <span>{event.title}</span>;
};

export default Event;

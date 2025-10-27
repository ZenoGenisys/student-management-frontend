import { useQuery } from '@tanstack/react-query';
import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAttendanceSummary } from '../repositories';
import type { AttendanceEvent } from '../types/events';
import moment from 'moment';

const useAttendanceSummary = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());

  const { data } = useQuery({
    queryKey: [`attendance-summary`, date.getFullYear()],
    queryFn: () => {
      return getAttendanceSummary(date.getFullYear());
    },
  });

  const handleSelectSlot = useCallback(
    (slotInfo: { start: Date; end: Date; slots: Date[] | string[] }) => {
      navigate(`/attendance-detail/${moment(slotInfo.start).format('YYYY-MM-DD')}`);
    },
    [navigate],
  );

  const handleSelectEvent = useCallback(
    (event: AttendanceEvent) => {
      if (event.start) {
        const formattedDate = moment(event.start).format('YYYY-MM-DD');
        navigate(`/attendance-detail/${formattedDate}`);
      }
    },
    [navigate],
  );

  const attendanceEvents: AttendanceEvent[] = useMemo(
    () =>
      (data ?? []).map((item) => ({
        title: `${item.userType === 'student' ? 'Students' : 'Staff'}: ${item.count} ${item.status === 'present' ? 'Present' : 'Absent'}`,
        start: new Date(item.date),
        end: new Date(item.date),
        allDay: true,
        status: item.status,
        type: item.userType,
      })),
    [data],
  );

  return useMemo(
    () => ({
      date,
      attendanceEvents,
      setDate,
      handleSelectSlot,
      handleSelectEvent,
    }),
    [date, attendanceEvents, setDate, handleSelectSlot, handleSelectEvent],
  );
};

export default useAttendanceSummary;

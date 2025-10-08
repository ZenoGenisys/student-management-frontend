import { useQuery } from '@tanstack/react-query';
import { deleteStaffAttendance, getStaffAttendance, markAttendance } from '../repositories';
import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { MarkAttendanceRequest, StaffAttendanceType } from '../types';
import type { CalendarProps } from 'react-calendar';
import { useSnackbar } from '../state';
import dayjs from 'dayjs';

type BooleanMap = { [key: string]: boolean };

type DateProps = {
  date: Date;
  view: string;
};

const useStaffAttendance = () => {
  const { showSnackbar } = useSnackbar();
  const { staffId } = useParams<{ staffId: string }>();
  const [attendance, setAttendance] = useState<BooleanMap>({});
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selected, setSelected] = useState<MarkAttendanceRequest[] | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['staff-attendance', staffId, currentYear],
    queryFn: () => {
      return getStaffAttendance({
        staffId: Number(staffId),
        dateFrom: `${currentYear}-01-01`,
        dateTo: `${currentYear}-12-31`,
      });
    },
  });

  useEffect(() => {
    if (data && data.data) {
      const attendanceMap: BooleanMap = {};
      data.data.forEach((item: StaffAttendanceType) => {
        attendanceMap[String(item.date)] = item.attendance;
      });
      setAttendance(attendanceMap);
    }
  }, [data]);

  const tileClassName = useCallback(
    ({ date, view }: DateProps): string | null => {
      if (view === 'month') {
        const dateStr = date.toLocaleDateString('en-CA');
        if (attendance[dateStr]) {
          if ((selected ?? []).some((d) => String(d.date) === date.toLocaleDateString('en-CA'))) {
            return 'present-date react-calendar__tile--active';
          }
          return 'present-date';
        }
        if (attendance[dateStr] === false) {
          if ((selected ?? []).some((d) => String(d.date) === date.toLocaleDateString('en-CA'))) {
            return 'absent-date react-calendar__tile--active';
          }
          return 'absent-date';
        }
        if ((selected ?? []).some((d) => String(d.date) === date.toLocaleDateString('en-CA'))) {
          return 'react-calendar__tile--active';
        }
      }
      return null;
    },
    [attendance, selected],
  );

  const handleActiveStartDateChange: CalendarProps['onActiveStartDateChange'] = useCallback(
    ({ activeStartDate, view }: any) => {
      if (view === 'month') {
        const newYear = activeStartDate.getFullYear();

        setCurrentYear((prevYear) => {
          if (prevYear !== newYear) {
            return newYear;
          }
          return prevYear;
        });
      }
    },
    [],
  );

  const enableClearAttendance = useMemo(
    () => (selected ?? []).every((date) => date.date in attendance),
    [attendance, selected],
  );

  const handleDateClick = useCallback(
    (date: Date) => {
      setSelected((prev) => {
        // If already selected, remove it
        if ((prev ?? []).some((d) => dayjs(d.date).isSame(dayjs(date), 'day'))) {
          return (prev ?? []).filter((d) => !dayjs(d.date).isSame(dayjs(date), 'day'));
        }
        const staffAttendanceId = data?.data.find((item) =>
          dayjs(item.date).isSame(dayjs(date), 'day'),
        )?.staffAttendanceId;
        // Otherwise, add it
        return [
          ...(prev ?? []),
          {
            staffAttendanceId,
            date: date.toLocaleDateString('en-CA'),
            staffId: Number(staffId),
            attendance: true,
          },
        ];
      });
    },
    [staffId, data],
  );

  const handleClearAttendance = useCallback(async () => {
    try {
      if (selected) {
        const attendanceIds = selected
          .map((item) => item.staffAttendanceId)
          .filter((item) => item !== undefined);
        await deleteStaffAttendance(attendanceIds);
        setSelected(null);
        showSnackbar({
          message: 'Attendance cleared successfully!',
          severity: 'success',
        });
        refetch();
      }
    } catch (error) {
      showSnackbar({
        message: error instanceof Error ? error.message : 'Failed to clear attendance',
        severity: 'error',
      });
    }
  }, [selected, showSnackbar, refetch]);

  const handleDialog = useCallback(() => {
    setShowDialog((prev) => !prev);
  }, []);

  const handleSaveAttendance = useCallback(
    async (status: boolean) => {
      try {
        console.log(status);
        const params = (selected ?? [])?.map((item) => {
          return {
            ...item,
            attendance: status,
          };
        });
        await markAttendance(params ?? []);
        showSnackbar({
          message: 'Attendance marked successfully!',
          severity: 'success',
        });
        setSelected(null);
        refetch();
        handleDialog();
      } catch (error) {
        showSnackbar({
          message: error instanceof Error ? error.message : 'Failed to Mark attendance',
          severity: 'error',
        });
      }
    },
    [selected, refetch, handleDialog, showSnackbar],
  );

  return useMemo(
    () => ({
      isLoading,
      error,
      enableClearAttendance,
      selected,
      showDialog,
      handleSaveAttendance,
      tileClassName,
      handleActiveStartDateChange,
      handleDateClick,
      handleClearAttendance,
      handleDialog,
    }),
    [
      isLoading,
      error,
      enableClearAttendance,
      selected,
      showDialog,
      handleSaveAttendance,
      tileClassName,
      handleActiveStartDateChange,
      handleDateClick,
      handleClearAttendance,
      handleDialog,
    ],
  );
};
export default useStaffAttendance;

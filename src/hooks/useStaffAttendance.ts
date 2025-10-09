import { useQuery } from '@tanstack/react-query';
import {
  deleteStaffAttendance,
  getStaffAttendance,
  getStaffAttendanceSummary,
  markAttendance,
} from '../repositories';
import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { MarkAttendanceRequest, StaffAttendanceType } from '../types';
import type { CalendarProps } from 'react-calendar';
import { useSnackbar } from '../state';
import dayjs from 'dayjs';
import type { SelectChangeEvent } from '@mui/material';

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
  const [attendanceFilter, setAttendanceFilter] = useState('year');

  const handleChange = useCallback((event: SelectChangeEvent) => {
    setAttendanceFilter(event.target.value);
  }, []);

  const { data: attendanceSummary, refetch: summaryRefetch } = useQuery({
    queryKey: ['staff-attendance-summary', staffId, attendanceFilter],
    queryFn: () => {
      let startDate: dayjs.Dayjs;
      let endDate: dayjs.Dayjs;
      if (attendanceFilter === 'year') {
        const year = dayjs().year(); // current year
        startDate = dayjs(`${year}-01-01`);
        endDate = dayjs(`${year}-12-31`);
      } else {
        const now = dayjs();
        startDate = now.startOf('month'); // 1st day of current month
        endDate = now.endOf('month'); // last day of current month
      }
      return getStaffAttendanceSummary({
        staffId: Number(staffId),
        startDate: startDate.format('YYYY-MM-DD'),
        endDate: endDate.format('YYYY-MM-DD'),
      });
    },
  });

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
        summaryRefetch();
      }
    } catch (error) {
      showSnackbar({
        message: error instanceof Error ? error.message : 'Failed to clear attendance',
        severity: 'error',
      });
    }
  }, [selected, showSnackbar, refetch, summaryRefetch]);

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
        summaryRefetch();
        handleDialog();
      } catch (error) {
        showSnackbar({
          message: error instanceof Error ? error.message : 'Failed to Mark attendance',
          severity: 'error',
        });
      }
    },
    [selected, refetch, summaryRefetch, handleDialog, showSnackbar],
  );

  const handleClearSelection = useCallback(() => {
    setSelected(null);
  }, []);

  return useMemo(
    () => ({
      isLoading,
      error,
      enableClearAttendance,
      selected,
      showDialog,
      attendanceSummary,
      handleSaveAttendance,
      tileClassName,
      handleActiveStartDateChange,
      handleDateClick,
      handleClearAttendance,
      handleDialog,
      handleClearSelection,
      attendanceFilter,
      handleChange,
    }),
    [
      isLoading,
      error,
      enableClearAttendance,
      selected,
      showDialog,
      attendanceSummary,
      handleSaveAttendance,
      tileClassName,
      handleActiveStartDateChange,
      handleDateClick,
      handleClearAttendance,
      handleDialog,
      handleClearSelection,
      attendanceFilter,
      handleChange,
    ],
  );
};
export default useStaffAttendance;

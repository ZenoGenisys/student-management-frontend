import { useQuery } from '@tanstack/react-query';
import {
  getStaffAttendance,
  getStaffAttendanceSummary,
  markStaffAttendance,
  deleteStaffAttendance,
  getStudentAttendance,
  getStudentAttendanceSummary,
  markStudentAttendance,
  deleteStudentAttendance,
} from '../repositories';
import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type {
  MarkStudentAttendanceRequest,
  MarkStaffAttendanceRequest,
  StaffAttendanceType,
  StudentAttendanceType,
  StaffAttendanceResponse,
  StudentAttendanceResponse,
} from '../types';
import type { CalendarProps } from 'react-calendar';
import { useLoading, useSnackbar } from '../state';
import dayjs from 'dayjs';
import type { SelectChangeEvent } from '@mui/material';

type BooleanMap = { [key: string]: boolean };

type DateProps = {
  date: Date;
  view: string;
};

type ActiveStartDateChangeProps = {
  activeStartDate: Date | null;
  view: string;
};
type EntityType = 'staff' | 'student';
type AttendanceType = StaffAttendanceType | StudentAttendanceType;
type AttendanceResponse = StaffAttendanceResponse | StudentAttendanceResponse;

const useAttendance = (entityType: EntityType) => {
  const { showSnackbar } = useSnackbar();
  const { setLoading } = useLoading();
  const { staffId, studentId } = useParams<{ staffId: string; studentId: string }>();
  const id = Number(staffId ?? studentId);
  const entityId = Number(staffId ?? studentId);

  const { getAttendance, getAttendanceSummary, deleteAttendance, markAttendance } = useMemo(() => {
    if (entityType === 'staff') {
      return {
        getAttendance: getStaffAttendance,
        getAttendanceSummary: getStaffAttendanceSummary,
        deleteAttendance: deleteStaffAttendance,
        markAttendance: markStaffAttendance,
      };
    }
    return {
      getAttendance: getStudentAttendance,
      getAttendanceSummary: getStudentAttendanceSummary,
      deleteAttendance: deleteStudentAttendance,
      markAttendance: markStudentAttendance,
    };
  }, [entityType]);

  const [attendance, setAttendance] = useState<BooleanMap>({});
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selected, setSelected] = useState<
    MarkStudentAttendanceRequest[] | MarkStaffAttendanceRequest[] | null
  >(null);
  const [showDialog, setShowDialog] = useState(false);
  const [attendanceFilter, setAttendanceFilter] = useState('year');

  const handleChange = useCallback((event: SelectChangeEvent) => {
    setAttendanceFilter(event.target.value);
  }, []);

  const { data: attendanceSummary, refetch: summaryRefetch } = useQuery({
    queryKey: [`${entityType}-attendance-summary`, id, attendanceFilter],
    queryFn: async () => {
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
      setLoading(true);
      try {
        const response = await getAttendanceSummary({
          id: entityId,
          startDate: startDate.format('YYYY-MM-DD'),
          endDate: endDate.format('YYYY-MM-DD'),
        });
        return response;
      } finally {
        setLoading(false);
      }
    },
  });

  const { data, error, refetch } = useQuery<AttendanceResponse, Error>({
    queryKey: [`${entityType}-attendance`, id, currentYear],
    queryFn: async () => {
      setLoading(true);
      try {
        const response = await getAttendance({
          [entityType === 'staff' ? 'staffId' : 'studentId']: entityId,
          dateFrom: `${currentYear}-01-01`,
          dateTo: `${currentYear}-12-31`,
        });
        return response;
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    if (data?.data) {
      const attendanceMap: BooleanMap = {};
      data.data.forEach((item: AttendanceType) => {
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
    ({ activeStartDate, view }: ActiveStartDateChangeProps) => {
      if (view === 'month' && activeStartDate) {
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
        const attendanceItem = data?.data.find((item) =>
          dayjs(item.date).isSame(dayjs(date), 'day'),
        );
        // Otherwise, add it
        return [
          ...(prev ?? []),
          {
            attendanceId: attendanceItem?.attendanceId,
            date: date.toLocaleDateString('en-CA'),
            [entityType === 'staff' ? 'staffId' : 'studentId']: entityId,
            attendance: true,
          },
        ];
      });
    },
    [entityId, data, entityType],
  );

  const handleDeleteAttendance = useCallback(async () => {
    setLoading(true);
    try {
      if (selected) {
        const attendanceIds = selected
          .map((item) => item?.attendanceId)
          .filter((item) => item !== undefined);
        await deleteAttendance(attendanceIds);
        setSelected(null);
        showSnackbar({
          message: 'Attendance deleted successfully!',
          severity: 'success',
        });
        refetch();
        summaryRefetch();
      }
    } catch (error) {
      showSnackbar({
        message: error instanceof Error ? error.message : 'Failed to delete attendance',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  }, [selected, showSnackbar, refetch, summaryRefetch, deleteAttendance, setLoading]);

  const handleDialog = useCallback(() => {
    setShowDialog((prev) => !prev);
  }, []);

  const handleSaveAttendance = useCallback(
    async (status: boolean) => {
      setLoading(true);
      try {
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
      } finally {
        setLoading(false);
      }
    },
    [selected, refetch, summaryRefetch, handleDialog, showSnackbar, markAttendance, setLoading],
  );

  const handleClearSelection = useCallback(() => {
    setSelected(null);
  }, []);

  return useMemo(
    () => ({
      error,
      enableClearAttendance,
      selected,
      showDialog,
      attendanceSummary,
      handleSaveAttendance,
      tileClassName,
      handleActiveStartDateChange,
      handleDateClick,
      handleDeleteAttendance,
      handleDialog,
      handleClearSelection,
      attendanceFilter,
      handleChange,
    }),
    [
      error,
      enableClearAttendance,
      selected,
      showDialog,
      attendanceSummary,
      handleSaveAttendance,
      tileClassName,
      handleActiveStartDateChange,
      handleDateClick,
      handleDeleteAttendance,
      handleDialog,
      handleClearSelection,
      attendanceFilter,
      handleChange,
    ],
  );
};
export default useAttendance;

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  deleteStaffAttendance,
  deleteStudentAttendance,
  getStaff,
  getStaffAttendanceForDay,
  getStudent,
  getStudentAttendanceForDay,
  markStaffAttendance,
  markStudentAttendance,
} from '../repositories';
import { useQuery } from '@tanstack/react-query';
import { useLoading, useSnackbar } from '../state';
import type { StaffAttendanceDay, StudentAttendanceDay } from '../types';

type AttendanceDay = StudentAttendanceDay | StaffAttendanceDay;

const useAttendanceDetails = (entity: 'STUDENT' | 'STAFF', date?: string) => {
  const { showSnackbar } = useSnackbar();
  const { setLoading } = useLoading();
  const [search, setSearch] = useState<string>();
  const [debouncedSearch, setDebouncedSearch] = useState<string>();
  const [sort, setSort] = useState<{
    orderBy: string;
    order: 'asc' | 'desc';
  } | null>(null);
  const [selectedRows, setSelectedRows] = useState<AttendanceDay[]>([]);
  const [showModal, setShowModal] = useState<'ADD' | 'EDIT' | 'DELETE' | null>(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  const { getAttendanceForDay, deleteAttendance, markAttendance } = useMemo(() => {
    if (entity === 'STAFF') {
      return {
        getAttendanceForDay: getStaffAttendanceForDay,
        deleteAttendance: deleteStaffAttendance,
        markAttendance: markStaffAttendance,
        getEntities: getStaff,
      };
    }
    // Default to STUDENT
    return {
      getAttendanceForDay: getStudentAttendanceForDay,
      deleteAttendance: deleteStudentAttendance,
      markAttendance: markStudentAttendance,
      getEntities: getStudent,
    };
  }, [entity]);

  const { data, refetch } = useQuery<AttendanceDay[]>({
    queryKey: [entity.toLowerCase(), 'attendance', date, debouncedSearch, sort],
    queryFn: async () => {
      setLoading(true);
      try {
        const response = await getAttendanceForDay({
          date: date ?? '',
          search: debouncedSearch,
          ...(sort
            ? {
                sortBy: sort.orderBy,
                order: (sort.order ?? 'asc').toUpperCase() === 'DESC' ? 'DESC' : 'ASC',
              }
            : {}),
        });
        return response;
      } finally {
        setLoading(false);
      }
    },
    enabled: !!date,
  });

  const { data: studentData } = useQuery({
    queryKey: ['student-data'],
    queryFn: async () => {
      setLoading(true);
      try {
        const response = await getStudent({
          page: 1,
          size: 10000,
        });
        return response;
      } finally {
        setLoading(false);
      }
    },
    enabled: entity === 'STUDENT',
  });

  const { data: staffData } = useQuery({
    queryKey: ['staff-data'],
    queryFn: async () => {
      setLoading(true);
      try {
        const response = await getStaff({
          page: 1,
          size: 10000,
        });
        return response;
      } finally {
        setLoading(false);
      }
    },
    enabled: entity === 'STAFF',
  });

  const option = useMemo(() => {
    if (entity === 'STAFF') {
      return (staffData?.data ?? []).map((item) => ({
        value: String(item.staffId),
        label: `${item.name} (${item.center})`,
      }));
    }
    if (entity === 'STUDENT') {
      return (studentData?.data ?? []).map((item) => ({
        value: String(item.studentId),
        label: `${item.name} (${item.center})`,
      }));
    }
    return [];
  }, [studentData?.data, staffData?.data, entity]);

  const handleSort = useCallback((orderBy: string, order?: 'asc' | 'desc') => {
    setSort({ orderBy: orderBy, order: order === 'asc' ? 'desc' : 'asc' });
  }, []);

  const handleSearch = useCallback((search: string) => {
    setSearch(search);
  }, []);

  const { disableEdit, disableDelete } = useMemo(() => {
    return {
      disableEdit: selectedRows.length === 0,
      disableDelete:
        selectedRows.length === 0 ||
        selectedRows.filter((item) => item.attendance === 'not marked').length > 0,
    };
  }, [selectedRows]);

  const onSelectedRowsChange = useCallback((rows: AttendanceDay[]) => {
    setSelectedRows(rows);
  }, []);

  const onClickAdd = useCallback(() => {
    setShowModal('ADD');
  }, []);

  const onClickEdit = useCallback(() => {
    setShowModal('EDIT');
  }, []);

  const onClickDelete = useCallback(() => {
    setShowModal('DELETE');
  }, []);

  const onCancel = useCallback(() => {
    setShowModal(null);
  }, []);

  const onDelete = useCallback(async () => {
    setLoading(true);
    try {
      const attendanceIds = selectedRows.map((item) => item.id);
      await deleteAttendance(attendanceIds);
      setShowModal(null);
      setSelectedRows([]);
      showSnackbar({
        message: 'Attendance deleted successfully!',
        severity: 'success',
      });
      refetch();
    } catch (error) {
      showSnackbar({
        message: error instanceof Error ? error.message : 'Failed to Delete attendance',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  }, [showSnackbar, refetch, selectedRows, deleteAttendance, setLoading]);

  const onConfirm = useCallback(
    async (status: boolean, ids?: string[]) => {
      setLoading(true);
      try {
        if (showModal === 'EDIT' || showModal === 'ADD') {
          const payload = (ids ?? []).map((id) => {
            const common = { date: date ?? '', attendance: status };
            if (entity === 'STUDENT') {
              return { ...common, studentId: Number(id) };
            }
            return { ...common, staffId: Number(id) };
          });

          await markAttendance(payload);
        }
        setShowModal(null);
        setSelectedRows([]);

        showSnackbar({
          message: 'Attendance Marked successfully!',
          severity: 'success',
        });
        refetch();
      } catch (error) {
        showSnackbar({
          message: error instanceof Error ? error.message : 'Failed to Mark attendance',
          severity: 'error',
        });
      } finally {
        setLoading(false);
      }
    },
    [date, refetch, showSnackbar, showModal, entity, markAttendance, setLoading],
  );

  return useMemo(
    () => ({
      data,
      sort,
      search,
      disableEdit,
      disableDelete,
      showModal,
      option,
      selectedRows,
      onClickAdd,
      onClickEdit,
      onClickDelete,
      handleSort,
      handleSearch,
      onSelectedRowsChange,
      onCancel,
      onConfirm,
      onDelete,
    }),
    [
      data,
      showModal,
      sort,
      search,
      disableDelete,
      disableEdit,
      option,
      selectedRows,
      onClickEdit,
      onClickDelete,
      handleSort,
      handleSearch,
      onCancel,
      onConfirm,
      onDelete,
      onClickAdd,
      onSelectedRowsChange,
    ],
  );
};

export default useAttendanceDetails;

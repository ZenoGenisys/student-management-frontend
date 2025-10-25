import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  deleteStudentAttendance,
  getStudent,
  getStudentAttendanceForDay,
  markStudentAttendance,
} from '../repositories';
import { useQuery } from '@tanstack/react-query';
import { useSnackbar } from '../state';
import type { StudentAttendanceDay } from '../types';

const useAttendanceDetails = (date?: string) => {
  const { showSnackbar } = useSnackbar();
  const [search, setSearch] = useState<string>();
  const [debouncedSearch, setDebouncedSearch] = useState<string>();
  const [sort, setSort] = useState<{
    orderBy: string;
    order: 'asc' | 'desc';
  } | null>(null);
  const [selectedRows, setSelectedRows] = useState<StudentAttendanceDay[]>([]);
  const [showModal, setShowModal] = useState<'ADD' | 'EDIT' | 'DELETE' | null>(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  const { data, refetch } = useQuery({
    queryKey: ['student', date, debouncedSearch, sort],
    queryFn: () =>
      getStudentAttendanceForDay({
        date: date ?? '',
        search: debouncedSearch,
        ...(sort
          ? {
              sortBy: sort.orderBy,
              order: (sort.order ?? 'asc').toUpperCase() === 'DESC' ? 'DESC' : 'ASC',
            }
          : {}),
      }),
  });

  const { data: studentData } = useQuery({
    queryKey: ['student-data'],
    queryFn: () =>
      getStudent({
        page: 1,
        size: 1000,
      }),
  });

  const studentOption = useMemo(() => {
    if (studentData?.data) {
      return studentData.data.map((item) => ({
        value: String(item.studentId),
        label: `${item.name} (${item.center})`,
      }));
    }
    return [];
  }, [studentData?.data]);

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

  const onSelectedRowsChange = useCallback((rows: StudentAttendanceDay[]) => {
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
    try {
      const attendanceIds = selectedRows.map((item) => item.id);
      await deleteStudentAttendance(attendanceIds);
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
    }
  }, [showSnackbar, refetch, selectedRows]);

  const onConfirm = useCallback(
    async (status: boolean, ids?: string[]) => {
      try {
        if (showModal === 'EDIT' || showModal === 'ADD') {
          const params = (ids ?? []).map((item) => ({
            studentId: ids ? Number(item) : undefined,
            date: date ?? '',
            attendance: status,
          }));
          await markStudentAttendance(params);
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
      }
    },
    [date, refetch, showSnackbar, showModal],
  );

  return useMemo(
    () => ({
      data,
      sort,
      search,
      disableEdit,
      disableDelete,
      showModal,
      studentOption,
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
      studentOption,
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

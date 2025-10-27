import { useQuery } from '@tanstack/react-query';
import {
  addStudentSalary,
  deleteStudentFees,
  getStudentFees,
  updateStudentFees,
} from '../repositories';
import { useCallback, useState, useEffect } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useParams } from 'react-router-dom';
import type { StudentFeesRequest } from '../types';
import { useSnackbar } from '../state';

const useStudentFees = () => {
  const { studentId } = useParams<{ studentId: string }>();
  const { showSnackbar } = useSnackbar();
  const isMobile = useMediaQuery('(max-width:600px)');
  const [activeView, setActiveView] = useState<'grid' | 'list'>(isMobile ? 'grid' : 'list');
  const [search, setSearch] = useState<string | null | undefined>(null);
  const [debouncedSearch, setDebouncedSearch] = useState<string | null | undefined>(null);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [sort, setSort] = useState<{
    orderBy: string;
    order: 'asc' | 'desc';
  } | null>(null);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['studentFees', studentId, debouncedSearch, page, rowsPerPage, sort],
    queryFn: () =>
      getStudentFees({
        page: page,
        size: rowsPerPage,
        search: debouncedSearch as string | undefined,
        studentId: Number(studentId),
        ...(sort
          ? {
              sortBy: sort.orderBy,
              order: (sort.order ?? 'asc').toUpperCase() === 'DESC' ? 'DESC' : 'ASC',
            }
          : {}),
      }),
  });

  const handleViewToggle = useCallback((view: 'grid' | 'list') => {
    setActiveView(view);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setPage(page);
  }, []);

  const handleSort = useCallback((orderBy: string, order?: 'asc' | 'desc') => {
    setSort({ orderBy: orderBy, order: order === 'asc' ? 'desc' : 'asc' });
  }, []);

  const handleRowPerPageChange = useCallback((rowsPerPage: number) => {
    setRowsPerPage(rowsPerPage);
    setPage(1);
  }, []);

  const handleSearch = useCallback((search: string) => {
    setSearch(search);
  }, []);

  const handleGridSort = useCallback((order: 'asc' | 'desc') => {
    setSort({ orderBy: 'name', order });
  }, []);

  const handleAdd = useCallback(
    async (salary: StudentFeesRequest) => {
      try {
        await addStudentSalary({ ...salary, studentId: Number(studentId) });
        showSnackbar({ message: 'Student fees added successfully', severity: 'success' });
        refetch();
      } catch (error) {
        showSnackbar({
          message: error instanceof Error ? error.message : 'Failed to add salary',
          severity: 'error',
        });
      }
    },
    [showSnackbar, refetch, studentId],
  );

  const handleUpdate = useCallback(
    async (salary: StudentFeesRequest) => {
      try {
        await updateStudentFees({ ...salary, studentId: Number(studentId) });
        showSnackbar({ message: 'Student fees updated successfully', severity: 'success' });
        refetch();
      } catch (error) {
        showSnackbar({
          message: error instanceof Error ? error.message : 'Failed to update salary',
          severity: 'error',
        });
      }
    },
    [studentId, showSnackbar, refetch],
  );

  const handleDelete = useCallback(
    async (id: number) => {
      try {
        await deleteStudentFees(id);
        showSnackbar({ message: 'Student fees deleted successfully', severity: 'success' });
        refetch();
      } catch (error) {
        showSnackbar({
          message: error instanceof Error ? error.message : 'Failed to delete salary',
          severity: 'error',
        });
      }
    },
    [showSnackbar, refetch],
  );

  return {
    data,
    isLoading,
    error,
    activeView,
    sort,
    page,
    rowsPerPage,
    search,
    studentId,
    handleViewToggle,
    handleRowPerPageChange,
    handlePageChange,
    handleSort,
    handleSearch,
    handleGridSort,
    handleAdd,
    handleUpdate,
    handleDelete,
  };
};
export default useStudentFees;

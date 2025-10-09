import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  addStaffSalary,
  deleteStaffSalary,
  getStaffSalary,
  updateStaffSalary,
} from '../repositories';
import { useCallback, useState, useEffect } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useParams } from 'react-router-dom';
import type { StaffSalaryType } from '../types';
import { useSnackbar } from '../state';

const useStaffSalary = () => {
  const { staffId } = useParams<{ staffId: string }>();
  const queryClient = useQueryClient();
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

  const { data, isLoading, error } = useQuery({
    queryKey: ['staffSalary', staffId, debouncedSearch, page, rowsPerPage, sort],
    queryFn: () =>
      getStaffSalary({
        page: page,
        size: rowsPerPage,
        search: debouncedSearch as string | undefined,
        staffId: Number(staffId),
        ...(sort
          ? {
              sortBy: sort.orderBy,
              order: (sort.order ?? 'asc').toUpperCase() === 'DESC' ? 'DESC' : 'ASC',
            }
          : {}),
      }),
  });

  const { mutate: addSalary } = useMutation({
    mutationFn: addStaffSalary,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['staffSalary'] });
      showSnackbar({ message: 'Salary added successfully', severity: 'success' });
    },
    onError: () => {
      showSnackbar({ message: 'Failed to add salary', severity: 'error' });
    },
  });

  const { mutate: updateSalary } = useMutation({
    mutationFn: updateStaffSalary,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['staffSalary'] });
      showSnackbar({ message: 'Salary updated successfully', severity: 'success' });
    },
    onError: () => {
      showSnackbar({ message: 'Failed to update salary', severity: 'error' });
    },
  });

  const { mutate: deleteSalary } = useMutation({
    mutationFn: deleteStaffSalary,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['staffSalary'] });
      showSnackbar({ message: 'Salary deleted successfully', severity: 'success' });
    },
    onError: () => {
      showSnackbar({ message: 'Failed to delete salary', severity: 'error' });
    },
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
    (salary: StaffSalaryType) => {
      addSalary({ ...salary, staffId: Number(staffId) });
    },
    [addSalary, staffId],
  );

  const handleUpdate = useCallback(
    (salary: StaffSalaryType) => {
      updateSalary({ ...salary, staffId: Number(staffId) });
    },
    [updateSalary, staffId],
  );

  const handleDelete = useCallback(
    (id: number) => {
      deleteSalary(id);
    },
    [deleteSalary],
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
export default useStaffSalary;

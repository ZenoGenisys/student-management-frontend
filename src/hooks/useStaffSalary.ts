import { useQuery } from '@tanstack/react-query';
import {
  addStaffSalary,
  deleteStaffSalary,
  getStaffSalary,
  updateStaffSalary,
} from '../repositories';
import { useCallback, useState, useEffect } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useParams } from 'react-router-dom';
import type { StaffSalaryRequest } from '../types';
import { useLoading, useSnackbar } from '../state';

const useStaffSalary = () => {
  const { staffId } = useParams<{ staffId: string }>();
  const { showSnackbar } = useSnackbar();
  const { setLoading } = useLoading();
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

  const { data, error, refetch } = useQuery({
    queryKey: ['staffSalary', staffId, debouncedSearch, page, rowsPerPage, sort],
    queryFn: async () => {
      setLoading(true);
      try {
        const response = await getStaffSalary({
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
        });
        return response;
      } finally {
        setLoading(false);
      }
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
    async (salary: StaffSalaryRequest) => {
      setLoading(true);
      try {
        await addStaffSalary({ ...salary, staffId: Number(staffId) });
        showSnackbar({ message: 'Salary added successfully', severity: 'success' });
        refetch();
      } catch (error) {
        showSnackbar({
          message: error instanceof Error ? error.message : 'Failed to add salary',
          severity: 'error',
        });
      } finally {
        setLoading(false);
      }
    },
    [showSnackbar, refetch, staffId, setLoading],
  );

  const handleUpdate = useCallback(
    async (salary: StaffSalaryRequest) => {
      setLoading(true);
      try {
        await updateStaffSalary({ ...salary, staffId: Number(staffId) });
        showSnackbar({ message: 'Salary updated successfully', severity: 'success' });
        refetch();
      } catch (error) {
        showSnackbar({
          message: error instanceof Error ? error.message : 'Failed to update salary',
          severity: 'error',
        });
      } finally {
        setLoading(false);
      }
    },
    [staffId, showSnackbar, refetch, setLoading],
  );

  const handleDelete = useCallback(
    async (id: number) => {
      setLoading(true);
      try {
        await deleteStaffSalary(id);
        showSnackbar({ message: 'Salary deleted successfully', severity: 'success' });
        refetch();
      } catch (error) {
        showSnackbar({
          message: error instanceof Error ? error.message : 'Failed to delete salary',
          severity: 'error',
        });
      } finally {
        setLoading(false);
      }
    },
    [showSnackbar, refetch, setLoading],
  );

  return {
    data,
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

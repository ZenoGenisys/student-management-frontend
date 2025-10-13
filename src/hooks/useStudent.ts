import { useQuery } from '@tanstack/react-query';
import { deleteStudent, getStudent } from '../repositories';
import { useCallback, useState, useEffect } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from '../state';
import { PATH } from '../routes';

const useStudent = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:600px)');
  const [activeView, setActiveView] = useState<'grid' | 'list'>(isMobile ? 'grid' : 'list');
  const [search, setSearch] = useState<string | undefined>();
  const [debouncedSearch, setDebouncedSearch] = useState<string | undefined>();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [sort, setSort] = useState<{
    orderBy: string;
    order: 'asc' | 'desc';
  } | null>(null);
  const { showSnackbar } = useSnackbar();

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
    queryKey: ['student', debouncedSearch, page, rowsPerPage, sort],
    queryFn: () =>
      getStudent({
        page: page,
        size: rowsPerPage,
        search: debouncedSearch,
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

  const handleView = useCallback(
    (id: number) => {
      navigate(PATH.STUDENT_DETAILS.replace(':studentId', id.toString()));
    },
    [navigate],
  );

  const handleEdit = useCallback(
    (id: number) => {
      navigate(PATH.EDIT_STUDENT.replace(':studentId', id.toString()));
    },
    [navigate],
  );

  const handleDelete = useCallback(
    async (id: number) => {
      try {
        await deleteStudent(id);
        refetch();
        showSnackbar({
          message: 'Student deleted successfully!',
          severity: 'success',
        });
      } catch (error) {
        showSnackbar({
          message: (error as Error).message || 'Failed to delete student.',
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
    handleViewToggle,
    handleRowPerPageChange,
    handlePageChange,
    handleSort,
    handleSearch,
    handleGridSort,
    handleEdit,
    handleDelete,
    handleView,
  };
};
export default useStudent;

import { useQuery } from '@tanstack/react-query';
import { getStaffSalary } from '../repositories';
import { useCallback, useState, useEffect } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useParams } from 'react-router-dom';

const useStaffSalary = () => {
  const { staffId } = useParams<{ staffId: string }>();
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
  };
};
export default useStaffSalary;

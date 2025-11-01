import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  getDashboardSummary,
  getExport,
  getFeesPendingList,
  getRevenueGraph,
} from '../repositories';
import { useLoading, useSnackbar } from '../state';

const useDashboard = () => {
  const { showSnackbar } = useSnackbar();
  const { setLoading } = useLoading();
  const [showBackground, setShowBackground] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // First fade in the background
    setShowBackground(true);

    // Then fade in the content after background is visible
    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 600);

    return () => clearTimeout(contentTimer);
  }, []);

  const { data: dashboardSummary } = useQuery({
    queryKey: ['dashboard-summary'],
    queryFn: async () => {
      setLoading(true);
      try {
        const response = await getDashboardSummary();
        return response;
      } finally {
        setLoading(false);
      }
    },
  });

  const { data: feesPendingList } = useQuery({
    queryKey: ['fees-pending'],
    queryFn: async () => {
      setLoading(true);
      try {
        const response = await getFeesPendingList();
        return response;
      } finally {
        setLoading(false);
      }
    },
  });

  const { data: revenueData } = useQuery({
    queryKey: ['revenue-graph'],
    queryFn: async () => {
      setLoading(true);
      try {
        const response = await getRevenueGraph();
        return response;
      } finally {
        setLoading(false);
      }
    },
  });

  const onExport = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getExport();
      const url = window.URL.createObjectURL(response);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'export.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
      showSnackbar({
        message: 'Data exported successfully!',
        severity: 'success',
      });
    } catch (error) {
      showSnackbar({
        message: (error as Error).message || 'Failed to export data.',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  }, [showSnackbar, setLoading]);

  return useMemo(
    () => ({
      dashboardSummary,
      feesPendingList,
      showBackground,
      showContent,
      revenueData,
      onExport,
    }),
    [dashboardSummary, feesPendingList, showBackground, showContent, revenueData, onExport],
  );
};

export default useDashboard;

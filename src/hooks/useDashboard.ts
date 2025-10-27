import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { getDashboardSummary, getFeesPendingList, getRevenueGraph } from '../repositories';

const useDashboard = () => {
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
    queryFn: () => getDashboardSummary(),
  });

  const { data: feesPendingList } = useQuery({
    queryKey: ['fees-pending'],
    queryFn: () => getFeesPendingList(),
  });

  const { data: revenueData } = useQuery({
    queryKey: ['revenue-graph'],
    queryFn: () => getRevenueGraph(),
  });

  return useMemo(
    () => ({
      dashboardSummary,
      feesPendingList,
      showBackground,
      showContent,
      revenueData,
    }),
    [dashboardSummary, feesPendingList, showBackground, showContent, revenueData],
  );
};

export default useDashboard;

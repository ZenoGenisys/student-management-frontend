import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { getDashboardSummary, getFeesPendingList } from '../repositories';

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

  return useMemo(
    () => ({
      dashboardSummary,
      feesPendingList,
      showBackground,
      showContent,
    }),
    [dashboardSummary, feesPendingList, showBackground, showContent],
  );
};

export default useDashboard;

import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { getDashboardSummary } from '../repositories';

const useDashboard = () => {
  const { data: dashboardSummary } = useQuery({
    queryKey: ['dashboard-summary'],
    queryFn: () => getDashboardSummary(),
  });
  return useMemo(
    () => ({
      dashboardSummary,
    }),
    [dashboardSummary],
  );
};

export default useDashboard;

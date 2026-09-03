import { useQuery } from '@tanstack/react-query';
import { DashboardSummaryParams, dashboardApi } from '@/api/dashboard.api';

export const useDashboardSummary = (params?: DashboardSummaryParams) => {
  return useQuery({
    queryKey: ['dashboardSummary', params],
    queryFn: () => dashboardApi(params),
  });
};

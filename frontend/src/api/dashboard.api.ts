import { DashboardSummary } from '@/types/dashboard';
import { api } from './axios';

export interface DashboardSummaryParams {
  year?: number;
  month?: number;
}

export const dashboardApi = async (params?: DashboardSummaryParams): Promise<DashboardSummary> => {
  const { data } = await api.get<DashboardSummary>('/dashboard', { params });
  return data;
};

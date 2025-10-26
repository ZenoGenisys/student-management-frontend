import { API_PATH } from '../config';
import type { DashboardSummary } from '../types';
import { getHttpClient } from './AxiosClient';

export const getDashboardSummary = (): Promise<DashboardSummary> => {
  return getHttpClient(`${API_PATH.DASHBOARD_SUMMARY}`, 'GET');
};

import { API_PATH } from '../config';
import type { DashboardSummary, FeesPending } from '../types';
import { getHttpClient } from './AxiosClient';

export const getDashboardSummary = (): Promise<DashboardSummary> => {
  return getHttpClient(`${API_PATH.DASHBOARD_SUMMARY}`, 'GET');
};

export const getFeesPendingList = (): Promise<FeesPending[]> => {
  return getHttpClient(`${API_PATH.FEES_PENDING_LIST}`, 'GET');
};

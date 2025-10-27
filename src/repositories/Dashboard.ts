import { API_PATH } from '../config';
import type { DashboardSummary, FeesPending, RevenueGraphResponse } from '../types';
import { getHttpClient } from './AxiosClient';

export const getDashboardSummary = (): Promise<DashboardSummary> => {
  return getHttpClient(`${API_PATH.DASHBOARD_SUMMARY}`, 'GET');
};

export const getFeesPendingList = (): Promise<FeesPending[]> => {
  return getHttpClient(`${API_PATH.FEES_PENDING_LIST}`, 'GET');
};

export const getRevenueGraph = (
  startDate?: Date,
  endDate?: Date,
): Promise<RevenueGraphResponse> => {
  return getHttpClient(`${API_PATH.REVENUE_GRAPH}`, 'GET', null, { startDate, endDate });
};

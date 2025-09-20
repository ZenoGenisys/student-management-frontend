import { API_PATH } from '../config';
import type { GetStaffRequest, Staff } from '../types';
import { getHttpClient } from './AxiosClient';

export const getStaff = (params: GetStaffRequest): Promise<Staff[]> => {
  return getHttpClient(API_PATH.STAFF, 'GET', { params });
};

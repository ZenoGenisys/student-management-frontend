import { API_PATH } from '../config';
import type { GetStaffRequest, StaffResponse } from '../types';
import { getHttpClient } from './AxiosClient';

export const getStaff = (params: GetStaffRequest): Promise<StaffResponse> => {
  return getHttpClient(API_PATH.STAFF, 'GET', null, params);
};

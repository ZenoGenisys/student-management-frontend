import { API_PATH } from '../config';
import type { GetStaffRequest, StaffResponse } from '../types';
import { getHttpClient } from './AxiosClient';

export const getStaff = (params: GetStaffRequest): Promise<StaffResponse> => {
  return getHttpClient(API_PATH.STAFF, 'GET', null, params);
};

export const getStaffById = (staffId: string): Promise<StaffResponse> => {
  return getHttpClient(`${API_PATH.STAFF}/${staffId}`, 'GET');
};

export const createStaff = (staffData: any): Promise<StaffResponse> => {
  return getHttpClient(API_PATH.STAFF, 'POST', staffData);
};

export const updateStaff = (staffData: any): Promise<StaffResponse> => {
  return getHttpClient(API_PATH.STAFF, 'PUT', staffData);
};

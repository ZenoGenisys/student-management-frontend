import { API_PATH } from '../config';
import type { CreateStaff, GetStaffRequest, StaffResponse, StaffType } from '../types';
import { getHttpClient } from './AxiosClient';

export const getStaff = (params: GetStaffRequest): Promise<StaffResponse> => {
  return getHttpClient(API_PATH.STAFF, 'GET', null, params);
};

export const getStaffById = (staffId: string): Promise<StaffType> => {
  return getHttpClient(`${API_PATH.STAFF}/${staffId}`, 'GET');
};

export const createStaff = (staffData: CreateStaff): Promise<StaffType> => {
  return getHttpClient(API_PATH.STAFF, 'POST', staffData);
};

export const updateStaff = (staffData: CreateStaff): Promise<StaffType> => {
  return getHttpClient(API_PATH.STAFF, 'PUT', staffData);
};

export const deleteStaff = (staffId: number): Promise<string> => {
  return getHttpClient(`${API_PATH.STAFF}/${staffId}`, 'DELETE');
};

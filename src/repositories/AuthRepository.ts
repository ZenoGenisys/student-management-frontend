import { API_PATH } from '../config';
import type { LoginResponse, StatusResponse } from '../types';
import { getHttpClient } from './AxiosClient';

export const loginService = (email: string, password: string): Promise<LoginResponse> => {
  return getHttpClient(API_PATH.LOGIN, 'POST', { email, password });
};

export const statusService = (): Promise<StatusResponse> => {
  return getHttpClient(API_PATH.STATUS, 'GET');
};

export const promoteStaff = (
  staffId: number,
  role: 'ADMIN' | 'STAFF',
  password: string,
): Promise<string> => {
  const data = { staffId, role, password };
  return getHttpClient(API_PATH.PROMOTE_STAFF, 'POST', data);
};

export const revokeStaffPromotion = (staffId: number): Promise<string> => {
  return getHttpClient(`${API_PATH.REVOKE_STAFF_PROMOTION}/${staffId}`, 'DELETE');
};

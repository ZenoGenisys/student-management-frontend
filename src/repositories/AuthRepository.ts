import { API_PATH } from '../config';
import type { LoginResponse } from '../types';
import { getHttpClient } from './AxiosClient';

export const loginService = (
  email: string,
  password: string,
): Promise<LoginResponse> => {
  return getHttpClient(API_PATH.LOGIN, 'POST', { email, password });
};

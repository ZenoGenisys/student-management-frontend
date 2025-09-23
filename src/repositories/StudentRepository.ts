import { API_PATH } from '../config';
import type { GetStudentRequest, StudentResponse } from '../types';
import { getHttpClient } from './AxiosClient';

export const getStudent = (params: GetStudentRequest): Promise<StudentResponse> => {
  return getHttpClient(API_PATH.STUDENT, 'GET', null, params);
};

import { API_PATH } from '../config';
import type { GetStudentRequest, StudentResponse, StudentType } from '../types';
import { getHttpClient } from './AxiosClient';

export const getStudent = (params: GetStudentRequest): Promise<StudentResponse> => {
  return getHttpClient(API_PATH.STUDENT, 'GET', null, params);
};

export const getStudentById = (id: string): Promise<StudentType> => {
  return getHttpClient(`${API_PATH.STUDENT}/${id}`, 'GET');
};

export const deleteStudent = (id: number): Promise<string> => {
  return getHttpClient(`${API_PATH.STUDENT}/${id}`, 'DELETE');
};

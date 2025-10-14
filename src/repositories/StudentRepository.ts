import { API_PATH } from '../config';
import type { CreateStudent, GetStudentRequest, StudentResponse, StudentType } from '../types';
import { getHttpClient } from './AxiosClient';

export const getStudent = (params: GetStudentRequest): Promise<StudentResponse> => {
  return getHttpClient(API_PATH.STUDENT, 'GET', null, params);
};

export const getStudentById = (id: string): Promise<StudentType> => {
  return getHttpClient(`${API_PATH.STUDENT}/${id}`, 'GET');
};

export const createStudent = (staffData: CreateStudent): Promise<StudentType> => {
  return getHttpClient(API_PATH.STUDENT, 'POST', staffData);
};

export const updateStudent = (staffData: CreateStudent): Promise<StudentType> => {
  return getHttpClient(API_PATH.STUDENT, 'PUT', staffData);
};

export const deleteStudent = (id: number): Promise<string> => {
  return getHttpClient(`${API_PATH.STUDENT}/${id}`, 'DELETE');
};

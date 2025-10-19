import { API_PATH } from '../config';
import type {
  AttendanceSummaryRequest,
  AttendanceSummaryResponse,
  CreateStudent,
  GetStudentAttendanceRequest,
  GetStudentRequest,
  MarkStudentAttendanceRequest,
  StudentAttendanceResponse,
  StudentResponse,
  StudentType,
} from '../types';
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

// Student Attendance APIs
export const getStudentAttendance = (
  params?: GetStudentAttendanceRequest,
): Promise<StudentAttendanceResponse> => {
  return getHttpClient(`${API_PATH.STUDENT_ATTENDANCE}`, 'GET', null, params);
};

export const getStudentAttendanceSummary = (
  params?: AttendanceSummaryRequest,
): Promise<AttendanceSummaryResponse> => {
  return getHttpClient(`${API_PATH.STAFF_ATTENDANCE_SUMMARY}`, 'GET', null, params);
};

export const markStudentAttendance = (
  data: MarkStudentAttendanceRequest[],
): Promise<{ message: string }> => {
  return getHttpClient(`${API_PATH.STUDENT_ATTENDANCE}`, 'POST', data);
};

export const deleteStudentAttendance = (attendanceIds?: number[]): Promise<string> => {
  return getHttpClient(`${API_PATH.STUDENT_ATTENDANCE}`, 'DELETE', null, { attendanceIds });
};

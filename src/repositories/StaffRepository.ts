import { API_PATH } from '../config';
import type {
  CreateStaff,
  GetStaffAttendanceRequest,
  GetStaffRequest,
  getStaffSalaryRequest,
  MarkAttendanceRequest,
  StaffAttendanceResponse,
  StaffResponse,
  StaffSalaryResponse,
  StaffType,
  StaffSalaryType,
  StaffSalaryRequest,
} from '../types';
import { getHttpClient } from './AxiosClient';

// Staff APIs
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

// Staff Salary APIs
export const getStaffSalary = (params: getStaffSalaryRequest): Promise<StaffSalaryResponse> => {
  return getHttpClient(`${API_PATH.STAFF_SALARY}`, 'GET', null, params);
};

export const addStaffSalary = (salaryData: StaffSalaryRequest): Promise<StaffSalaryType> => {
  return getHttpClient(API_PATH.STAFF_SALARY, 'POST', salaryData);
};

export const updateStaffSalary = (salaryData: StaffSalaryRequest): Promise<StaffSalaryType> => {
  return getHttpClient(API_PATH.STAFF_SALARY, 'PUT', salaryData);
};

export const deleteStaffSalary = (id: number): Promise<string> => {
  return getHttpClient(API_PATH.STAFF_SALARY, 'DELETE', null, { id });
};

// Staff Attendance APIs
export const getStaffAttendance = (
  params?: GetStaffAttendanceRequest,
): Promise<StaffAttendanceResponse> => {
  return getHttpClient(`${API_PATH.STAFF_ATTENDANCE}`, 'GET', null, params);
};

export const markAttendance = (data: MarkAttendanceRequest[]): Promise<{ message: string }> => {
  return getHttpClient(`${API_PATH.STAFF_ATTENDANCE}`, 'POST', data);
};

export const deleteStaffAttendance = (attendanceIds?: number[]): Promise<string> => {
  return getHttpClient(`${API_PATH.STAFF_ATTENDANCE}`, 'DELETE', null, { attendanceIds });
};

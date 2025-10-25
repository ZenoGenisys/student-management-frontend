import { API_PATH } from '../config';
import type {
  AttendanceSummary,
  getStudentAttendanceForDayRequest,
  StudentAttendanceDay,
} from '../types';
import { getHttpClient } from './AxiosClient';

export const getAttendanceSummary = (year: number): Promise<AttendanceSummary[]> => {
  return getHttpClient(`${API_PATH.ATTENDANCE_SUMMARY}/${year}`, 'GET');
};

export const getStudentAttendanceForDay = (
  params: getStudentAttendanceForDayRequest,
): Promise<StudentAttendanceDay[]> => {
  return getHttpClient(`${API_PATH.STUDENT_ATTENDANCE_DAY}`, 'GET', null, params);
};

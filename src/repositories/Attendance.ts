import { API_PATH } from '../config';
import type { AttendanceSummary } from '../types';
import { getHttpClient } from './AxiosClient';

export const getAttendanceSummary = (year: number): Promise<AttendanceSummary[]> => {
  return getHttpClient(`${API_PATH.ATTENDANCE_SUMMARY}/${year}`, 'GET');
};

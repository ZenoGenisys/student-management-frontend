import type { Dayjs } from 'dayjs';
import type { PaginationType } from './ListViewType';
import type dayjs from 'dayjs';

export type GetStaffRequest = {
  page: number;
  size: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
};

export type LevelDetails = {
  level: number;
  date: string | Dayjs | null;
  document: string;
  remarks: string;
};

export type StaffType = {
  staffId: number;
  name: string;
  gender: string;
  joiningDate: string;
  dateOfBirth: string;
  age: number;
  maritalStatus: string;
  contactNumber: string;
  email: string;
  address: string;
  qualification: string;
  experience: number;
  center: string;
  level: number;
  bloodGroup: string;
  additionalDetails: string;
  status: 'Active' | 'Inactive';
  role: 'ADMIN' | 'STAFF' | null;
  levelDetails?: LevelDetails[];
};

export type CreateStaff = {
  staffId?: number;
  name: string;
  gender: string;
  joiningDate: string | Dayjs | null;
  dateOfBirth: string | Dayjs | null;
  maritalStatus: string;
  contactNumber: string;
  email: string;
  address: string;
  qualification: string;
  experience: number;
  center: string;
  status: 'Active' | 'Inactive';
  bloodGroup: string;
  additionalDetails: string;
  levelDetails?: LevelDetails[];
};

export type StaffResponse = {
  data: StaffType[];
  pagination: PaginationType;
};

export type getStaffSalaryRequest = {
  page: number;
  size: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
  staffId?: number;
  dateFrom?: string;
  dateTo?: string;
};

export type Payment = 'Online' | 'Cash';

export type StaffSalaryRequest = {
  feesId?: number;
  staffId?: number;
  mode: Payment;
  amount: number;
  paymentDate: string | dayjs.Dayjs | null;
  salaryMonth: string;
};

export type StaffSalaryType = {
  feesId: number;
  staffId: number;
  mode: Payment;
  salaryFor: string;
  amount: number;
  paymentDate: Date | null;
  salaryMonth: string;
  updatedBy?: string;
};

export type StaffSalaryResponse = {
  data: StaffSalaryType[];
  pagination: PaginationType;
};

export type GetStaffAttendanceRequest = {
  page?: number;
  size?: number;
  staffId?: number;
  search?: string;
  dateFrom?: string;
  dateTo?: string;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
};

export type StaffAttendanceType = {
  attendanceId: number;
  staffId: number;
  name: string;
  email: string;
  center: string;
  date: string;
  attendance: boolean;
};

export type StaffAttendanceResponse = {
  data: StaffAttendanceType[];
  pagination: PaginationType;
};

export type MarkStaffAttendanceRequest = {
  attendanceId?: number;
  staffId?: number;
  date: string;
  attendance: boolean;
};

export type AttendanceSummaryRequest = {
  id: number;
  startDate?: Date | string;
  endDate?: Date | string;
};

export type AttendanceSummaryResponse = {
  presentCount: number;
  absentCount: number;
  totalCount: number;
  lastAttendanceDate: Date;
};

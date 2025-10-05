import type { Dayjs } from 'dayjs';
import type { PaginationType } from './ListViewType';

export type GetStaffRequest = {
  page: number;
  size: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
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
};

export type CreateStaff = {
  staffId?: number;
  name: string;
  gender: string;
  joiningDate: Dayjs | null;
  dateOfBirth: Dayjs | null;
  maritalStatus: string;
  contactNumber: string;
  email: string;
  address: string;
  qualification: string;
  experience: number;
  center: string;
  level: number;
  status: 'Active' | 'Inactive';
  bloodGroup: string;
  additionalDetails: string;
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

export type StaffSalaryType = {
  feesId: number;
  staffId: number;
  name: string;
  email: string;
  mode: string;
  amount: number;
  date: string;
  updatedBy: string | null;
};

export type StaffSalaryResponse = {
  data: StaffSalaryType[];
  pagination: PaginationType;
};

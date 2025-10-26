import type { Dayjs } from 'dayjs';
import type { LevelDetails, Payment } from './Staff';
import type { PaginationType } from './ListViewType';

export type GetStudentRequest = {
  page: number;
  size: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
  status?: 'Active' | 'Inactive';
};

export type ParentDetails = {
  parentId?: number;
  fatherName: string;
  fatherPhoneNumber: string;
  fatherEmail: string;
  fatherOccupation: string;
  motherName: string;
  motherPhoneNumber: string;
  motherEmail: string;
  motherOccupation: string;
};

export type StudentType = {
  studentId: number;
  name: string;
  dateOfBirth: string;
  age: number;
  gender: string;
  schoolName: string;
  grade: string;
  joiningDate: string;
  level: string;
  status: 'Active' | 'Inactive';
  center: string;
  batch: string[];
  createdAt: Date;
  modifiedAt: Date;
  contactNumber: string;
  email: string;
  address: string;
  bloodGroup: string;
  studentType: 'regular' | 'crash_course';
  amount: number;
  primaryContactNumber?: string;
  levelDetails?: LevelDetails[];
  parentDetails?: ParentDetails;
  additionalDetails?: string;
};

export type StudentResponse = {
  data: StudentType[];
  pagination: {
    totalRows: number;
    totalPages: number;
    currentPage: number;
  };
};

export type CreateStudent = {
  studentId?: number;
  name: string;
  gender: string;
  joiningDate: string | Dayjs | null;
  dateOfBirth: string | Dayjs | null;
  schoolName: string;
  grade: string;
  primaryContactNumber: string;
  email: string;
  address: string;
  batch: string[];
  center: string;
  status: 'Active' | 'Inactive';
  additionalDetails: string;
  bloodGroup: string;
  studentType: string;
  amount: number;
  levelDetails?: LevelDetails[];
  parentDetails?: ParentDetails;
};

export type GetStudentAttendanceRequest = {
  page?: number;
  size?: number;
  staffId?: number;
  search?: string;
  dateFrom?: string;
  dateTo?: string;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
};

export type StudentAttendanceType = {
  attendanceId: number;
  studentId: number;
  name: string;
  email: string;
  center: string;
  date: string;
  attendance: boolean;
};

export type StudentAttendanceResponse = {
  data: StudentAttendanceType[];
  pagination: PaginationType;
};

export type MarkStudentAttendanceRequest = {
  attendanceId?: number;
  studentId?: number;
  date: string;
  attendance: boolean;
};

export type getStudentFeesRequest = {
  page: number;
  size: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
  studentId?: number;
  paymentMonth?: string;
};

export type StudentFeesType = {
  feesId: number;
  studentId: number;
  name: string;
  email: string;
  level: number;
  mode: string;
  amount: number;
  outstandingAmount: number;
  paymentDate: string;
  paymentMonth: string;
  updatedBy: string;
};

export type StudentFeesResponse = {
  data: StudentFeesType[];
  pagination: PaginationType;
};

export type StudentFeesRequest = {
  feesId?: number;
  studentId?: number;
  mode: Payment;
  amount: number;
  paymentDate: Date | null;
  paymentMonth: string;
};

export type getOutstandingStudentFeesRequest = {
  studentId: number;
  paymentMonth: string;
  feesId?: number;
};

export type OutstandingStudentFeesResponse = {
  outstandingAmount: number;
};

import type { LevelDetails } from './Staff';

export type GetStudentRequest = {
  page: number;
  size: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
};

export type ParentDetails = {
  parentId: number;
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
  studentType?: string;
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
  joiningDate: string;
  dateOfBirth: string;
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
  levelDetails?: LevelDetails[];
  parentDetails?: ParentDetails;
};

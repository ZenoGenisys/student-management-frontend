export type GetStudentRequest = {
  page: number;
  size: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
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
  learningLevel: string;
  status: string;
  center: string;
  batch: string;
  primaryContactNumber: string;
  email: string;
  address: string;
};

export type StudentResponse = {
  data: StudentType[];
  pagination: {
    totalRows: number;
    totalPages: number;
    currentPage: number;
  };
};

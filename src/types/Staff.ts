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
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string | null;
  status: 'Active' | 'Inactive';
};

export type CreateStaff = {
  staffId?: number;
  name: string;
  gender: string;
  joiningDate: string;
  dateOfBirth: string;
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
  pagination: {
    totalRows: number;
    totalPages: number;
    currentPage: number;
  };
};

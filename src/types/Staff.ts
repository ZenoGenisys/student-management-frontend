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
  workLocation: string;
  status: string;
  role: string;
};

export type StaffResponse = {
  data: StaffType[];
  pagination: {
    totalRows: number;
    totalPages: number;
    currentPage: number;
  };
};

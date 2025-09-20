export type GetStaffRequest = {
  page: number;
  size: number;
  search?: string;
};

export type Staff = {
  staff_id: number;
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
};

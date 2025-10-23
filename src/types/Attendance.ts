export type AttendanceSummary = {
  date: string;
  userType: 'student' | 'staff';
  status: 'present' | 'absent';
  count: number;
};

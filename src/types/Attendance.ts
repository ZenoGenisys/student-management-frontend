export type getStudentAttendanceForDayRequest = {
  date: string;
  search?: string;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
};

export type AttendanceSummary = {
  date: string;
  userType: 'student' | 'staff';
  status: 'present' | 'absent';
  count: number;
};

export type StudentAttendanceDay = {
  studentId: number;
  id: number;
  name: string;
  profileUrl: string;
  attendance: 'present' | 'absent' | 'not marked';
  batch: string[];
  center: string;
};

export type StaffAttendanceDay = {
  staffId: number;
  id: number;
  name: string;
  profileUrl: string;
  attendance: 'present' | 'absent' | 'not marked';
  center: string;
};

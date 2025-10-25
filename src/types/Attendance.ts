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
  attendance: 'present' | 'absent' | 'not marked';
  batch: string[];
  center: string;
};

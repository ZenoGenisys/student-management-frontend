import { type Event } from 'react-big-calendar';

export interface AttendanceEvent extends Event {
  status: 'present' | 'absent';
  type: 'student' | 'staff';
}
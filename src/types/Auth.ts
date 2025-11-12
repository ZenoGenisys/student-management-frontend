import type { Role } from '../state/authContext.type';

export type LoginResponse = {
  token: string;
};

export type StatusResponse = {
  email: string;
  role: Role;
  name: string;
  staffId?: string;
  profileUrl?: string;
};

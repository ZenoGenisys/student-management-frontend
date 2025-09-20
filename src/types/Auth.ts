import type { Role } from '../state/authContext.type';

export type LoginResponse = {
  email: string;
  token: string;
  role: Role;
};

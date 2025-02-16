import { USER_ROLE } from '../users/user.constant';

export type TUserRole = keyof typeof USER_ROLE;

export type TTokenResponse = {
  name: string;
  email: string;
  role: string;
  userId: string;
  iat: number;
  exp: number;
};

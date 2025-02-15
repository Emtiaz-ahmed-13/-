export const USER_ROLE = {
  admin: 'admin',
  user: 'user',
} as const;

export type TUserRole = keyof typeof USER_ROLE;

export type TTokenResponse = {
  name: string;
  email: string;
  role: string;
  userId: string;
  iat: number;
  exp: number;
};

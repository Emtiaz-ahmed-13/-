import { JwtPayload } from 'jsonwebtoken';

import { TTokenResponse } from './app/modules/Auth/auth.interface';
export type TTokenResponse = {
  email: string;
  role: 'admin' | 'user';
  exp: number;
  iat: number;
};

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload | TTokenResponse;
    }
  }
}

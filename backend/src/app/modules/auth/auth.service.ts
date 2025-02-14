import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { StatusCodes } from 'http-status-codes';
import config from '../../config';
import AppError from '../../errors/AppError';
import { IUser } from '../users/user.interface';
import User from '../users/user.model';
import { createToken } from './auth.utils';

const getConfigValue = (
  key: keyof typeof config,
  defaultValue: string,
): string => {
  const value = config[key];
  if (!value) {
    throw new Error(`Configuration key ${key} is missing`);
  }
  return value;
};

const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = parseInt(getConfigValue('bcrypt_salt_round', '10'), 10);
  return bcrypt.hash(password, saltRounds);
};

type JwtTokens = {
  accessToken: string;
  refreshToken: string;
};

const createJwtTokens = (userId: string, role: string): JwtTokens => {
  const jwtPayload = { userId, role };
  const accessToken = createToken(
    jwtPayload,
    getConfigValue('jwt_access_secret', ''),
    getConfigValue('jwt_access_expires_in', ''),
  );
  const refreshToken = createToken(
    jwtPayload,
    getConfigValue('jwt_refresh_secret', ''),
    getConfigValue('jwt_refresh_expires_in', ''),
  );
  return { accessToken, refreshToken };
};

interface RegisterUserResponse {
  _id: string;
  name: string;
  email: string;
  accessToken: string;
  refreshToken: string;
}

const register = async (payload: IUser) => {
  const result = await User.create(payload);

  return result;
};

interface LoginUserResponse {
  accessToken: string;
  refreshToken: string;
  needsPasswordChange: boolean;
}

const login = async (payload: { email: string; password: string }) => {
  const user = await User.findOne({ email: payload?.email }).select(
    '+password',
  );

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }

  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    user?.password,
  );

  if (!isPasswordMatched) {
    throw new AppError(StatusCodes.FORBIDDEN, 'Wrong Password !!');
  }

  const userStatus = user?.isBlocked;

  if (userStatus) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked ! !');
  }

  const jwtPayload = {
    name: user?.name,
    email: user?.email,
    role: user?.role,
    userId: user?._id,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return { accessToken, refreshToken, user };
};
const refreshToken = async (token: string) => {
  try {
    const decoded = jwt.verify(
      token,
      getConfigValue('jwt_refresh_secret', ''),
    ) as JwtPayload;

    const user = await User.findById(decoded.userId);

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }

    const newAccessToken = createToken(
      { userId: user.id, role: user.role },
      getConfigValue('jwt_access_secret', ''),
      getConfigValue('jwt_access_expires_in', ''),
    );

    return { accessToken: newAccessToken };
  } catch (error: any) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Refresh token expired');
    }
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid refresh token');
  }
};

const accessToken = async (user: any) => {
  // Implement the logic to generate or retrieve an access token for the user
  // This is a placeholder implementation
  const jwtPayload = { userId: user.id, role: user.role };
  const newAccessToken = createToken(
    jwtPayload,
    getConfigValue('jwt_access_secret', ''),
    getConfigValue('jwt_access_expires_in', ''),
  );
  return { accessToken: newAccessToken };
};

export const AuthServices = {
  register,
  login,
  refreshToken,
  accessToken,
};

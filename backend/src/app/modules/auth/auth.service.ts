/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Types } from 'mongoose';

import { StatusCodes } from 'http-status-codes';
import config from '../../config';
import AppError from '../../errors/AppError';

import { Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { IUser } from '../users/user.interface';
import User from '../users/user.model';

type UserPayload = {
  _id: Types.ObjectId;
  name: string;
  email: string;
};
const register = async (payload: IUser): Promise<UserPayload> => {
  const result = await User.create(payload);

  return result;
};
const login = async (payload: { email: string; password: string }) => {
  const user = await User.findOne({ email: payload?.email }).select(
    '+password',
  );

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
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

const refreshToken = async (token: string, res: Response) => {
  let decoded;
  try {
    decoded = jwt.verify(
      token,
      config.jwt_refresh_secret as string,
    ) as JwtPayload;
  } catch (error) {
    res.clearCookie('refreshToken');
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Expired refresh token');
  }

  const { userId } = decoded;
  const user = await User.findById(userId).select('+password');
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }

  // checking if the user is inactive
  const userStatus = user?.isBlocked;

  if (userStatus) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked ! !');
  }

  // Create token and send to the client side
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
  return accessToken;
};

const profileUpdate = async (
  userId: string,
  payload: Record<string, unknown>,
) => {
  const result = await User.findByIdAndUpdate(userId, payload, { new: true });
  return result;
};
const authMe = async (userId: string) => {
  const user = await User.findById(userId).select('-password');
  return user;
};

export const authService = {
  register,
  login,
  refreshToken,

  profileUpdate,
  authMe,
};
function createToken(
  jwtPayload: {
    name: string;
    email: string;
    role: 'customer' | 'admin' | undefined;
    userId: Types.ObjectId;
  },
  arg1: string,
  arg2: string,
) {
  throw new Error('Function not implemented.');
}

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Types } from 'mongoose';
import config from '../../config';
import AppError from '../../errors/AppError';
import User from '../users/user.model';
import { createToken } from './auth.utils';

type UserPayload = {
  _id: Types.ObjectId;
  name: string;
  email: string;
};

const register = async (payload: UserPayload) => {
  const user = await User.create(payload);
  const jwtPayload = {
    name: user.name,
    email: user.email,
    role: user.role,
    userId: user._id,
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

const login = async (payload: { email: string; password: string }) => {
  const user = await User.findOne({ email: payload?.email }).select(
    '+password',
  );

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
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
  let decoded: JwtPayload;

  try {
    decoded = jwt.verify(
      token,
      config.jwt_refresh_secret as string,
    ) as JwtPayload;
  } catch (error) {
    res.clearCookie('refreshToken'); // Ensure cookie is cleared on failure
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Expired refresh token');
  }

  const { userId } = decoded;
  const user = await User.findById(userId).select('+password');

  if (!user) {
    res.clearCookie('refreshToken'); // Clear cookie if user doesn't exist
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
    userId: user._id,
  };

  // Generate new tokens
  const newAccessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const newRefreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  // Set new refresh token in cookie (optional)
  res.cookie('refreshToken', newRefreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });

  return { accessToken: newAccessToken, refreshToken: newRefreshToken };
};

const authMe = async (userId: string) => {
  const user = await User.findById(userId).select('-password');
  return user;
};

export const authService = {
  register,
  login,
  refreshToken,
  authMe,
};

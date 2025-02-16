import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';

import sendResponse from '../../utils/sendRespone';
import { authService } from './auth.service';

const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const { accessToken, refreshToken, user } = await authService.login({
    email,
    password,
  });

  // Set refresh token in HTTP-only cookie
  res.cookie('refreshToken', refreshToken, {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'strict',
    path: '/',
  });

  sendResponse(res, {
    success: true,
    message: 'Login successful',
    statusCode: StatusCodes.OK,
    data: { accessToken, user },
  });
});

const register = catchAsync(async (req: Request, res: Response) => {
  console.log('RECIEVED REGISTER REQUEST', req.body);
  const { accessToken, refreshToken, user } = await authService.register(
    req.body,
  );

  res.cookie('refreshToken', refreshToken, {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'strict',
    path: '/',
  });

  sendResponse(res, {
    success: true,
    message: 'User created successfully',
    statusCode: StatusCodes.CREATED,
    data: { accessToken, user },
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken) {
    return sendResponse(res, {
      success: false,
      message: 'No refresh token provided',
      statusCode: StatusCodes.UNAUTHORIZED,
      data: null,
    });
  }

  const { accessToken, refreshToken: newRefreshToken } =
    await authService.refreshToken(refreshToken, res);

  sendResponse(res, {
    success: true,
    message: 'Access token refreshed successfully',
    statusCode: StatusCodes.OK,
    data: { accessToken },
  });
});

const authMe = catchAsync(async (req: Request, res: Response) => {
  if (!req.user || !req.user.userId) {
    return sendResponse(res, {
      success: false,
      message: 'User not authenticated',
      statusCode: StatusCodes.UNAUTHORIZED,
      data: null,
    });
  }

  const result = await authService.authMe(req.user.userId);
  sendResponse(res, {
    success: true,
    message: 'User information retrieved successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

const logOut = (req: Request, res: Response) => {
  res.clearCookie('refreshToken', {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'strict',
    path: '/',
  });

  sendResponse(res, {
    success: true,
    message: 'Logged out successfully',
    statusCode: StatusCodes.OK,
    data: null,
  });
};

export const authController = {
  register,
  login,
  refreshToken,
  logOut,
  authMe,
};

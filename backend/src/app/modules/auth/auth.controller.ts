import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import config from '../../config';
import catchAsync from '../../utils/catchAsync';

import sendResponse from '../../utils/sendRespone';
import { AuthServices } from './auth.service';

const register = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.register(req.body);
  const { _id, name, email } = result;
  sendResponse(res, {
    success: true,
    message: 'User created successfully',
    statusCode: StatusCodes.CREATED,
    data: { _id, name, email },
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.login(req.body);
  const { refreshToken, accessToken } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  });
  sendResponse(res, {
    success: true,
    message: 'Login successful',
    statusCode: StatusCodes.OK,
    data: {
      token: accessToken,
    },
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    return sendResponse(res, {
      success: false,
      message: 'No refresh token provided',
      statusCode: StatusCodes.BAD_REQUEST,
      data: null,
    });
  }

  const result = await AuthServices.refreshToken(refreshToken);

  sendResponse(res, {
    success: true,
    message:
      'Refresh token successfully validated and new access token generated',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

const accessToken = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.accessToken(req.user);
  sendResponse(res, {
    success: true,
    message: 'Access token retrieved successfully!',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

const logOut = catchAsync(async (req: Request, res: Response) => {
  res.clearCookie('refreshToken');
  sendResponse(res, {
    success: true,
    message: 'User logged out successfully!',
    statusCode: StatusCodes.OK,
    data: null,
  });
});

export const AuthController = {
  register,
  login,
  refreshToken,
  accessToken,
  logOut,
};

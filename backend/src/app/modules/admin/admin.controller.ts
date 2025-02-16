import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import { adminService } from './admin.service';

const getUsers = catchAsync(async (req, res) => {
  const queryData = req?.query;

  const result = await adminService.getUsers(queryData);
  res.status(StatusCodes.OK).json({
    success: true,
    message: 'All users get successfully',
    statusCode: StatusCodes.OK,
    data: result.result,
    meta: result.meta,
  });
});

export const adminController = {
  getUsers,
};

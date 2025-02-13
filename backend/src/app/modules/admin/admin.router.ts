import { Router } from 'express';
import auth from '../../middlewares/auth';

import { USER_ROLE } from '../Auth/auth.interface';
import { adminController } from './auth.controller';

const adminRouter = Router();
adminRouter.get('/all-users', auth(USER_ROLE.admin), adminController.getUsers);
adminRouter.patch(
  '/users/:userId/block',
  auth(USER_ROLE.admin),
  adminController.blockUser,
);

export default adminRouter;

import { Router } from 'express';
import auth from '../../middlewares/auth';

import { USER_ROLE } from '../users/user.constant';
import { adminController } from './admin.controller';

const adminRouter = Router();
adminRouter.get('/all-users', auth(USER_ROLE.admin), adminController.getUsers);

export default adminRouter;

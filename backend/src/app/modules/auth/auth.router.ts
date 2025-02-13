import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';

import { authController } from './auth.controller';

import { userValidation } from '../users/user.validation';

import { USER_ROLE } from '../users/user.constant';
import { authValidation } from './auth.validation';

const authRouter = Router();
authRouter.get(
  '/me',
  auth(USER_ROLE.user, USER_ROLE.admin),
  authController.authMe,
);
authRouter.post(
  '/register',
  validateRequest(userValidation.userValidationSchema),
  authController.register,
);
authRouter.post(
  '/login',
  validateRequest(authValidation.loginValidationSchema),
  authController.login,
);
authRouter.post(
  '/refresh-token',
  validateRequest(authValidation.refreshTokenValidationSchema),
  authController.refreshToken,
);
authRouter.patch(
  '/update-profile',
  auth(USER_ROLE.user, USER_ROLE.admin),
  validateRequest(userValidation.userProfileValidationSchema),
  authController.profileUpdate,
);

authRouter.post('/logout', authController.logOut);
export default authRouter;

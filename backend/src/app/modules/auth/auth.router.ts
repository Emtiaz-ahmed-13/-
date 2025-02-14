import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { userValidation } from '../users/user.validation';
import { AuthController } from './auth.controller';
import { authValidation } from './auth.validation';

const authRouter = Router();

authRouter.post(
  '/register',
  validateRequest(userValidation.userValidationSchema),
  AuthController.register,
);
authRouter.post(
  '/login',
  validateRequest(authValidation.loginValidationSchema),
  AuthController.login,
);

authRouter.post(
  '/refresh-token',
  validateRequest(authValidation.refreshTokenValidationSchema),
  AuthController.refreshToken,
);

authRouter.post('/logout', AuthController.logOut);

export default authRouter;

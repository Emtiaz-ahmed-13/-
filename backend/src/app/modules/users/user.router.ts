import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { userController } from './user.controller';
import { userValidation } from './user.validation';

const userRouter = Router();

userRouter.post(
  '/register',
  validateRequest(userValidation.userValidationSchema),
  userController.createUser,
);

export default userRouter;

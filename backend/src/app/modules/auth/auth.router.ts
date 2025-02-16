import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { authController } from './auth.controller';
import { authValidation } from './auth.validation';
const router = express.Router();

router.post(
  '/register',
  validateRequest(authValidation.registrationValidationSchema),
  authController.register,
);

router.post(
  '/login',
  validateRequest(authValidation.loginValidationSchema),
  authController.login,
);

export default router;

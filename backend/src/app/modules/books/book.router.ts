import express from 'express';

import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../users/user.constant';

import { bookController } from './book.controller';
import { bookValidation } from './book.validation';
const bookRoutes = express.Router();

bookRoutes.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(bookValidation.bookValidationSchema),
  bookController.createBook,
);
bookRoutes.get('/:productId', bookController.getSpecificBook);
bookRoutes.put(
  '/:productId',
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(bookValidation.updateBookValidationSchema),
  bookController.updateBook,
);
bookRoutes.delete(
  '/:productId',
  auth(USER_ROLE.admin),
  bookController.deleteBook,
);
bookRoutes.get('/', bookController.getBooks);

export default bookRoutes;

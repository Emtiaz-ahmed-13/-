import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../users/user.constant';
import { bookController } from './book.controller';
import { bookValidation } from './book.validation';
const bookRoutes = express.Router();

const debugMiddleware = (req: any, res: any, next: any) => {
  console.log('Debug - Headers:', req.headers);
  console.log('Debug - Body:', req.body);
  next();
};
bookRoutes.post(
  '/',
  debugMiddleware,
  auth(USER_ROLE.admin),
  debugMiddleware,
  validateRequest(bookValidation.bookValidationSchema),
  bookController.createBook,
);
bookRoutes.get('/:bookId', bookController.getSpecificBook);
bookRoutes.put(
  '/:booktId',
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(bookValidation.updateBookValidationSchema),
  bookController.updateBook,
);
bookRoutes.delete('/:bookId', auth(USER_ROLE.admin), bookController.deleteBook);

bookRoutes.get('/', bookController.getBooks);
bookRoutes.get('/recent', bookController.getRecentBooks);

export default bookRoutes;

import express from 'express';
import adminRouter from '../modules/admin/admin.router';
import authRouter from '../modules/auth/auth.router'; // Correct import for auth router
import bookRoutes from '../modules/books/book.router';
import userRouter from '../modules/users/user.router';

const router = express.Router();

const moduleRoutes = [
  { path: '/auth', route: authRouter },
  { path: '/admin', route: adminRouter },
  { path: '/books', route: bookRoutes },
  { path: '/user', route: userRouter },
];

// Loop through each module and attach it to the main router
moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;

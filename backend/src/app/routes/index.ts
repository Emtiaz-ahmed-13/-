import { Router } from 'express';
import adminRouter from '../modules/admin/admin.router';
import authRouter from '../modules/auth/auth.router';
import bookRoutes from '../modules/books/book.router';

const router = Router();
const moduleRoutes = [
  {
    path: '/auth',
    route: authRouter,
  },
  {
    path: '/admin',
    route: adminRouter,
  },
  {
    path: '/products',
    route: bookRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

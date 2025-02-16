import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, {
  type Application,
  type Request,
  type Response,
} from 'express';
import { StatusCodes } from 'http-status-codes';
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';
import router from './app/routes';

const app: Application = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:5173'],
    credentials: true,
  }),
);

// Logging middleware
app.use((req, res, next) => {
  console.log(`Incoming Request: ${req.method} ${req.url}`);
  console.log('Request Body:', req.body);
  next();
});

// Routes
app.use('/api', router);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to my বইপোকা বুক স্টোর  project' });
});

// Global Error Handler
app.use(globalErrorHandler);

// Catch-all Route for Undefined Routes
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    status: false,
    statusCode: StatusCodes.NOT_FOUND,
    message: 'Route not found',
  });
});

export default app;

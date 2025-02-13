import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
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
app.use('/api', router);

app.get('/', (req, res) => {
  res.json({ message: 'welcome to my backend project' });
});
app.use(globalErrorHandler);

app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    status: false,
    StatusCode: StatusCodes.NOT_FOUND,
    message: 'Route not found',
  });
});
export default app;

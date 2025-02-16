import type { NextFunction, Request, Response } from 'express';
import type { AnyZodObject } from 'zod';
import catchAsync from '../utils/catchAsync';

const validateRequest = (schema: AnyZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('Request body before validation:', req.body);
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      console.log('Validation successful');
      next();
    } catch (error) {
      console.error('Validation error:', error);
      next(error);
    }
  });
};

export default validateRequest;

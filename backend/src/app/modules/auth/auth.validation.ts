import { z } from 'zod';

const registrationValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    email: z
      .string({
        required_error: 'Email must be provided and must be a string',
      })
      .email(),
    password: z.string({ required_error: 'Password is required' }),
    role: z.string({ required_error: 'Role is required' }),
  }),
});

const loginValidationSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email must be provided and must be a string',
      })
      .email(),
    password: z.string({ required_error: 'Password is required' }),
    role: z.string({ required_error: 'Role is required' }),
  }),
});

export const authValidation = {
  loginValidationSchema,
  registrationValidationSchema,
};

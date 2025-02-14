import { z } from 'zod';

const updateBookValidationSchema = z.object({
  body: z.object({
    image: z.string().optional(),
    name: z.string().optional(),
    brand: z.string().optional(),
    price: z.number().min(0).optional(),
    category: z
      .enum(['FICTION', 'NON-FICTION', 'SCIENCE', 'TECHNOLOGY'])
      .optional(),
    model: z.string().trim().optional(),
    description: z.string().optional(),
    quantity: z.number().int().min(0).optional(),
    inStock: z.boolean().optional(),
  }),
});

const bookValidationSchema = z.object({
  body: z.object({
    image: z.string().optional(),
    name: z.string(),
    brand: z.string(),
    price: z.number().min(0),
    category: z.enum(['FICTION', 'NON-FICTION', 'SCIENCE', 'TECHNOLOGY']),
    model: z.string().trim(),
    description: z.string(),
    quantity: z.number().int().min(0),
    // inStock: z.boolean()
  }),
});

export const bookValidation = {
  bookValidationSchema,
  updateBookValidationSchema,
};

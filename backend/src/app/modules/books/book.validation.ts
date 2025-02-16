import { z } from 'zod';

const updateBookValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    author: z.string().optional(),
    price: z.number().min(0).optional(),
    category: z
      .enum(['FICTION', 'NON-FICTION', 'SCIENCE', 'TECHNOLOGY'])
      .optional(),
    description: z.string().optional(),
    quantity: z.number().int().min(0).optional(),
    inStock: z.boolean().optional(),
  }),
});

const bookValidationSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    author: z.string({
      required_error: 'Author is required',
    }),
    price: z
      .number({
        required_error: 'Price is required',
      })
      .min(0, 'Price cannot be less than 0'),
    image: z.string({
      required_error: 'Image is required',
    }),
    category: z.enum(['FICTION', 'NON-FICTION', 'SCIENCE', 'TECHNOLOGY'], {
      required_error: 'Category is required',
    }),
    description: z.string({
      required_error: 'Description is required',
    }),
    quantity: z
      .number({
        required_error: 'Quantity is required',
      })
      .int('Quantity must be an integer')
      .min(0, 'Quantity cannot be less than 0'),
    inStock: z.boolean({
      required_error: 'InStock is required',
    }),
  }),
});

export const bookValidation = {
  bookValidationSchema,
  updateBookValidationSchema,
};

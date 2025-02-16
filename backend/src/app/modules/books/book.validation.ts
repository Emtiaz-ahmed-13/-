import { z } from 'zod';

const updateBookValidationSchema = z.object({
  body: z.object({
    শিরোনাম: z.string().optional(),
    লেখক: z.string().optional(),
    মূল্য: z.number().min(0, 'মূল্য 0 এর কম হতে পারে না').optional(),
    ক্যাটাগরি: z
      .enum([
        'উপন্যাস',
        'অন্যন্যা',
        'কবিতা',
        'ছড়া ও কবিতা',
        'থ্রিলার',
        'বিজ্ঞান',
      ])
      .optional(),
    ছবি: z.string().optional(),
    বিবরণ: z.string().optional(),
    পরিমাণ: z.number().int().min(0, 'পরিমাণ 0 এর কম হতে পারে না').optional(),
    স্টকে_আছে: z.boolean().optional(),
  }),
});

const bookValidationSchema = z.object({
  body: z.object({
    শিরোনাম: z.string({
      required_error: 'শিরোনাম আবশ্যক',
    }),
    লেখক: z.string({
      required_error: 'লেখকের নাম আবশ্যক',
    }),
    মূল্য: z
      .number({
        required_error: 'মূল্য আবশ্যক',
      })
      .min(0, 'মূল্য 0 এর কম হতে পারে না'),
    ছবি: z.string({
      required_error: 'ছবির লিংক আবশ্যক',
    }),
    ক্যাটাগরি: z.enum(
      ['উপন্যাস', 'অন্যান্য', 'কবিতা', 'ছড়া ও কবিতা', 'থ্রিলার', 'বিজ্ঞান'],
      {
        required_error: 'ক্যাটাগরি আবশ্যক',
      },
    ),
    বিবরণ: z.string({
      required_error: 'বিবরণ আবশ্যক',
    }),
    পরিমাণ: z
      .number({
        required_error: 'পরিমাণ আবশ্যক',
      })
      .min(0, 'পরিমাণ 0 এর কম হতে পারে না'),
    স্টকে_আছে: z.boolean({
      required_error: 'স্টকে আছে মানটি true বা false হতে হবে',
    }),
  }),
});

export const bookValidation = {
  bookValidationSchema,
  updateBookValidationSchema,
};

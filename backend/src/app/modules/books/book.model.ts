import { model, Schema } from 'mongoose';
import { IBook } from './book.interface';

const bookSchema = new Schema<IBook>(
  {
    শিরোনাম: { type: String, required: [true, 'শিরোনাম আবশ্যক'] },
    লেখক: { type: String, required: [true, 'লেখকের নাম আবশ্যক'] },
    মূল্য: {
      type: Number,
      min: [0, 'মূল্য 0 এর কম হতে পারে না'],
      required: [true, 'বইয়ের মূল্য আবশ্যক'],
    },
    ক্যাটাগরি: {
      type: String,
      enum: {
        values: ['উপন্যাস', 'বিজ্ঞান', 'প্রযুক্তি', 'অন্য', 'কবিতা'],
        message: '{VALUE} একটি বৈধ ক্যাটাগরি নয়',
      },
      required: [true, 'ক্যাটাগরি আবশ্যক'],
    },
    প্রকাশনী: { type: String, required: [true, 'প্রকাশনী আবশ্যক'] },
    বিবরণ: { type: String, required: [true, 'বিবরণ আবশ্যক'] },
    পরিমাণ: {
      type: Number,
      min: [0, 'পরিমাণ 0 এর কম হতে পারে না'],
      required: [true, 'পরিমাণ আবশ্যক'],
    },
    স্টকে_আছে: {
      type: Boolean,
      required: [true, 'স্টকে আছে মানটি true বা false হতে হবে'],
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.__v;
      },
    },
  },
);

const Book = model<IBook>('Book', bookSchema);
export default Book;

import { model, Schema } from 'mongoose';
import { IBook } from './book.interface';

const bookSchema = new Schema<IBook>(
  {
    title: { type: String, trim: true, required: [true, 'Title is Required'] },
    author: {
      type: String,
      trim: true,
      required: [true, 'Author is Required'],
    },
    price: {
      type: Number,
      min: [0, 'Price can not be less than 0'],
      required: [true, 'Book price is Required'],
    },
    category: {
      type: String,
      enum: {
        values: ['FICTION', 'NON-FICTION', 'SCIENCE', 'TECHNOLOGY'],
        message: '{VALUE} is not a valid category',
      },
      required: [true, 'Category is Required'],
    },
    description: {
      type: String,
      trim: true,
      required: [true, 'Book description is Required'],
    },
    quantity: {
      type: Number,
      min: [0, 'Quantity can not be less than 0'],
      required: [true, 'Quantity is Required'],
    },
    inStock: {
      type: Boolean,
      required: [true, 'InStock value will be true or false'],
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

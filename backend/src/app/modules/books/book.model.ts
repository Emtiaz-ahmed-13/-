import { model, Schema } from 'mongoose';
import { IBook } from './book.interface';

const bookSchema = new Schema<IBook>(
  {
    image: { type: String, trim: true, required: [true, 'Image is Required'] },
    name: { type: String, trim: true, required: [true, 'Name is Required'] },

    price: {
      type: Number,
      min: [0, 't can not be less than 0 '],
      required: [true, 'Bike price is Required '],
    },
    category: {
      type: String,
      enum: {
        values: ['FICTION', 'NON-FICTION', 'SCIENCE', 'TECHNOLOGY'],
        message: '{VALUE} is not a valid category',
      },
    },
    model: {
      type: String,
      trim: true,
      required: [true, 'Book model is Required'],
    },
    description: {
      type: String,
      trim: true,
      required: [true, 'Book Description is Required'],
    },
    quantity: {
      type: Number,
      min: [0, 'quantity can not be less than 0 '],
      required: [true, 'Quantity of the bike Required'],
    },
    inStock: {
      type: Boolean,
      required: [true, 'inStock value will be true or false'],
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

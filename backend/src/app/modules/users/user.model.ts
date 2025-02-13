import { model, Schema } from 'mongoose';

import { IUser } from './user.interface';
const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ['customer', 'admin'],
      default: 'customer',
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    address: {
      type: String,
      default: null,
    },
    phone: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);
const User = model('User', userSchema);
export default User;

import { Types } from 'mongoose';
import { IUser } from './user.interface';
import User from './user.model';

type UserPayload = {
  _id: Types.ObjectId;
  name: string;
  email: string;
};

const createUser = async (payload: IUser): Promise<UserPayload> => {
  const result = await User.create(payload);
  return {
    _id: result._id as Types.ObjectId,
    name: result.name,
    email: result.email,
  };
};

export const userService = {
  createUser,
};

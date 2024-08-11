import { ObjectId } from "mongodb";

export interface IUser {
  _id: ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  googleId?: string;
  password: string;
  username: string;
  image?: string;
  isOnline: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

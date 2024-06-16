import { ObjectId } from "mongodb";

export interface IUser {
  _id: ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  username: string;
  isOnline: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

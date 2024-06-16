import { ObjectId } from "mongodb";
import { IUser } from "./user.types";

export interface IGetServerActionPayload {
  page: number;
  limit: number;
}

export interface IPost {
  _id: ObjectId;
  content: string;
  images: string[];
  authorId: ObjectId;
  createdAt: string;
  updatedAt: string;
}

export type IFeedPost = IPost & {
  user: IUser;
};

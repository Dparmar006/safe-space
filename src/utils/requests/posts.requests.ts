import { ServerResponse, apiRequest } from "../apiHelper";
import { IFeedPost } from "@/types/post.types";
import { ObjectId } from "mongodb";
export interface ICreatePostPayload {
  content: string;
  email: string;
}
export const createPostRequest = async (payload: ICreatePostPayload) => {
  const response = await apiRequest("api/posts", "POST", payload);
  return response.data;
};

export interface IGetPostPayload {
  page: number;
  limit: number;
}
export const getPostRequest = async (
  { pageParam }: { pageParam: number },
  username?: string
) => {
  const response = await apiRequest<
    ServerResponse<{ posts: IFeedPost[]; totalCount: number; nextPage: number }>
  >("api/posts", "GET", null, {
    params: { page: pageParam, username },
  });
  return response.data;
};

export interface IDeletePostPayload {
  _id: ObjectId;
}
export const deletePostRequest = async (payload: IDeletePostPayload) => {
  const response = await apiRequest("api/posts", "DELETE", payload);
  return response.data;
};

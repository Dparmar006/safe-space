"use server";

import Post from "@/models/post.model";
import { IFeedPost, IGetServerActionPayload } from "@/types/post.types";
import { DEFAULT_API_LIMIT, DEFAULT_API_PAGE } from "@/utils/constants";
import { connectToDB } from "@/utils/database";
import { ObjectId } from "mongodb";

export async function getPostsAction(params?: IGetServerActionPayload) {
  try {
    await connectToDB();
    let page = DEFAULT_API_PAGE,
      limit = DEFAULT_API_LIMIT;
    if (params) ({ page, limit } = params);

    const totalCount: number = await Post.countDocuments();
    const records: IFeedPost[] = await Post.aggregate([
      { $sort: { _id: -1 } },
      { $skip: (page - 1) * limit },
      { $limit: limit },
      {
        $lookup: {
          from: "users",
          localField: "authorId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $project: {
          _id: 1,
          content: 1,
          createdAt: 1,
          "user._id": 1,
          "user.firstName": 1,
          "user.lastName": 1,
          "user.isOnline": 1,
          "user.username": 1,
        },
      },
      {
        $unwind: "$user",
      },
    ]);
    return JSON.parse(JSON.stringify({ posts: records, totalCount }));
  } catch (err) {
    const error = err as Error;
    console.log(error);
    return { posts: [], totalCount: 0 };
  }
}

export const deletePostAction = async (postId: ObjectId) => {
  try {
    await Post.deleteOne({ _id: postId });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

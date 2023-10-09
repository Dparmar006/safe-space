"use server";

import Post from "@/models/posts";
import { DEFAULT_API_LIMIT, DEFAULT_API_PAGE } from "@/utils/constants";

export async function fetchPosts({
  page = DEFAULT_API_PAGE,
  limit = DEFAULT_API_LIMIT,
  filter = null,
}) {
  try {
    const totalCount = await Post.count({});
    const records = await Post.aggregate([
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
    return { posts: records, totalCount };
  } catch (error) {
    return error;
  }
}

export async function fetchUserProfileGalleryImages() {
  try {
    const response = await fetch(
      "https://picsum.photos/v2/list?page=2&limit=40",
    );

    return await response.json();
  } catch (error) {
    console.log(error);
    return error;
  }
}

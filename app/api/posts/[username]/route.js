import Post from "@/models/posts";
import { NextResponse } from "next/server";
import { handlePagination } from "@/utils";
import { connectToDB } from "@/utils/database";
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {
  try {
    const pagination = handlePagination(req);
    await connectToDB();
    const totalCount = await Post.count({});
    const response = await Post.aggregate([
      {
        $match: {
          authorId: new ObjectId("6501f2f03f0574f83e662303"),
        },
      },
      { $sort: { _id: -1 } },
      { $skip: Number(pagination.skip) },
      { $limit: Number(pagination.limit) },
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
    return NextResponse.json(
      {
        message: "All the posts here",
        data: { posts: response, totalCount },
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
        data: null,
      },
      {
        status: 500,
      },
    );
  }
}

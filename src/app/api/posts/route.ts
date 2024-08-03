import Post from "@/models/post.model";
import { NextRequest, NextResponse } from "next/server";
import * as Yup from "yup";
import { handlePagination } from "@/utils";
import { connectToDB } from "@/utils/database";
import { ObjectId } from "mongodb";
import { sendResponse } from "@/utils/apiHelper";

const postValidationSchema = Yup.object({
  content: Yup.string(),
  // images: Yup.array().items(Yup.string()),
  // authorId: Yup.string().typeError("Please pass valid objectId").required(),
});

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    await postValidationSchema.validate(reqBody);
    await connectToDB();
    const response = await Post.create(reqBody);
    return sendResponse(201, "Post created successfully", {
      data: response,
    });
  } catch (err) {
    const error = err as Error;
    console.log(error);
    return NextResponse.json(
      {
        message: error.message,
        data: null,
      },
      {
        status: error.name === "ValidationError" ? 400 : 500,
      }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const pagination = handlePagination(req);
    await connectToDB();
    const filter = { ...pagination.filter };
    if (pagination.searchKey === "authorId") {
      filter[pagination.searchKey] = new ObjectId(
        pagination.searchValue as string
      ).toString();
    }
    const totalCount = await Post.countDocuments({});

    const response = await Post.aggregate([
      { $match: filter },
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

    return sendResponse(200, "All the posts here", {
      posts: response,
      totalCount,
      nextPage: pagination.page + 1,
    });
  } catch (err) {
    const error = err as Error;
    return NextResponse.json(
      {
        message: error.message,
        data: null,
      },
      {
        status: 500,
      }
    );
  }
}

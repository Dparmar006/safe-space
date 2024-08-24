import Post from "@/models/post.model";
import { NextRequest, NextResponse } from "next/server";
import * as Yup from "yup";
import { handlePagination } from "@/utils";
import { connectToDB } from "@/utils/database";
import { ObjectId } from "mongodb";
import { sendResponse } from "@/utils/apiHelper";
import User from "@/models/user";
import { PipelineStage } from "mongoose";

const postValidationSchema = Yup.object({
  content: Yup.string(),
  // email: Yup.array().items(Yup.string()),
  email: Yup.string().typeError("Please pass email").required(),
});

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    await postValidationSchema.validate(reqBody);
    await connectToDB();
    const user = await User.findOne({ email: reqBody.email });
    if (!user) return sendResponse(401, "User not found");

    const response = await Post.create({ ...reqBody, authorId: user.id });
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
    const { searchParams, ...pagination } = handlePagination(req);
    const username = searchParams.get("username");
    await connectToDB();
    const filter = {};

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
        $unwind: "$user",
      },
      ...(username
        ? [
            {
              $match: {
                "user.username": username,
              },
            } as PipelineStage,
          ]
        : []),
      {
        $project: {
          _id: 1,
          content: 1,
          createdAt: 1,
          user: 1,
        },
      },
    ]);

    const isLastPage = pagination.page * pagination.limit > totalCount;
    return sendResponse(200, "All the posts here", {
      posts: response,
      totalCount,
      nextPage: isLastPage ? null : pagination.page + 1,
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

export async function DELETE(req: NextRequest) {
  try {
    const reqBody = await req.json();
    await connectToDB();

    await Post.deleteOne({ _id: reqBody._id });
    return sendResponse(200, "Post deleted successfully");
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

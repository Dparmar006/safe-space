import Post from '@/models/posts'
import { NextResponse } from 'next/server'
import * as Yup from 'yup'
import { handlePagination } from '@/utils'
import { connectToDB } from '@/utils/database'
import User from '@/models/user'

const postValidationSchema = Yup.object({
  content: Yup.string(),
  // images: Yup.array().items(Yup.string()),
  authorId: Yup.string().typeError('Please pass valid objectId').required()
})

export async function POST (req) {
  try {
    const reqBody = await req.json()
    await postValidationSchema.validate(reqBody)
    await connectToDB()
    const response = await Post.create(reqBody)
    return NextResponse.json(
      {
        message: 'Post created successfully',
        data: response
      },
      {
        status: 201
      }
    )
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
        data: null
      },
      {
        status: error.name === 'ValidationError' ? 400 : 500
      }
    )
  }
}

export async function GET (req) {
  try {
    const pagination = handlePagination(req)
    await connectToDB()
    const totalCount = await Post.count({})
    const response = await Post.aggregate([
      { $sort: { _id: -1 } },
      { $skip: Number(pagination.skip) },
      { $limit: Number(pagination.limit) },
      {
        $lookup: {
          from: 'users',
          localField: 'authorId',
          foreignField: '_id',
          as: 'user'
        }
      },
      {
        $project: {
          _id: 1,
          content: 1,
          createdAt: 1,
          'user._id': 1,
          'user.firstName': 1,
          'user.lastName': 1,
          'user.isOnline': 1,
          'user.username': 1
        }
      },
      {
        $unwind: '$user'
      }
    ])
    return NextResponse.json(
      {
        message: 'All the posts here',
        data: { posts: response, totalCount }
      },
      {
        status: 200
      }
    )
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
        data: null
      },
      {
        status: 500
      }
    )
  }
}

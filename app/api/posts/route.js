import Post from '@/models/posts'
import { NextResponse } from 'next/server'
import Joi from 'joi'
import * as Yup from 'yup'
import { handlePagination } from '@/utils'
import { connectToDB } from '@/utils/database'

// const postValidationSchema = Joi.object({
//   content: Joi.string(),
//   images: Joi.array().items(Joi.string()),
//   authorId: Joi.string().required()
// })

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
    const count = await Post.count({})
    const response = await Post.find(
      {},
      {
        __v: 0
      }
    )
      .skip(pagination.skip)
      .limit(pagination.limit)
    return NextResponse.json(
      {
        message: 'All the posts here',
        data: { posts: response, count }
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

'use server'

import Post from '@/models/posts'
import { DEFAULT_API_LIMIT, DEFAULT_API_PAGE } from '@/utils/constants'

export async function fetchPosts ({
  page = DEFAULT_API_PAGE,
  limit = DEFAULT_API_LIMIT
}) {
  try {
    const totalCount = await Post.count({})
    const records = await Post.aggregate([
      { $sort: { _id: -1 } },
      { $skip: (page - 1) * limit },
      { $limit: limit },
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
    return { posts: records, totalCount }
  } catch (error) {
    return error
  }
}

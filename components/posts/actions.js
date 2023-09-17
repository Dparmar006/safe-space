'use server'

import Post from '@/models/posts'
import { DEFAULT_API_LIMIT, DEFAULT_API_PAGE } from '@/utils/constants'

export async function fetchPosts ({
  page = DEFAULT_API_PAGE,
  limit = DEFAULT_API_LIMIT
}) {
  try {
    const totalCount = await Post.count({})
    const records = await Post.find({})
      .limit(limit)
      .skip((page - 1) * limit)
    return { posts: JSON.parse(JSON.stringify(records)), totalCount }
  } catch (error) {
    return error
  }
}

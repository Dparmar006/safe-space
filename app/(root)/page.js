import CreatePost from '@/components/posts/CreatePost'
import InfiniteScrolling from '@/components/posts/InfiniteScrolling'
import { fetchPosts } from '@/actions/posts.actions'
import React from 'react'
import { DEFAULT_API_LIMIT } from '@/utils/constants'

export const Home = async () => {
  const { posts, totalCount } = JSON.parse(
    JSON.stringify(await fetchPosts({ limit: DEFAULT_API_LIMIT }))
  )
  return (
    <section className='flex'>
      <div className='flex-1'>
        <CreatePost />
        <InfiniteScrolling
          initialMovies={posts}
          initialTotalCount={totalCount}
        />
      </div>
    </section>
  )
}

export default Home

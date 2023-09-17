import CreatePost from '@/components/posts/CreatePost'
import InfiniteScrolling from '@/components/posts/InfiniteScrolling'
import { fetchPosts } from '@/components/posts/actions'
import React from 'react'

export const Home = async () => {
  const { posts, totalCount } = await fetchPosts({ limit: 10 })
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

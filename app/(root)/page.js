import CreatePost from '@/components/posts/CreatePost'
import InfiniteScrolling from '@/components/posts/InfiniteScrolling'
import ListPosts from '@/components/posts/ListPosts'
import Post from '@/components/posts/Post'
import { fetchPosts } from '@/components/posts/actions'
import React from 'react'

export const Home = async () => {
  const { posts, totalCount } = await fetchPosts({ limit: 10 })
  return (
    <section className='flex'>
      <div className='flex-1'>
        <CreatePost />
        {/* <ListPosts /> */}
        <InfiniteScrolling
          initialMovies={posts}
          initialTotalCount={totalCount}
        />
      </div>
    </section>
  )
}

export default Home

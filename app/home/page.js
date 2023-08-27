import CreatePost from '@/components/posts/CreatePost'
import Post from '@/components/posts/Post'
import React from 'react'

const Home = () => {
  return (
    <section>
      <CreatePost />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </section>
  )
}

export default Home

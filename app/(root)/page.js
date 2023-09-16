import Chat from '@/components/chats/Chat'
import CreatePost from '@/components/posts/CreatePost'
import Post from '@/components/posts/Post'
import React from 'react'

const Home = () => {
  return (
    <section className='flex'>
      <div className='flex-1'>
        <CreatePost />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </section>
  )
}

export default Home

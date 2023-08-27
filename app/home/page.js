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
      {/* <div className='w-1/3'>
        <Chat />
      </div> */}
    </section>
  )
}

export default Home

import React from 'react'
import { AiOutlineComment, AiOutlineHeart } from 'react-icons/ai'
import { RiLoopRightFill } from 'react-icons/ri'
import Avatar from '../user/Avatar'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
const Post = ({ post }) => {
  return (
    <>
      <div className='flex gap-4 items-start'>
        <Avatar
          image={post.user.image}
          username={post.user.username.replaceAll(' ', '')}
        />
        <div className='flex flex-col w-full'>
          <p className='self-start font-semibold flex flex-col justify-start mb-2'>
            {post.user.firstName} {post.user.lastName}
            <span className='flex gap-2 items-center'>
              <span className='text-gray-600 text-xs'>
                @{post.user.username.replaceAll(' ', '')}
              </span>
              <span className='dot h-[.200rem] w-[.200rem] min-h-min min-w-min'></span>
              <span className='text-gray-600 text-xs'>
                {dayjs().to(dayjs(post.createdAt), true)}
              </span>
            </span>
          </p>
          <p>{post.content}</p>
          <div className='flex justify-between mt-4 select-none'>
            <span className='flex items-center gap-2 hover:text-cyan-600 cursor-pointer transition-colors'>
              <AiOutlineComment size={20} /> 0
            </span>
            <span className='flex items-center gap-2  hover:text-green-600 cursor-pointer transition-colors'>
              <RiLoopRightFill size={20} /> 0
            </span>
            <span className='flex items-center gap-2  hover:text-red-600 cursor-pointer transition-colors'>
              <AiOutlineHeart size={20} /> 0
            </span>
          </div>
        </div>
      </div>
      <div className='divider h-0'></div>
    </>
  )
}

export default Post

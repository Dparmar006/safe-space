import React from 'react'
import { AiOutlineComment, AiOutlineHeart } from 'react-icons/ai'
import { RiLoopRightFill } from 'react-icons/ri'
import Avatar from '../user/Avatar'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Link from 'next/link'
dayjs.extend(relativeTime)

const Post = ({ post }) => {
  return (
    <div className='hover:bg-backgroundSecondary pt-2 px-2 rounded-md md:rounded-lg transition-colors cursor-pointer'>
      <div className='flex gap-4 items-start post-fade-in-animation'>
        <Avatar
          image={post.user.image}
          username={post.user.username.replaceAll(' ', '')}
        />
        <Link
          href={`/${post.user.username.replaceAll(' ', '')}`}
          className='flex flex-col w-full'
        >
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
          <p className='whitespace-break-spaces break-all'>{post.content}</p>
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
        </Link>
      </div>
      <div className='divider h-0 mt-3 mb-0'></div>
    </div>
  )
}

export default Post

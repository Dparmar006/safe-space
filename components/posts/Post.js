import React from 'react'
import { AiOutlineComment, AiOutlineHeart } from 'react-icons/ai'
import { RiLoopRightFill } from 'react-icons/ri'

const Post = ({ post }) => {
  return (
    <>
      <div className='flex gap-4 items-start'>
        <div className='avatar w-10 h-10 aspect-square'>
          <img
            src={`https://api.dicebear.com/7.x/micah/svg?seed=${post.authorId}`}
            alt='avatar'
          />
        </div>
        <div className='flex flex-col w-full'>
          <p className='self-start font-semibold'>
            Dixit Parmar{' '}
            <span className='text-gray-600 font-normal'>@thatsenoughdixit</span>
          </p>
          <p>{post.content}</p>
          <div className='flex justify-between mt-4'>
            <span className='flex items-center gap-2 hover:text-cyan-600 cursor-pointer transition-colors'>
              <AiOutlineComment size={20} /> 22
            </span>
            <span className='flex items-center gap-2  hover:text-green-600 cursor-pointer transition-colors'>
              <RiLoopRightFill size={20} /> 43
            </span>
            <span className='flex items-center gap-2  hover:text-red-600 cursor-pointer transition-colors'>
              <AiOutlineHeart size={20} /> 1
            </span>
          </div>
        </div>
      </div>
      <div className='divider h-0'></div>
    </>
  )
}

export default Post

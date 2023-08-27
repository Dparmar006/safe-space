import React from 'react'
import { AiOutlineComment, AiOutlineHeart } from 'react-icons/ai'
import { RiLoopRightFill } from 'react-icons/ri'

const Post = () => {
  return (
    <>
      <div className='flex gap-4 items-start'>
        <div className='avatar'>
          <img
            src='https://i.pravatar.cc/150?u=a042581f4e29026024d'
            alt='avatar'
          />
        </div>
        <div className='flex flex-col w-full'>
          <p className='self-start font-semibold'>
            Dixit Parmar{' '}
            <span className='text-gray-600 font-normal'>@thatsenoughdixit</span>
          </p>
          <p>Lorem consectetur consectetur ad proident aliquip.</p>
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

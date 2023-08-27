'use client'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'

const CreatePost = () => {
  const session = useSession()
  const loggedinUser = session?.data?.user
  const [post, setPost] = useState('')
  const handleChange = event => {
    setPost(event.target.value)
  }

  return (
    <>
      <div className='flex gap-4 items-center'>
        <div className='avatar'>
          <img
            className='select-none pointer-events-none'
            src={loggedinUser?.image}
            alt='avatar'
          />
        </div>
        <textarea
          onChange={handleChange}
          value={post}
          className='textarea-block textarea bg-transparent border-transparent min-h-fit'
          placeholder='So, How you feeling today?'
        />
      </div>
      <div className='flex justify-end pt-4'>
        <button className='btn btn-primary btn-sm'>Post</button>
      </div>
      <div class='divider h-0'></div>
    </>
  )
}

export default CreatePost

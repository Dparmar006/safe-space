'use client'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import Avatar from '../user/Avatar'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const CreatePost = () => {
  const session = useSession()
  const router = useRouter()
  const loggedinUser = session?.data?.user
  const [post, setPost] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = event => {
    setPost(event.target.value)
  }

  const createPost = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({
          content: post,
          authorId: session.data?.user?.id
        })
      })
      setPost('')
      router.refresh()
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className='flex gap-4 items-center'>
        <Avatar image={loggedinUser?.image} username={loggedinUser?.email} />
        <textarea
          onChange={handleChange}
          disabled={isLoading}
          value={post}
          className='textarea-block textarea bg-transparent border-transparent min-h-fit'
          placeholder='So, How you feeling today?'
        />
      </div>
      <div className='flex justify-end pt-4'>
        <button
          onClick={createPost}
          disabled={isLoading}
          className='btn btn-primary btn-sm'
        >
          {isLoading ? 'Posting...' : 'Post'}
        </button>
      </div>
      <div className='divider h-0'></div>
    </>
  )
}

export default CreatePost

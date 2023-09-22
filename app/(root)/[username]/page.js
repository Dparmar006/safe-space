import { fetchPosts } from '@/actions/posts.actions'
import InfiniteScrolling from '@/components/posts/InfiniteScrolling'
import Avatar from '@/components/user/Avatar'
import { DEFAULT_API_LIMIT } from '@/utils/constants'
import Link from 'next/link'
import React from 'react'

const page = async ({ params }) => {
  const { posts, totalCount } = JSON.parse(
    JSON.stringify(await fetchPosts({ limit: DEFAULT_API_LIMIT }))
  )
  return (
    <>
      <div className='breadcrumbs text-lg mt-4 px-0 flex-wrap'>
        <ul className='flex flex-wrap'>
          <li>
            <Link href='/'>Home</Link>
          </li>
          <li className='break-all'>{params.username}</li>
        </ul>
      </div>

      <section className='pb-4'>
        <h1 className='text-3xl my-8'>Something just like this...</h1>
        <figure className='flex gap-2'>
          <Avatar size='16' />
          <div>
            <h2 className='text-2xl break-all'>{params.username}</h2>
            <p className='text-zinc-800 text-sm break-all mt-1'>
              @{params.username}
            </p>
          </div>
        </figure>
      </section>

      <div className='tabs w-full flex justify-between mb-4'>
        <input
          type='radio'
          id='tab-4'
          name='tab-2'
          className='tab-toggle'
          defaultChecked
        />
        <label htmlFor='tab-4' className='tab tab-bordered px-6 w-1/2'>
          Posts
        </label>

        <input type='radio' id='tab-5' name='tab-2' className='tab-toggle' />
        <label htmlFor='tab-5' className='tab tab-bordered px-6 w-1/2'>
          Gallery
        </label>
      </div>

      <InfiniteScrolling initialPosts={posts} initialTotalCount={totalCount} />
    </>
  )
}

export default page

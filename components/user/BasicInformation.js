import React from 'react'
import Avatar from './Avatar'

const BasicInformation = ({ user }) => {
  return (
    <section className='pb-4'>
      <h1 className='text-3xl my-8'>Something just like this...</h1>
      <figure className='flex gap-2'>
        <Avatar size='32' />
        <div>
          <h2 className='text-2xl break-all'>{user.username}</h2>
          <p className='text-zinc-800 text-sm break-all mt-1'>
            @{user.username}
          </p>
        </div>
      </figure>
    </section>
  )
}

export default BasicInformation

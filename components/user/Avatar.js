import React from 'react'

const Avatar = ({ image, username }) => {
  return (
    <div className='avatar w-10 h-10 aspect-square'>
      <img
        src={image || `https://api.dicebear.com/7.x/micah/svg?seed=${username}`}
        alt='avatar'
      />
    </div>
  )
}

export default Avatar

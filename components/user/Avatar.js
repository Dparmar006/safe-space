import React from 'react'

const Avatar = ({ image, username, size = '10' }) => {
  return (
    <div
      className={`avatar w-${size} h-${size} aspect-square select-none pointer-events-none`}
    >
      <img
        src={image || `https://api.dicebear.com/7.x/micah/svg?seed=${username}`}
        alt='avatar'
      />
    </div>
  )
}

export default Avatar

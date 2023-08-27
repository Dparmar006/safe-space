'use client'

import React, { useState } from 'react'

const Chat = () => {
  const [room, setRoom] = useState('')
  const handleSelectRoom = selectedRoom => setRoom(selectedRoom)

  return (
    <aside className='flex flex-col p-2 min-h-screen max-h-screen overflow-y-auto'>
      {!room ? (
        <>
          <div>
            <h1 className='text-xl font-bold'>Messages</h1>
            <input
              role='search'
              type='search'
              placeholder='Looking for someone?'
              className='input my-2 w-full max-w-full'
            />
          </div>

          <ul>
            {Array.from({ length: 20 }).map((user, index) => (
              <li
                role='button'
                className='flex gap-2 items-start bg-gray-1 hover:bg-gray-2 transition-colors p-2 rounded-md select-none cursor-pointer mb-2'
                key={index}
                onClick={() => handleSelectRoom(index)}
              >
                <div className='avatar'>
                  <img
                    src='https://i.pravatar.cc/150?u=a042581f4e29026024d'
                    alt='avatar'
                  />
                </div>
                <div className='flex flex-col w-full'>
                  <p className='self-start font-semibold text-base'>
                    Bishakha{' '}
                    <span className='text-gray-600 font-normal text-sm'>
                      @thatsenoughdixit
                    </span>
                  </p>
                  <p className='text-sm truncate text-ellipsis overflow-hidden max-w-xs'>
                    Lorem consectetur consectetur ad proident aliquip.Lorem
                    consectetur consectetur ad proident aliquip.
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <div
            role='button'
            className='flex gap-2 items-start bg-gray-1 hover:bg-gray-2 transition-colors p-2 rounded-md select-none cursor-pointer mb-2'
          >
            <div className='avatar'>
              <img
                src='https://i.pravatar.cc/150?u=a042581f4e29026024d'
                alt='avatar'
              />
            </div>
            <div className='flex flex-col w-full'>
              <p className='self-start font-semibold text-base'>
                Bishakha{' '}
                <span className='text-gray-600 font-normal text-sm'>
                  @thatsenoughdixit
                </span>
              </p>
              <p className='text-sm truncate text-ellipsis overflow-hidden max-w-xs'>
                Lorem consectetur consectetur ad proident aliquip.Lorem
                consectetur consectetur ad proident aliquip.
              </p>
            </div>
          </div>
        </>
      )}
    </aside>
  )
}

export default Chat

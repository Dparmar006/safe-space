'use client'

import React, { useState } from 'react'
import RecentMessagesList from './RecentMessagesList'
import ChatScreen from './ChatScreen'

const Chat = () => {
  const [room, setRoom] = useState('')
  const handleSelectRoom = selectedRoom => setRoom(selectedRoom)

  return (
    <>
      <input type='checkbox' id='drawer-right' className='drawer-toggle' />

      <label className='overlay' htmlFor='drawer-right'></label>
      <div className='drawer drawer-right max-w-none sm:w-[20rem]'>
        <div className='drawer-content pt-10 flex flex-col h-[100dvh] '>
          <label
            htmlFor='drawer-right'
            className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
          >
            ✕
          </label>

          <div className='sm:block max-h-screen h-full'>
            {room ? (
              <aside className='flex flex-col p-2 min-h-full max-h-screen overflow-y-auto'>
                <RecentMessagesList handleSelectRoom={handleSelectRoom} />
              </aside>
            ) : (
              <ChatScreen />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Chat

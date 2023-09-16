'use client'

import React, { useState } from 'react'
import RecentMessagesList from './RecentMessagesList'
import ChatScreen from './ChatScreen'
import { useChatUi } from '@/hooks/ui'

const Chat = () => {
  const [room, setRoom] = useState('')
  const handleSelectRoom = selectedRoom => setRoom(selectedRoom)
  const isChatUiVisible = useChatUi(state => state.isChatUiVisible)

  return (
    <div
      className='w-1/2 hidden sm:block max-h-screen'
      style={{ display: isChatUiVisible ? 'block' : 'none' }}
    >
      {room ? (
        <aside className='flex flex-col p-2 min-h-screen max-h-screen overflow-y-auto'>
          <RecentMessagesList handleSelectRoom={handleSelectRoom} />
        </aside>
      ) : (
        <ChatScreen />
      )}
    </div>
  )
}

export default Chat

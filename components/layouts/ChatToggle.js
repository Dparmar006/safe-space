'use client'
import { useChatUi } from '@/hooks/ui'
import React from 'react'
import { BsChatRight, BsChatRightText } from 'react-icons/bs'

const ChatToggle = () => {
  const toggleChat = useChatUi(state => state.toggleChat)
  const isChatUiVisible = useChatUi(state => state.isChatUiVisible)
  return (
    <button
      role='button'
      type='button'
      onClick={toggleChat}
      className='py-1 px-3'
      title={isChatUiVisible ? 'Close chat window' : 'Open chat window'}
      aria-description='Chat window can be toggled here.'
      aria-label='Chat window toggle'
    >
      {isChatUiVisible ? <BsChatRight /> : <BsChatRightText />}
    </button>
  )
}

export default ChatToggle

import React from 'react'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import Message from './Message'
import { MESSAGE_TYPES } from '@/utils/constants'

// Editor updater
function onError (error) {
  console.error(error)
}
const theme = {
  paragraph: 'textarea textarea-block max-h-24 overflow-hidden overflow-y-auto'
}

const ChatScreen = () => {
  const initialConfig = {
    namespace: 'chat-message',
    theme,
    onError
  }
  return (
    <aside className='flex flex-col min-h-screen max-h-screen overflow-y-auto justify-between pb-2'>
      <div className='flex gap-4 items-center bg-gray-1 hover:bg-gray-2 transition-colors p-2 select-none cursor-pointer mb-2'>
        <div className='avatar aspect-square h-10 w-10'>
          <img
            src='https://i.pravatar.cc/150?u=a042581f4e29026024d'
            alt='avatar'
            className=''
          />
        </div>
        <div className='flex flex-col w-full'>
          <p className='font-semibold text-base truncate text-ellipsis overflow-hidden max-w-xs'>
            Bishakha{' '}
          </p>
        </div>
      </div>

      <div className='px-2 flex flex-col h-full flex-1'>
        {/* messages */}
        <div className='grid max-h-[78dvh] overflow-y-auto my-2 h-[80dvh] min-h-[72dvh] items-start'>
          <Message type={MESSAGE_TYPES.DATE}>Hello there, How are you?</Message>
          <Message>Hello there, How are you?</Message>
          <Message type={MESSAGE_TYPES.SENT}>I'm fine, thank you</Message>
          <Message>Hello there, How are you?</Message>
          <Message type={MESSAGE_TYPES.SENT}>I'm fine, thank you</Message>
          <Message>Hello there, How are you?</Message>
          <Message type={MESSAGE_TYPES.SENT}>I'm fine, thank you</Message>
        </div>

        <LexicalComposer initialConfig={initialConfig}>
          <PlainTextPlugin
            contentEditable={
              <ContentEditable
                style={{ outline: 'none', position: 'relative' }}
              />
            }
            placeholder={
              <div className='absolute p-3 text-slate-500 select-none pointer-events-none'></div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
        </LexicalComposer>
      </div>
    </aside>
  )
}

export default ChatScreen

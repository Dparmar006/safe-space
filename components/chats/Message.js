import { MESSAGE_TYPES } from '@/utils/constants'
import dayjs from 'dayjs'
import React from 'react'

const Message = ({ type = MESSAGE_TYPES.RECEIVED, children }) => {
  if (type === MESSAGE_TYPES.DATE) {
    return <div className='divider text-xs'>{dayjs().format('D, MMM')}</div>
  }
  if (type === MESSAGE_TYPES.INFO) {
    return <div className='divider text-xs'>{children}</div>
  }
  return (
    <div
      className={`bg-backgroundSecondary self-start py-2 px-3 max-w-[80%] rounded-md my-2 text-sm ${
        type === MESSAGE_TYPES.SENT ? 'justify-self-end bg-primary' : ''
      } h-fit`}
    >
      {children}
    </div>
  )
}

export default Message

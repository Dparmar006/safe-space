export const MESSAGE_TYPES = {
  SENT: 'SENT',
  RECEIVED: 'RECEIVED',
  DATE: 'DATE',
  INFO: 'INFO'
}

export const MESSAGE_TYPES_LIST = Object.values(MESSAGE_TYPES)

export const CHAT_EVENTS = {
  CONNECTION: 'connection',
  USER_REQUESTED_TO_JOIN: 'USER_REQUESTED_TO_JOIN',
  USER_JOINED: 'USER_JOINED',

  //messages
  MESSAGE_SENT_REQUEST: 'MESSAGE_SENT_REQUEST',
  MESSAGE_RECEIVED: 'MESSAGE_RECEIVED',

  DISCONNECT: 'disconnect',
  USER_DISCONNECTED: 'USER_DISCONNECTED'
}

export const DEFAULT_API_LIMIT = 10
export const DEFAULT_API_PAGE = 1

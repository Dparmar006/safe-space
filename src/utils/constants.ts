export const MESSAGE_TYPES = {
  SENT: "SENT",
  RECEIVED: "RECEIVED",
  DATE: "DATE",
  INFO: "INFO",
};

export const MESSAGE_TYPES_LIST = Object.values(MESSAGE_TYPES);

export const CHAT_EVENTS = {
  CONNECTION: "connection",
  USER_REQUESTED_TO_JOIN: "USER_REQUESTED_TO_JOIN",
  USER_JOINED: "USER_JOINED",

  //messages
  MESSAGE_SENT_REQUEST: "MESSAGE_SENT_REQUEST",
  MESSAGE_RECEIVED: "MESSAGE_RECEIVED",

  DISCONNECT: "disconnect",
  USER_DISCONNECTED: "USER_DISCONNECTED",
};

export const DEFAULT_API_LIMIT = 20;
export const DEFAULT_API_PAGE = 1;

export const PROFILE_TABS = {
  POSTS: "POSTS",
  GALLERY: "GALLERY",
};

export const DEFAULT_SITE_DESCRIPTION =
  "Experience a social media platform like no other, where your preferences and interests take center stage. With Untold, you're in control. Discover, connect, and share in an environment designed exclusively for you.";

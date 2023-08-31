'use client'
import { io } from 'socket.io-client'

const URL = process.env.CHAT_BASE_URL
console.log(URL)
export const socket = io(URL)

"use client";
import { io } from "socket.io-client";

const URL = process.env.CHAT_BASE_URL;

export const socket = io(URL, { autoConnect: false });

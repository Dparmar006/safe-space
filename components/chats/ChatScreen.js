"use client";

import React, { useEffect, useState } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import Message from "./Message";
import { CHAT_EVENTS, MESSAGE_TYPES } from "@/utils/constants";
import { socket } from "@/utils/socket";
import { useSession } from "next-auth/react";

// Editor updater
function onError(error) {
  console.error(error);
}
const theme = {
  paragraph:
    "textarea textarea-block max-h-24 overflow-hidden overflow-y-auto min-w-100 text-sm",
};

const ChatScreen = () => {
  const session = useSession();
  const [messages, setMessages] = useState([]);
  const loggedinUser = session?.data?.user;
  const initialConfig = {
    namespace: "chat-message",
    theme,
    onError,
  };

  const initializeChatForUser = async () => {
    socket.emit(CHAT_EVENTS.USER_REQUESTED_TO_JOIN, { username: "nayra" });
  };

  const disconnectUser = () => {
    socket.disconnect();
    socket.off(CHAT_EVENTS.MESSAGE_RECEIVED);
  };

  const sendMessage = () => {
    const message = "Hello there !";
    const to = "dixit";
    socket.emit(CHAT_EVENTS.MESSAGE_SENT_REQUEST, { message }, to);
  };

  useEffect(() => {
    initializeChatForUser();
    socket.on(CHAT_EVENTS.MESSAGE_RECEIVED, (response) => {
      const { message } = response;
      setMessages((prev) => [message, ...prev]);
    });
    return () => {
      disconnectUser();
    };
  }, []);

  const onChange = (e, ...rest) => {
    const { root } = e.toJSON();
    console.log(root, { rest });
  };

  return (
    <aside className="flex flex-col h-full max-h-screen overflow-y-auto justify-between pb-2">
      <div className="flex gap-4 items-center bg-gray-1 hover:bg-gray-2 transition-colors p-2 select-none cursor-pointer mb-2">
        <div className="avatar aspect-square h-10 w-10">
          <img
            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
            alt="avatar"
            className=""
          />
        </div>
        <div className="flex flex-col w-full">
          <p className="font-semibold text-base truncate text-ellipsis overflow-hidden max-w-xs">
            Someone{" "}
          </p>
        </div>
      </div>

      <div className="flex flex-col h-full flex-1">
        {/* messages */}
        <div className="grid overflow-y-auto my-2 items-start flex-1">
          {messages.map((message) => (
            <Message type={MESSAGE_TYPES.RECEIVED}>{message}</Message>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <LexicalComposer initialConfig={initialConfig}>
            <PlainTextPlugin
              contentEditable={
                <ContentEditable
                  style={{
                    outline: "none",
                    position: "relative",
                    width: "100%",
                  }}
                />
              }
              placeholder={
                <div className="absolute p-3 text-zinc-500 select-none pointer-events-none">
                  Under development...
                </div>
              }
              ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin />
            <OnChangePlugin onChange={onChange} />
          </LexicalComposer>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={sendMessage}
          >
            SEND
          </button>
        </div>
      </div>
    </aside>
  );
};

export default ChatScreen;

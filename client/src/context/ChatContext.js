import React, { createContext, useContext, useState } from "react";

const ChatContext = createContext();

export const useChat = () => {
  return useContext(ChatContext);
};

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [chatList, setChatList] = useState([]);

  const addMessage = (message, chatRoomId) => {
    if (chatRoomId === currentChat?.chatRoomId) {
      setMessages((prevMessages) => [...prevMessages, message]);
    }
    setChatList((prevChatList) =>
      prevChatList
        .map((chatRoom) =>
          chatRoom.lastMessage?.chatRoom === chatRoomId
            ? { ...chatRoom, lastMessage: message }
            : chatRoom
        )
        .sort(
          (a, b) =>
            new Date(b.lastMessage?.updatedAt) -
            new Date(a.lastMessage?.updatedAt)
        )
    );
  };

  const value = {
    messages,
    setMessages,
    currentChat,
    setCurrentChat,
    addMessage,
    chatList,
    setChatList,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

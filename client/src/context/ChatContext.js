import React, { createContext, useContext, useState } from "react";

const ChatContext = createContext();

export const useChat = () => {
  return useContext(ChatContext);
};

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [chatList, setChatList] = useState([]);

  const addMessage = (newMessage, chatRoomId) => {
    if (chatRoomId === currentChat?.chatRoomId) {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    }
    setChatList((prevChatList) =>
      prevChatList
        .map((chatRoom) =>
          chatRoom.lastMessage?.chatRoom === chatRoomId
            ? { ...chatRoom, lastMessage: newMessage }
            : chatRoom
        )
        .sort(
          (a, b) =>
            new Date(b.lastMessage?.updatedAt) -
            new Date(a.lastMessage?.updatedAt)
        )
    );
  };

  const updateMessageStatus = (newMessage, chatRoomId) => {
    if (chatRoomId === currentChat?.chatRoomId) {
      setMessages((prevMessages) =>  {
        const updated = [...prevMessages];
        updated[updated.length - 1] = newMessage;
        return updated;
      });
    }
    setChatList((prevChatList) =>
      prevChatList
        .map((chatRoom) =>
          chatRoom.lastMessage?.chatRoom === chatRoomId
            ? { ...chatRoom, lastMessage: newMessage }
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
    updateMessageStatus
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

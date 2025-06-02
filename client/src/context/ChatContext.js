import React, { createContext, useContext, useState } from "react";

const ChatContext = createContext();

export const useChat = () => {
  return useContext(ChatContext);
};

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [chatList, setChatList] = useState([]);
  const addMessage = (newMessage, chatRoomId,friendId) => {
    if (chatRoomId === currentChat?.chatRoomId) {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    }
    setChatList((prevChatList) =>
      prevChatList
        .map((friends) =>
          friends.lastMessage?.chatRoom === chatRoomId || friends._id === friendId
            ? { ...friends, lastMessage: newMessage }
            : friends
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
        return prevMessages.map((message) =>
          message._id === newMessage._id ? newMessage : message
        );
      });
    }
    setChatList((prevChatList) =>
      prevChatList
        .map((friends) =>
          friends.lastMessage?.chatRoom === chatRoomId &&
          friends.lastMessage._id === newMessage._id
            ? { ...friends, lastMessage: newMessage }
            : friends
        )
        .sort(
          (a, b) =>
            new Date(b.lastMessage?.updatedAt) -
            new Date(a.lastMessage?.updatedAt)
        )
    );
  };

  const addError = (messageId, chatRoomId) => {
    if (chatRoomId === currentChat?.chatRoomId) {
      setMessages((prevMessages) =>
        prevMessages.map((message) =>
          message._id === messageId
            ? { ...message, errorSending: true }
            : message
        )
      );
    }
    setChatList((prevChatList) =>
      prevChatList
        .map((friends) =>
          friends.lastMessage?.chatRoom === chatRoomId
            && friends.lastMessage?._id === messageId
            ? { ...friends, lastMessage: 
            {
              ...friends.lastMessage,
              errorSending: true,
            } }
            : friends
        )
        .sort(
          (a, b) =>
            new Date(b.lastMessage?.updatedAt) -
            new Date(a.lastMessage?.updatedAt)
        )
    );
  }
  

  const value = {
    messages,
    setMessages,
    currentChat,
    setCurrentChat,
    addMessage,
    chatList,
    setChatList,
    updateMessageStatus,
    addError
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

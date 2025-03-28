import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { API_URL } from "../../services/Constants";
import { useChat } from "../../context/ChatContext";
import { useParams } from "react-router-dom";
import {
  getChatRoomData,
  getFriend,
  getMessages,
} from "../../services/ChatServices";
import { useAuth } from "../../context/AuthContext";
import Messages from "./components/Messages/Messages";
import { useNavigate } from "react-router-dom";
import ChatHeader from "./components/ChatHeader/ChatHeader";
import MessageInput from "./components/MessageInput/MessageInput";

const socket = io(API_URL);

function ChatRoom() {
  const { chatRoomId } = useParams();
  const { currentChat, setCurrentChat, messages, setMessages, addMessage } =
    useChat();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [messageInput, setMessageInput] = useState("");
  const [isMember, setIsMember] = useState(false);

  useEffect(() => {
    const fetchChatRoomData = async () => {
      const friendId = await handleChatRoomData(chatRoomId);
      await handleChatRoomFriend(friendId);
      await handleGetMessages(chatRoomId);
    };

    fetchChatRoomData();
  }, [chatRoomId]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    socket.emit("joinRoom", { chatRoomId });

    socket.on("receiveMessage", (message) => {
      addMessage(message, chatRoomId);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [chatRoomId, addMessage]);

  const handleChatRoomData = async (chatRoomId) => {
    try {
      const chatRoomData = await getChatRoomData(chatRoomId);
      if (chatRoomData.members.includes(user.id)) {
        setIsMember(true);
      } else {
        setIsMember(false);
        navigate("/");
      }
      if (user.id === chatRoomData.members[0]) {
        return chatRoomData.members[1];
      } else {
        return chatRoomData.members[0];
      }
    } catch (err) {
      console.log(err.response?.data || "An error occurred.");
    }
  };

  const handleChatRoomFriend = async (friendId) => {
    try {
      const friend = await getFriend(friendId);
      setCurrentChat(friend);
    } catch (err) {
      console.log(err.response?.data || "An error occurred.");
    }
  };

  const handleGetMessages = async (chatRoomId) => {
    try {
      const messages = await getMessages(chatRoomId);
      setMessages(messages);
    } catch (err) {
      console.log(err.response?.data || "An error occurred.");
    }
  };

  const handleSend = async () => {
    if (!messageInput.trim()) return;

    socket.emit("sendMessage", {
      chatRoomId,
      userId: user.id,
      message: messageInput,
    });

    setMessageInput("");
  };

  return (
    <>
      {isMember && (
        <>
          <ChatHeader currentChat={currentChat} />
          <Messages messages={messages} />
          <MessageInput
            handleSend={handleSend}
            messageInput={messageInput}
            setMessageInput={setMessageInput}
          />
        </>
      )}
    </>
  );
}

export default ChatRoom;

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
  const [isMember, setIsMember] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchChatRoomData = async () => {
      try {
        setLoading(true);
        const friendId = await handleChatRoomData(chatRoomId);
        await handleChatRoomFriend(friendId,chatRoomId);
        await handleGetMessages(chatRoomId);
      } catch (err) {
        console.log(err.response?.data || "An error occurred.");
      } finally {
        setLoading(false);
      }
    };
    fetchChatRoomData();
  }, [chatRoomId]); // eslint-disable-line react-hooks/exhaustive-deps


  const handleChatRoomData = async (chatRoomId) => {
    try {
      const chatRoomData = await getChatRoomData(chatRoomId);
      if (chatRoomData?.members.includes(user.id)) {
        setIsMember(true);
      } else {
        setIsMember(false);
        navigate("/");
        return;
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

  const handleChatRoomFriend = async (friendId,chatRoomId) => {
    try {
      const friend = await getFriend(friendId);
      const updatedFriend = { ...friend, chatRoomId };
      setCurrentChat(updatedFriend);
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

  

  return (
    <>
      {isMember && (
        <>
          <ChatHeader currentChat={currentChat} loading={loading} />
          <Messages messages={messages} loading={loading} />
          <MessageInput
            chatRoomId={chatRoomId}
            socket={socket}
          />
        </>
      )}
    </>
  );
}

export default ChatRoom;

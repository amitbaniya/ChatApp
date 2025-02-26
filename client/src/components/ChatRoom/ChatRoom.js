import React, { useEffect, useState } from "react";
import "./ChatRoom.css";
import { PROFILE_URL } from "../../services/Constants";
import { Avatar, Input } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { useChat } from "../../context/ChatContext";
import { useParams } from "react-router-dom";
import {
  getChatRoomData,
  getFriend,
  getMessages,
  sendMessage,
} from "../../services/ChatServices";
import { useAuth } from "../../context/AuthContext";
import Messages from "./components/Messages";

function ChatRoom() {
  const { chatRoomId } = useParams();
  const { currentChat, setCurrentChat, messages, setMessages, addMessage } =
    useChat();
  const { user } = useAuth();

  const [messageInput, setMessageInput] = useState("");
  useEffect(() => {
    const fetchChatRoomData = async () => {
      const friendId = await handleChatRoomData(chatRoomId);
      await handleChatRoomFriend(friendId);
      await handleGetMessages(chatRoomId);
    };
    if (!currentChat || messages.length === 0) {
      fetchChatRoomData();
    }
  }, [chatRoomId]);

  const handleChatRoomData = async (chatRoomId) => {
    try {
      const chatRoomData = await getChatRoomData(chatRoomId);

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
    try {
      const message = await sendMessage(chatRoomId, user.id, messageInput);
      setMessageInput("");
      addMessage(message);
    } catch (err) {
      console.log(err.response?.data || "An error occurred.");
    }
  };

  return (
    <>
      {!currentChat ? (
        "Loading"
      ) : (
        <>
          <div className="chatHeader">
            <Avatar
              className="chatProfile"
              style={{
                "--profile-bg": `url(${PROFILE_URL}/default.png)`,
              }}
            ></Avatar>

            <h1 className="chatName">
              {" "}
              {`${currentChat.firstname} ${currentChat.lastname}`}
            </h1>
          </div>
          <div className="chatContainer">
            {messages.length !== 0 && <Messages messages={messages} />}
          </div>
          <div className="messageInputContainer">
            <Input
              placeholder="Send message"
              className="messageInput"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSend();
                }
              }}
            ></Input>
            <SendOutlined className="sendButton" onClick={handleSend} />
          </div>
        </>
      )}
    </>
  );
}

export default ChatRoom;

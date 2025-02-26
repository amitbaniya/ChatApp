import React, { useEffect, useRef, useState } from "react";
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
import { useNavigate } from "react-router-dom";

function ChatRoom() {
  const { chatRoomId } = useParams();
  const { currentChat, setCurrentChat, messages, setMessages, addMessage } =
    useChat();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [messageInput, setMessageInput] = useState("");
  const [isMember, setIsMember] = useState(false);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    const fetchChatRoomData = async () => {
      const friendId = await handleChatRoomData(chatRoomId);
      await handleChatRoomFriend(friendId);
      await handleGetMessages(chatRoomId);
    };

    fetchChatRoomData();
  }, [chatRoomId]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);
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
          {isMember && (
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
              <div className="chatContainer" ref={chatContainerRef}>
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
      )}
    </>
  );
}

export default ChatRoom;

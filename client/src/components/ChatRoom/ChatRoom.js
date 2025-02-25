import React, { useEffect, useState } from "react";
import "./ChatRoom.css";
import { PROFILE_URL } from "../../services/Constants";
import { Avatar, Input } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { useChat } from "../../context/ChatContext";
import { useParams } from "react-router-dom";
import { getChatRoomData, getFriend } from "../../services/ChatServices";
import { useAuth } from "../../context/AuthContext";

function ChatRoom() {
  const { chatRoomId } = useParams();
  const { currentChat, setCurrentChat } = useChat();
  const { user } = useAuth();

  const [messageInput, setMessage] = useState("");
  useEffect(() => {
    const fetchChatRoomData = async () => {
      const friendId = await handleChatRoomData(chatRoomId);
      await handleChatRoomFriend(friendId);
    };
    if (!currentChat) {
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
      console.log(friend);
      setCurrentChat(friend);
    } catch (err) {
      console.log(err.response?.data || "An error occurred.");
    }
  };

  const handleSend = () => {
    console.log("Message sent");
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
          <div className="chatContainer"></div>
          <div className="messageInputContainer">
            <Input
              placeholder="Send message"
              className="messageInput"
              value={messageInput}
              onChange={(e) => setMessage(e.target.value)}
            ></Input>
            <SendOutlined className="sendButton" onClick={handleSend} />
          </div>
        </>
      )}
    </>
  );
}

export default ChatRoom;

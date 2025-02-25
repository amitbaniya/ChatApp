import React, { useEffect, useState } from "react";
import "./ChatRoom.css";
import { PROFILE_URL } from "../../services/Constants";
import { Avatar, Input } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { useChat } from "../../context/ChatContext";
import { useParams } from "react-router-dom";

function ChatRoom() {
  const { chatRoomId } = useParams();
  const { currentChat, setCurrentChat } = useChat();
  const [messageInput, setMessage] = useState("");
  useEffect(() => {
    if (chatRoomId && (!currentChat || currentChat.id !== chatRoomId)) {
      const fetchedChat = {
        id: chatRoomId,
        firstname: "John",
        lastname: "Doe",
      };
      setCurrentChat(fetchedChat);
    }
  }, [chatRoomId, currentChat, setCurrentChat]);

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

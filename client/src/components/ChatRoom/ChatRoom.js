import React, { useState } from "react";
import "./ChatRoom.css";
import { PROFILE_URL } from "../../services/Constants";
import { Avatar, Input } from "antd";
import { SendOutlined } from "@ant-design/icons";

function ChatRoom() {
  const handleSend = () => {
    console.log("Message sent");
  };
  const [searchMessage, setMessage] = useState("");
  return (
    <>
      <div className="chatHeader">
        <Avatar
          className="chatProfile"
          style={{
            "--profile-bg": `url(${PROFILE_URL}/default.png)`,
          }}
        ></Avatar>
        <h1 className="chatName">Amit Baniya</h1>
      </div>
      <div className="chatContainer"></div>
      <div className="messageInputContainer">
        <Input
          placeholder="Send message"
          className="messageInput"
          value={searchMessage}
          onChange={(e) => setMessage(e.target.value)}
        ></Input>
        <SendOutlined className="sendButton" onClick={handleSend} />
      </div>
    </>
  );
}

export default ChatRoom;

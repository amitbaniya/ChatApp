import React from "react";
import "./MessageInput.css";
import { Input } from "antd";
import { SendOutlined } from "@ant-design/icons";

function MessageInput({ handleSend, messageInput, setMessageInput }) {
  return (
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
  );
}
export default MessageInput;

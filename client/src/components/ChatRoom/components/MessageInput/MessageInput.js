import React from "react";
import "./MessageInput.css";
import { Input } from "antd";
import { PictureOutlined, SendOutlined } from "@ant-design/icons";
import ImageUploader from "../../../ImageUploader/ImageUploader";
import { useState } from "react";

function MessageInput({ handleSend, messageInput, setMessageInput }) {
  const [imageUrl, setImageUrl] = useState(null);
  const onImageUpload = (url) => {
    // Send publicId to backend
    setImageUrl(url); 
    console.log(url)
  };
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
      <ImageUploader onUpload={onImageUpload} icon={<PictureOutlined className="uploadButton" />} />
      <SendOutlined className="sendButton" onClick={handleSend} />
    </div>
  );
}
export default MessageInput;

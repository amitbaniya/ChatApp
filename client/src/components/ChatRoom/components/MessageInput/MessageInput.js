import React from "react";
import "./MessageInput.css";
import { Input } from "antd";
import { PictureOutlined, SendOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useAuth } from "../../../../context/AuthContext";
import ImagePreview from "../ImagePeview/ImagePreview";
import ImageSelector from "../ImageSelector/ImageSelector";
import { sendMessage } from "../../../../services/ChatServices";
import { useChat } from "../../../../context/ChatContext";

function MessageInput({ chatRoomId,socket }) {
  const { user } = useAuth();
  const [messageInput, setMessageInput] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const { currentChat,addMessage } = useChat();
  const handleSend = async () => {
    if (!messageInput.trim()) return;
    try {
      const userId = user.id
      const friendId = currentChat._id;
      await sendMessage(chatRoomId, userId, messageInput, selectedImages, socket, friendId,addMessage, setSelectedImages, setMessageInput);
      
    } catch (error) {
      console.log(error)
    }
  };


  const onImageUpload = (newImages) => {
    // Send publicId to backend
    setSelectedImages(prev => [...prev, ...newImages]);
  };


  return (
    <div className="messageInputContainer">
       {selectedImages && (
        <ImagePreview selectedImages={selectedImages} setSelectedImages={setSelectedImages} />
    )}
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
      <ImageSelector onUpload={onImageUpload} icon={<PictureOutlined className="uploadButton" />} />
      <SendOutlined className="sendButton" onClick={handleSend} />
    </div>
  );
}
export default MessageInput;

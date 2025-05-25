import React from "react";
import "./MessageInput.css";
import { Input } from "antd";
import { PictureOutlined, SendOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "../../../../context/AuthContext";
import ImagePreview from "../ImagePeview/ImagePreview";
import ImageSelector from "../ImageSelector/ImageSelector";

function MessageInput({ chatRoomId,socket }) {
  const { user } = useAuth();
  const [messageInput, setMessageInput] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);

  useEffect(() => {
      socket.emit("joinRoom", { chatRoomId });
  
      return () => {
        socket.off("receiveMessage");
      };
    }, [chatRoomId,socket]);
  const handleSend = async () => {
    if (!messageInput.trim()) return;

    socket.emit("sendMessage", {
      chatRoomId,
      userId: user.id,
      message: messageInput,
    });

    setMessageInput("");
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
      <ImageSelector onUpload={onImageUpload} selectedImages={selectedImages} setSelectedImages={setSelectedImages} icon={<PictureOutlined className="uploadButton" />} />
      <SendOutlined className="sendButton" onClick={handleSend} />
    </div>
  );
}
export default MessageInput;

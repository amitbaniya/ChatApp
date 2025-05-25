import React from "react";
import "./MessageInput.css";
import { Input } from "antd";
import { PictureOutlined, SendOutlined } from "@ant-design/icons";
import ImageUploader from "../../../ImageUploader/ImageUploader";
import { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "../../../../context/AuthContext";
import ImagePreview from "../ImagePeview/ImagePreview";

function MessageInput({ chatRoomId,socket }) {
  const { user } = useAuth();
  const [messageInput, setMessageInput] = useState("");
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
      socket.emit("joinRoom", { chatRoomId });
  
      return () => {
        socket.off("receiveMessage");
      };
    }, [chatRoomId]);
  const handleSend = async () => {
    if (!messageInput.trim()) return;

    socket.emit("sendMessage", {
      chatRoomId,
      userId: user.id,
      message: messageInput,
    });

    setMessageInput("");
  };


  
  const onImageUpload = (url) => {
    // Send publicId to backend
    setImageUrls(prevItems => [...prevItems, url]);
  };


  return (
    <div className="messageInputContainer">
       {imageUrls && (
        <ImagePreview imageUrls={imageUrls} setImageUrls={setImageUrls} />
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
      <ImageUploader onUpload={onImageUpload} icon={<PictureOutlined className="uploadButton" />} />
      <SendOutlined className="sendButton" onClick={handleSend} />
    </div>
  );
}
export default MessageInput;

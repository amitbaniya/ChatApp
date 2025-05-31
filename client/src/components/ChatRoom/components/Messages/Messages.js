import React, { useEffect, useRef } from "react";
import "./Messages.css";
import { useAuth } from "../../../../context/AuthContext";
import { Spin } from "antd";
import { io } from "socket.io-client";
import { API_URL } from "../../../../services/Constants";
import Message from "./components/Message"
const socket = io(API_URL);

function Messages({ messages, loading }) {
 const { user } = useAuth(); 
  const chatContainerRef = useRef(null);
  
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSeen = (message) => {
   socket.emit("messageSeen", { message, userId:user.id}); 
};

  return (
    <>
      {loading ? (
        <div className="chatContainer">
          <Spin size="large" />
        </div>
      ) : (
        <div className="chatContainer" ref={chatContainerRef}>
          {messages.length !== 0 ? (
            <>
                {messages.map((message) => (
                  <Message key={message._id}  message={message} onSeen={handleSeen} />
              ))}
            </>
          ) : (
            <>
              <span>Message to show if no chat available</span>
            </>
          )}
        </div>
      )}
    </>
  );
}
export default Messages;

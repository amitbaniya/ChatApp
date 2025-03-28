import React, { useEffect, useRef } from "react";
import "./Messages.css";
import { useAuth } from "../../../../context/AuthContext";

function Messages({ messages }) {
  const { user } = useAuth();
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);
  return (
    <div className="chatContainer" ref={chatContainerRef}>
      {messages.length !== 0 ? (
        <>
          {messages.map((message) => (
            <div
              key={message._id}
              className={`messageContainer ${
                message?.sender === user.id ? "right" : ""
              }`}
            >
              <div className="message">{message.message}</div>
            </div>
          ))}
        </>
      ) : (
        <>
          <span>Message to show if no chat available</span>
        </>
      )}
    </div>
  );
}
export default Messages;

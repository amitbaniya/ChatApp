import React from "react";
import "./Messages.css";
import { useAuth } from "../../../context/AuthContext";

function Messages({ messages }) {
  const { user } = useAuth();
  return (
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
  );
}
export default Messages;

import React, { useEffect, useRef } from "react";
import "./Messages.css";
import { useAuth } from "../../../../context/AuthContext";
import { Skeleton, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

function Messages({ messages, loading }) {
  const { user } = useAuth();
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);
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
      )}
    </>
  );
}
export default Messages;

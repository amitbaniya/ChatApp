import React, { useEffect, useRef } from "react";
import "./Messages.css";
import { useAuth } from "../../../../context/AuthContext";
import { Spin } from "antd";
import { CheckCircleFilled, CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";


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
                  <div className="message">{message.message}
                    {message?.sender === user.id && message?.status === 'sending' && (
                      <div className="messageLoading"></div>
                    )}
                  </div>
                  {message?.sender === user.id &&
                    <>
                    {message?.status === 'failed' &&
                      <CloseCircleOutlined className="statusSigns" />
                    }
                  {message?.status === 'sent' &&
                      <CheckCircleOutlined className="statusSigns sent" />
                    }
                  {message?.status === 'delivered' &&
                      <CheckCircleFilled className="statusSigns delivered" />
                    }
                    {message?.status === 'seen' &&
                      <CheckCircleFilled className="statusSigns seen" />
                    }
                    </>}
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

import React, { useEffect, useRef } from "react";
import { useAuth } from "../../../../../context/AuthContext";
import { CheckCircleFilled, CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

const Message = ({ message, onSeen }) => {
  const ref = useRef();
  const { user } = useAuth();
  useEffect(() => {
    if (message.sender === user.id) return;
    if (message.status === 'seen') return;
    const target = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onSeen(message);
          observer.disconnect();
        }
      },
      { threshold: 0.1 } 
    );

    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [message,onSeen,user.id]);

  return (
      <div
          key={message._id}
          className={`messageContainer ${
            message?.sender === user.id ? "right" : ""
          }`}
        >
          <div ref={ref} className="message">{message.message}
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
  );
};

export default Message;
import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../../../../context/AuthContext";
import { CheckCircleFilled, CheckCircleOutlined, CloseCircleOutlined, DownloadOutlined } from "@ant-design/icons";
import { useChat } from "../../../../../context/ChatContext";
import { Avatar } from "antd";

const Message = ({ message, onSeen }) => {
  const ref = useRef();
  const { user } = useAuth();
  const [previewIndex, setPreviewIndex] = useState(null)
  const { currentChat } = useChat();

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
      {message.sender !== user.id &&
      <>
        {currentChat.profilePicture === "" ?
          <Avatar className="senderPicture default">
           {currentChat.firstname.charAt(0)}
          </Avatar> :
          <Avatar
            className="senderPicture"
            style={{
              "--profile-bg": `url(${currentChat.profilePicture})`,
            }}
        ></Avatar> }</>
       }
     
        {message.text !== "" &&
          <div ref={ref} className="message">
            {message.text}
            {message?.sender === user.id && message?.status === 'sending' && (
              <div className="messageLoading"></div>
            )}
              
              
          </div>
        }
          {message.imageUrls.length !== 0 &&
            
        <div ref={ref} className="imageGridContainer">
            {message.imageUrls?.map((selectedImage, index) => (
              <div className="imageMessageContainer" key={index} onClick={() => setPreviewIndex(index)}>
                <img src={selectedImage} alt="preview" className="imageMessage" />
                <DownloadOutlined className="downloadButton" />
              </div>
            ))}
          {previewIndex !== null && (
          <div className="imagePreviewOverlay" onClick={() => setPreviewIndex(null)}>
            <div className="previewImageContainer" onClick={e => e.stopPropagation()}>
              <img
                src={message.imageUrls[previewIndex]}
                alt="full preview"
                className="previewImage"
                />
                {message.imageUrls.length > 1 &&
                  <>
                    <button
                      className="navButton prevButton"
                      onClick={() => setPreviewIndex(prev => (prev - 1 + message.imageUrls.length) % message.imageUrls.length)}
                    >
                      ‹
                    </button>
                    <button
                      className="navButton nextButton"
                      onClick={() => setPreviewIndex(prev => (prev + 1) % message.imageUrls.length)}
                    >
                      ›
                    </button>
                  </>
              }
              
              <button className="closeButton" onClick={() => setPreviewIndex(null)}>×</button>
            </div>
          </div>
        )}
          </div>
          }
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
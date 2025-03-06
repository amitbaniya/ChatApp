import React from "react";
import { Avatar } from "antd";
import "./UserList.css";
import { PROFILE_URL } from "../../services/Constants";
import { useChat } from "../../context/ChatContext";
import { useAuth } from "../../context/AuthContext";

function UserList({ onUserClick }) {
  const { currentChat, chatList } = useChat();
  const { user } = useAuth();
  const handleChatRoom = (friend) => {
    onUserClick(friend);
  };

  return (
    <>
      {chatList.map((friend) => (
        <div
          key={friend.username}
          className={`friendContainer ${
            currentChat?.id === friend.id ? "selected" : ""
          }`}
          onClick={() => handleChatRoom(friend)}
        >
          <div className="profilePicture">
            <Avatar
              className="profile"
              style={{
                "--profile-bg": `url(${PROFILE_URL}/${friend.profilePicture})`,
              }}
            ></Avatar>
          </div>
          <div className="friendDetails">
            <span>{`${friend.firstname} ${friend.lastname}`}</span>
            {friend.lastMessage && (
              <div>
                {friend.lastMessage.sender === user.id ? (
                  <span className="lastChat">
                    You: {friend.lastMessage.message}
                  </span>
                ) : (
                  <span className="lastChat">{friend.lastMessage.message}</span>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
}

export default UserList;

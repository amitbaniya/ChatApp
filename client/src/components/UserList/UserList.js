import React from "react";
import { Avatar } from "antd";
import "./UserList.css";
import { PROFILE_URL } from "../../services/Constants";
import { useChat } from "../../context/ChatContext";

function UserList({ users, onUserClick }) {
  const { currentChat } = useChat();
  const handleChatRoom = (user) => {
    onUserClick(user);
  };

  return (
    <>
      {users.map((user) => (
        <div
          key={user.username}
          className={`friendContainer ${
            currentChat.id === user.id ? "selected" : ""
          }`}
          onClick={() => handleChatRoom(user)}
        >
          <div className="profilePicture">
            <Avatar
              className="profile"
              style={{
                "--profile-bg": `url(${PROFILE_URL}/${user.profilePicture})`,
              }}
            ></Avatar>
          </div>
          <div className="friendDetails">
            <span>{`${user.firstname} ${user.lastname}`}</span>
          </div>
        </div>
      ))}
    </>
  );
}

export default UserList;

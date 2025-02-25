import React from "react";
import { Avatar } from "antd";
import "./UserList.css";
import { PROFILE_URL } from "../../services/Constants";

function UserList({ users, onUserClick }) {
  const handleChatRoom = (user) => {
    onUserClick(user);
  };

  return (
    <>
      {users.map((user) => (
        <div
          key={user.username}
          className="friendContainer"
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

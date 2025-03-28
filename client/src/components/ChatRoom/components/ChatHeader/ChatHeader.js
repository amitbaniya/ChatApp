import React from "react";
import "./ChatHeader.css";
import { PROFILE_URL } from "../../../../services/Constants";
import { Avatar } from "antd";
//IsMemeber>CurrentChat>Messages
function ChatHeader({ currentChat }) {
  return (
    <>
      {!currentChat ? (
        "Hello"
      ) : (
        <div className="chatHeader">
          <Avatar
            className="chatProfile"
            style={{
              "--profile-bg": `url(${PROFILE_URL}/${currentChat.profilePicture})`,
            }}
          ></Avatar>

          <h1 className="chatName">
            {" "}
            {`${currentChat.firstname} ${currentChat.lastname}`}
          </h1>
        </div>
      )}
    </>
  );
}
export default ChatHeader;

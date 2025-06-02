import React from "react";
import "./ChatHeader.css";
import { PROFILE_URL } from "../../../../services/Constants";
import { Avatar, Skeleton } from "antd";
//IsMemeber>CurrentChat>Messages
function ChatHeader({ currentChat, loading }) {
  return (
    <>
      {loading ? (
        <div className="chatHeader">
          <Skeleton
            avatar
            active
            title={{ width: 150 }}
            paragraph={{ rows: 0 }}
            round
          ></Skeleton>
        </div>
      ) : (
        <div className="chatHeader">
        {currentChat.profilePicture === "" ?
          <Avatar className="chatProfile default">
            {currentChat.firstname.charAt(0)}
          </Avatar> :
          <Avatar
            className="chatProfile"
            style={{
              "--profile-bg": `url(${currentChat.profilePicture})`,
            }}
        ></Avatar> }
               

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

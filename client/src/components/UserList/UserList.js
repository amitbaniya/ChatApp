import React from "react";
import { Avatar, Skeleton } from "antd";
import "./UserList.css";
import { PROFILE_URL } from "../../services/Constants";
import { useChat } from "../../context/ChatContext";
import { useAuth } from "../../context/AuthContext";

function UserList({ onUserClick, loading }) {
  const { currentChat, chatList } = useChat();
  const { user } = useAuth();
  
  const handleChatRoom = (friend) => {
    onUserClick(friend);
  };
  return (
    <>
      {loading ? (
        <>
          {[...Array(20)].map((_, index) => (
            <div key={index} className="friendContainer">
              <Skeleton
                avatar
                title={{ width: 100 }}
                paragraph={{ rows: 1, width: 200 }}
                active
                round
              />
            </div>
          ))}
        </>
      ) : (
        chatList.map((friend) => (
          <div
            key={friend.username}
            className={`friendContainer ${
              currentChat?._id === friend._id ? "selected" : ""
            }`}
            onClick={() => handleChatRoom(friend)}
          >
          <div className="profilePicture">
            {friend.profilePicture === "" ?
              <Avatar className="profile default">
                          {friend.firstname.charAt(0)}
              </Avatar> :
              <Avatar
              className="profile"
              style={{
                "--profile-bg": `url(${friend.profilePicture})`,
              }}
              ></Avatar>}
             
            </div>
            <div className={`friendDetails ${friend.lastMessage.status !=="seen" && friend.lastMessage.sender !== user.id ? "notSeen" : ""}`}>
              <span>{`${friend.firstname} ${friend.lastname}`}</span>
              {friend.lastMessage && (
                <div>
                  {friend.lastMessage.sender === user.id ? (
                    <span className="lastChat">
                      You: {friend.lastMessage.text !==""? friend.lastMessage.text: "📸Photo"}
                    </span>
                  ) : (
                    <span className="lastChat">
                      {friend.lastMessage.text !==""? friend.lastMessage.text: "📸Photo"}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </>
  );
}

export default UserList;

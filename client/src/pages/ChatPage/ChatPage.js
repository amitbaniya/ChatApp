import React, { useEffect, useState } from "react";
import "./ChatPage.css";
import { useAuth } from "../../context/AuthContext";
import { useChat } from "../../context/ChatContext";
import { Layout, Input, Spin } from "antd";
import UserList from "../../components/UserList/UserList";
import { handleSearch, handleChatRoom, ChatList } from "./Functions";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

function ChatPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { user } = useAuth();
  const { setCurrentChat, setChatList } = useChat();
  const [showChat, setShowChat] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!searchTerm) {
      setError("");
      ChatList(user.id, setLoading, setError, setChatList);

      return;
    }

    const timer = setTimeout(() => {
      handleSearch(searchTerm, setChatList, setLoading, setError);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (location.pathname === "/") {
      setShowChat(false);
    } else {
      setShowChat(true);
    }
  }, [location]);

  const onUserClick = async (friend) => {
    const chatRoom = await handleChatRoom(
      user.id,
      friend._id,
      setLoading,
      setError
    );
    setCurrentChat(friend);
    navigate(`/${chatRoom._id}`);
    setShowChat(true);
  };
  return (
    <Layout className="chatPage">
      <section className={`chatRoom ${showChat ? "show" : ""}`}>
        <Outlet />
      </section>
      <section className={`chats ${showChat ? "hide" : ""}`}>
        <h1>Chats</h1>
        <Input
          placeholder="Search Friends"
          className="searchBar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        ></Input>
        <div className="friendsContainer">
          {loading && (
            <div style={{ textAlign: "center", margin: "20px 0" }}>
              <Spin tip="Loading..." />
            </div>
          )}
          {error && (
            <div style={{ textAlign: "center", margin: "20px 0" }}>{error}</div>
          )}

          <UserList onUserClick={onUserClick} />
        </div>
      </section>
    </Layout>
  );
}

export default ChatPage;

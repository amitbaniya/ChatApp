import React, { useEffect, useState } from "react";
import "./ChatPage.css";
import { useAuth } from "../../context/AuthContext";
import { useChat } from "../../context/ChatContext";
import { Layout, Input, Spin } from "antd";
import UserList from "../../components/UserList/UserList";
import { getFriendsList, handleSearch, handleChatRoom } from "./Functions";
import { Outlet, useNavigate } from "react-router-dom";

function ChatPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { user } = useAuth();
  const { setCurrentChat } = useChat();
  const navigate = useNavigate();

  useEffect(() => {
    if (!searchTerm) {
      setError("");
      getFriendsList(user.id, setUsers, setLoading, setError);
      return;
    }

    const timer = setTimeout(() => {
      handleSearch(searchTerm, setUsers, setLoading, setError);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]); // eslint-disable-line react-hooks/exhaustive-deps

  const onUserClick = async (friend) => {
    const chatRoom = await handleChatRoom(
      user.id,
      friend._id,
      setLoading,
      setError
    );
    setCurrentChat(friend);
    navigate(`/${chatRoom._id}`);
  };
  return (
    <Layout className="chatPage">
      <section className="chatRoom">
        <Outlet />
      </section>
      <section className="chats">
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

          <UserList users={users} onUserClick={onUserClick} />
        </div>
      </section>
    </Layout>
  );
}

export default ChatPage;

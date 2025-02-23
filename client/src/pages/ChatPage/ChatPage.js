import React, { useEffect, useState } from "react";
import "./ChatPage.css";
import { findFriends } from "../../services/ChatServices";
import { useAuth } from "../../context/AuthContext";
import { Layout, Input, Avatar, Spin } from "antd";
import { PROFILE_URL } from "../../services/Constants";

function ChatPage() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    if (!query) {
      setUsers([]);
      setError("");
      return;
    }

    const timer = setTimeout(() => {
      handleSearch(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSearch = async (searchTerm) => {
    setLoading(true);
    setError("");
    try {
      const data = await findFriends(searchTerm);

      if (data.users.length) {
        setUsers(data.users);
      } else {
        setUsers([]);
        setError("No Users Found");
      }
    } catch (err) {
      console.log("Failed to fetch results. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout className="chatPage">
      <section className="chatRoom"></section>
      <section className="chats">
        <h1>Chats</h1>
        <Input
          placeholder="Search Friends"
          className="searchBar"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
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

          {users.map((user) => (
            <div key={user.username} className="friendContainer">
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
        </div>
      </section>
    </Layout>
  );
}

export default ChatPage;

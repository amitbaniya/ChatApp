import React from "react";
import { Button, Avatar } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import "./Header.css";
import { useAuth } from "../../context/AuthContext";
import { PROFILE_URL } from "../../services/Constants";

function Header() {
  const { user, loading, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };
  return (
    <header className="header">
      <h1 className="logo">Chat-App</h1>
      {!loading && user && (
        <div className="profile-section">
          <Button className="logout-button" onClick={handleLogout}>
            Logout
          </Button>
          <LogoutOutlined
            className="logout-button-icon"
            onClick={handleLogout}
          />
          <Avatar
            className="main-profile"
            style={{
              "--profile-bg": `url(${PROFILE_URL}/default.png)`,
            }}
          ></Avatar>
        </div>
      )}
    </header>
  );
}

export default Header;

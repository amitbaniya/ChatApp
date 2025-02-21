import React from "react";
import { Button, Avatar } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import "./Header.css";
function Header() {
  return (
    <header className="header">
      <h1 className="logo">Chat-App</h1>
      <div className="profile-section">
        <Button className="logout-button">Logout</Button>
        <LogoutOutlined className="logout-button-icon" />
        <Avatar
          className="profile"
          style={{
            "--profile-bg": `url(${process.env.REACT_APP_PROFILE_URL}/default.png)`,
          }}
        ></Avatar>
      </div>
    </header>
  );
}

export default Header;

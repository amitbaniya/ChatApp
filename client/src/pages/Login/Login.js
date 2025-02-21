import React from "react";
import { Button, Form, Input } from "antd";
import "./Login.css";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { loginUser } from "../../services/AuthServices";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const { login } = useAuth();
  const [form] = Form.useForm();
  const handleLogin = async (values) => {
    try {
      const data = await loginUser(JSON.stringify(values));
      console.log("Login success:", data);

      login(data.token, data.user);
    } catch (err) {
      console.log(err.response?.data || "An error occurred.");
    }
  };
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  return (
    <section className="login-page">
      <div className="login-container">
        <h1 className="login-heading">LOGIN</h1>
        <Form
          name="loginform"
          form={form}
          className="login-form"
          onFinish={handleLogin}
          autoComplete="off"
        >
          <Form.Item name="username" style={{ marginBottom: "32px" }}>
            <Input placeholder="Username" />
          </Form.Item>

          <Form.Item name="password" style={{ marginBottom: "10px" }}>
            <div className="password-wrapper">
              <Input
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
                className="password-input"
              />
              <Button
                type="text"
                className="password-toggle-button"
                onClick={() => setPasswordVisible((prevState) => !prevState)}
              >
                {passwordVisible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
              </Button>
            </div>
          </Form.Item>

          <Link to="/register" className="register-navigate-button">
            Don't have an account? Create one.
          </Link>

          <Form.Item className="login-button-wrapper">
            <Button type="primary" htmlType="submit" className="login-button">
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
}

export default Login;

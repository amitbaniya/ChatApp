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
    <section className="authPage">
      <div className="authContainer">
        <h1 className="authHeading">LOGIN</h1>
        <Form
          name="authform"
          form={form}
          className="authForm"
          onFinish={handleLogin}
          autoComplete="off"
        >
          <Form.Item name="username" style={{ marginBottom: "32px" }}>
            <Input placeholder="Username" />
          </Form.Item>

          <Form.Item name="password" style={{ marginBottom: "10px" }}>
            <div className="passwordWrapper">
              <Input
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
                className="passwordInput"
              />
              <Button
                type="text"
                className="passwordToggleButton"
                onClick={() => setPasswordVisible((prevState) => !prevState)}
              >
                {passwordVisible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
              </Button>
            </div>
          </Form.Item>

          <Link to="/register" className="authNavigateButton">
            Don't have an account? Create one.
          </Link>

          <Button type="primary" htmlType="submit" className="submitButton">
            Login
          </Button>
        </Form>
      </div>
    </section>
  );
}

export default Login;

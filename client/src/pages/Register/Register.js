import React from "react";
import { Button, Form, Input, Space } from "antd";
import "./Register.css";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { registerUser } from "../../services/AuthServices";

function Register() {
  const [form] = Form.useForm();
  const handleRegistration = async (values) => {
    try {
      const data = await registerUser(JSON.stringify(values));
      console.log("Registration success:", data);
    } catch (err) {
      console.log(err.response?.data || "An error occurred.");
    }
  };
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  return (
    <section className="auth-page">
      <div className="auth-container">
        <h1 className="auth-heading">REGISTER</h1>
        <Form
          name="registerform"
          form={form}
          className="auth-form"
          onFinish={handleRegistration}
          autoComplete="off"
        >
          <Space direction="horizontal">
            <Form.Item name="firstName" style={{ marginBottom: "32px" }}>
              <Input placeholder="First Name" />
            </Form.Item>
            <Form.Item name="lastName" style={{ marginBottom: "32px" }}>
              <Input placeholder="Last Name" />
            </Form.Item>
          </Space>
          <Form.Item name="username" style={{ marginBottom: "32px" }}>
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item name="email" style={{ marginBottom: "32px" }}>
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item name="phoneNumber" style={{ marginBottom: "32px" }}>
            <Input placeholder="Phone Number" />
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

          <Link to="/login" className="auth-navigate-button">
            Already have an account? Login.
          </Link>

          <Form.Item className="auth-button-wrapper">
            <Button type="primary" htmlType="submit" className="auth-button">
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
}

export default Register;

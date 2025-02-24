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
    <section className="authPage">
      <div className="authContainer">
        <h1 className="authHeading">REGISTER</h1>
        <Form
          name="registerform"
          form={form}
          className="authForm"
          onFinish={handleRegistration}
          autoComplete="off"
        >
          <Space className="nameContainer" wrap>
            <Form.Item name="firstname" style={{ marginBottom: "32px" }}>
              <Input placeholder="First Name" className="input" />
            </Form.Item>
            <Form.Item name="lastname" style={{ marginBottom: "32px" }}>
              <Input placeholder="Last Name" className="input" />
            </Form.Item>
          </Space>
          <Form.Item name="username" style={{ marginBottom: "32px" }}>
            <Input placeholder="Username" className="input" />
          </Form.Item>
          <Form.Item name="email" style={{ marginBottom: "32px" }}>
            <Input placeholder="Email" className="input" />
          </Form.Item>
          <Form.Item name="phoneNumber" style={{ marginBottom: "32px" }}>
            <Input placeholder="Phone Number" className="input" />
          </Form.Item>

          <Form.Item name="password" style={{ marginBottom: "10px" }}>
            <div className="passwordWrapper">
              <Input
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
                className="password-input Input"
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

          <Link to="/login" className="authNavigateButton">
            Already have an account? Login.
          </Link>
          <Button type="primary" htmlType="submit" className="submitButton">
            Register
          </Button>
        </Form>
      </div>
    </section>
  );
}

export default Register;

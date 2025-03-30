import React from "react";
import { Button, Form, Input, Space } from "antd";
import "./Register.css";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { registerUser } from "../../services/AuthServices";
import { useAuth } from "../../context/AuthContext";

function Register() {
  const [form] = Form.useForm();
  const { error, setError } = useAuth();

  const handleRegistration = async (values) => {
    setError("");
    try {
      const data = await registerUser(JSON.stringify(values));
      console.log("Registration success:", data);
      form.resetFields();
    } catch (err) {
      console.log(err.response?.data || "An error occurred.");
      setError(err.response?.data.message);
    }
  };
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  return (
    <section className="authPage">
      <div className="authContainer">
        <h1 className="authHeading">REGISTER</h1>
        {error && (
          <div className="errorMessage">{error} is already registerd</div>
        )}
        <Form
          name="registerform"
          form={form}
          className="authForm"
          onFinish={handleRegistration}
          autoComplete="off"
        >
          <Space className="nameContainer" wrap>
            <Form.Item
              name="firstname"
              style={{ marginBottom: "32px" }}
              rules={[
                { required: true, message: "Please enter your first name" },
              ]}
            >
              <Input placeholder="First Name" className="input" />
            </Form.Item>
            <Form.Item
              name="lastname"
              style={{ marginBottom: "32px" }}
              rules={[
                { required: true, message: "Please enter your last name" },
              ]}
            >
              <Input placeholder="Last Name" className="input" />
            </Form.Item>
          </Space>
          <Form.Item
            name="username"
            style={{ marginBottom: "32px" }}
            rules={[{ required: true, message: "Please enter your username" }]}
          >
            <Input
              placeholder="Username"
              className={`input ${error === "username" ? "error" : ""}`}
            />
          </Form.Item>
          <Form.Item
            name="email"
            style={{ marginBottom: "32px" }}
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input
              placeholder="Email"
              className={`input ${error === "email" ? "error" : ""}`}
            />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            style={{ marginBottom: "32px" }}
            rules={[
              { required: true, message: "Please enter your phoneNumber" },
            ]}
          >
            <Input
              placeholder="Phone Number"
              className={`input ${error === "phone" ? "error" : ""}`}
            />
          </Form.Item>

          <Form.Item
            name="password"
            style={{ marginBottom: "10px" }}
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <div className="passwordWrapper">
              <Input
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
                className="password-input input"
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

          <Form.Item
            name="reenterPassword"
            style={{ marginBottom: "10px" }}
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please re-enter your password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The two passwords do not match!")
                  );
                },
              }),
            ]}
          >
            <div className="passwordWrapper">
              <Input
                type={passwordVisible ? "text" : "password"}
                placeholder="Re-enter Password"
                className="password-input input"
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

import React, { useEffect } from "react";
import { Button, Form, Input } from "antd";
import "./Login.css";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/AuthServices";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const { user, login, error, setError } = useAuth();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";
  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate]);

  const handleLogin = async (values) => {
    setError("");
    try {
      const data = await loginUser(JSON.stringify(values));
      console.log("Login success:");

      login(data.user, data.token);
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err.response?.data || "An error occurred.");
      setError(err.response.data.message);
    }
  };
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  return (
    <section className="authPage">
      <div className="authContainer">
        <h1 className="authHeading">LOGIN</h1>
        {error && <div className="errorMessage">{error}</div>}
        <Form
          name="authform"
          form={form}
          className="authForm"
          onFinish={handleLogin}
          autoComplete="off"
        >
          <Form.Item
            name="username"
            style={{ marginBottom: "32px" }}
            rules={[{ required: true, message: "Please enter your username" }]}
          >
            <Input
              placeholder="Username"
              className={`input ${error ? "error" : ""}`}
              rules={[
                { required: true, message: "Please enter your username" },
              ]}
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
                className={`password Input input ${error ? "error" : ""}`}
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

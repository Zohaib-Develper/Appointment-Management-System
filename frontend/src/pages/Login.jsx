import React, { useState } from "react";
import { Form, Input, Button, Card } from "antd";
import axios from "../axios";
import { Link, useNavigate } from "react-router-dom";
import { useFlash } from "../context/FlashContext";

const Login = () => {
  const navigate = useNavigate();
  const { showFlash } = useFlash();

  const onFinish = async (values) => {
    try {
      const res = await axios.post("/auth/login", values);
      showFlash("Logged in successfully", "success");
      navigate("/user/dashboard");
    } catch (err) {
      showFlash(
        err.response?.data?.message || "Login failed. Please try again.",
        "error"
      );
    }
  };

  return (
    <Card title="Login" style={{ width: 400, margin: "auto", marginTop: 100 }}>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item name="email" label="Email" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true }]}
        >
          <Input.Password />
        </Form.Item>
        <div className="py-2">
          Do not have an account? <Link to="/register">Create!</Link>
        </div>

        <Button type="primary" htmlType="submit" block>
          Login
        </Button>
      </Form>
    </Card>
  );
};

export default Login;

import React, { useEffect } from "react";
import { Form, Input, Button, Card, Select } from "antd";
import axios from "../axios";
import { Link, useNavigate } from "react-router-dom";
import { useFlash } from "../context/FlashContext";
import { useAuth } from "../context/AuthContext";

const { Option } = Select;

const Register = () => {
  const navigate = useNavigate();
  const { showFlash } = useFlash();
  const { authUser } = useAuth();

  useEffect(() => {
    if (authUser) navigate(`/${authUser.role}/dashboard`);
  }, []);

  const onFinish = async (values) => {
    try {
      await axios.post("/auth/register", values);
      showFlash("User Registered Successfully", "success");
      navigate("/login");
    } catch (err) {
      showFlash(
        err.response?.data?.message || "Registration failed. Please try again.",
        "error"
      );
    }
  };

  return (
    <div>
      <Card
        title="Register"
        style={{ width: 500, margin: "auto", marginTop: 100 }}
      >
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
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
          <div className="fw-bold">
            For testing purposes: Admin creation is allowed with simple login
            form
          </div>
          <Form.Item name="role" label="Role" rules={[{ required: true }]}>
            <Select placeholder="Select Role">
              <Option value="user">User</Option>
              <Option value="admin">Admin</Option>
            </Select>
          </Form.Item>
          <div className="py-2">
            Already Have an Account? <Link to="/login">Login</Link>
          </div>
          <Button type="primary" htmlType="submit" block>
            Register
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default Register;

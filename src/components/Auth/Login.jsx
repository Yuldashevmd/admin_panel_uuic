import { Button, Divider, Form, Input, notification } from "antd";
import "./style.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// components

import { api } from "src/utils/api";
import { ToastContainer } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // handleFinish
  const handleFinish = async (values) => {
    try {
      setLoading(true);
      const res = await api.post("/admin/login", values);
      res.data.status == 200 &&
        notification.success({
          message: "Success!",
          placement: "bottomRight",
          icon: null,
          duration: 2,
        }),
        sessionStorage.setItem("access_token", res.data.token);
      sessionStorage.setItem("user_role", res.data.role);
      navigate("/");
    } catch (err) {
      console.log(err, "err");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin">
      <div className="signin__box">
        <h1>Войти</h1>
        <Divider />

        <Form
          autoComplete="off"
          name="login"
          onFinish={handleFinish}
          id="loginForm"
          form={form}
          layout="vertical"
        >
          <Form.Item label="Имя пользователя" name="name">
            <Input
              disabled={loading}
              placeholder={"Имя пользователя"}
              width={"100%"}
              id="enterPhone"
            />
          </Form.Item>
          <Form.Item label="Пароль" name="password">
            <Input
              disabled={loading}
              type="password"
              placeholder={"Пароль"}
              width={"100%"}
              id="enterPassword"
            />
          </Form.Item>

          <div className="w-100 m-y-2">
            <Button
              block
              size="large"
              loading={loading}
              htmlType="submit"
              form="loginForm"
              type="primary"
            >
              Войти
            </Button>
          </div>
        </Form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;

import { Divider, Form } from "antd";
import "./style.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// components
import InputGen from "src/service/Generics/Input";
import ButtonGen from "src/service/Generics/Button";
import { useContext } from "react";
import { Context } from "src/service/context";

const Login = () => {
  const [setToken] = useContext(Context);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // handleFinish
  const handleFinish = (values) => {
    setLoading(true);
    sessionStorage.setItem("role", values.role);
    sessionStorage.setItem("access_token", values.role);
    setToken("access_token");
    navigate("/");
    setLoading(false);
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
          <Form.Item label="Telefon raqam" name="phone">
            <InputGen
              disabled={loading}
              placeholder={"Telefon raqam"}
              width={"100%"}
              id="enterPhone"
            />
          </Form.Item>
          <Form.Item label="Parol" name="password">
            <InputGen
              disabled={loading}
              type="password"
              placeholder={"Parol"}
              width={"100%"}
              id="enterPassword"
            />
          </Form.Item>

          <div className="w-100 m-y-2">
            <ButtonGen
              loading={loading}
              htmlType="submit"
              form="loginForm"
              type="primary"
            >
              Войти
            </ButtonGen>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;

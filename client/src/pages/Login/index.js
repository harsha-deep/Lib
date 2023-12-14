import React, { useEffect } from "react";
import { ConfigProvider, Form, message } from "antd";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../../apicalls/users";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import logger from "../../logger/logger";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const lowercaseEmail = values.email.toLowerCase();
      values.email = lowercaseEmail
      const response = await LoginUser(values);
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        localStorage.setItem("token", response.data);
        window.location.href = "/";
        // logger.info("User logged in Success: " + values.lowercaseEmail);
      } else {
        // logger.error("User loggin failed: " + values.lowercaseEmail + " " + response.message)
        message.error(response.message);

      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, []);

  return (
    <div className="h-screen bg-slate-700 flex items-center justify-center">
      <div className="bg-slate-300 p-10 rounded-lg">
        <h1 className="font-['Inter'] mb-4 text-4xl font-extrabold leading-none tracking-tight">
          Login
        </h1>

        <hr />
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]
            }
          >
            <input type="email" placeholder="Email" />
          </Form.Item>
          <Form.Item label="Password" name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <input type="password" placeholder="Password" />
          </Form.Item>

          <div className="text-center mt-2 flex flex-col gap-1">
            <Button title="Login" type="submit" />
            <Link to="/register" className="text-blue-600 text-sm font-bold">
              Dont have an account? Click Here To Register
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;

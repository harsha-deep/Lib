import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetLoggedInUserDetails } from "../apicalls/users";
import { HideLoading, ShowLoading } from "../redux/loadersSlice";
import { SetUser } from "../redux/usersSlice";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const validateUserToken = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetLoggedInUserDetails();
      dispatch(HideLoading());
      if (response.success) {
        dispatch(SetUser(response.data));

      } else {
        localStorage.removeItem("token");
        navigate("/login");
        message.error(response.message);
      }
    } catch (error) {
      localStorage.removeItem("token");
      navigate("/login");
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      validateUserToken();
    }
  }, []);

  return (
    <div>
      {user && (
        <div className="p-3">
          <div className="header pl-8 p-4 bg-slate-700 flex justify-between rounded items-center">
            <h1
              className="text-3xl text-white cursor-pointer"
              onClick={() => navigate("/")}
            >
              Library
            </h1>

            <div className="flex items-center gap-1 bg-white p-2 rounded">
              <i className="ri-shield-user-line"></i>
              <span
                className="text-lg underline cursor-pointer"
                onClick={() => navigate("/profile")}
              >
                {user.name}
              </span>
              <i
                className="ri-logout-box-r-line ml-3 cursor-pointer"
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/login");
                }}
              ></i>
            </div>
          </div>

          <div className="content mt-1">{children}</div>
        </div>
      )}
    </div>
  );

}

export default ProtectedRoute;

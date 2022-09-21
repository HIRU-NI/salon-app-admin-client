import { React } from "react";

import { useNavigate } from "react-router-dom";

//antd components
import { PageHeader, Button } from "antd";

import { useSelector, useDispatch } from "react-redux";

import { logout, reset } from "../features/auth/authSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispacth = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispacth(logout());
    dispacth(reset());
    navigate("/");
  };

  return (
    <PageHeader
      title="Salon Prauge Admin"
      extra={
        user
          ? [
              <Button key="3" onClick={onLogout}>
                Logout
              </Button>,
            ]
          : []
      }
      style={{ background: "#fff" }}
    />
  );
};

export default Navbar;

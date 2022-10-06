import {
  ClockCircleOutlined,
  UserOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  UsergroupAddOutlined,
  ProfileOutlined
} from "@ant-design/icons";
import React from "react";

import { useNavigate, useLocation } from "react-router-dom";

import { Menu } from "antd";

const navs = [
  {
    index: 1,
    name: "Dashboard",
    icon: <AppstoreOutlined />,
    path: "/",
  },
  {
    index: 2,
    name: "Clients",
    icon: <UserOutlined />,
    path: "/clients",
  },
  {
    index: 3,
    name: "Reservations",
    icon: <ClockCircleOutlined />,
    path: "/reservations",
  },
  {
    index: 4,
    name: "Calendar",
    icon: <CalendarOutlined />,
    path: "/calendar",
  },
  {
    index: 5,
    name: "Admins",
    icon: <UsergroupAddOutlined />,
    path: "/admin",
  },
  {
    index: 6,
    name: "My account",
    icon: <ProfileOutlined />,
    path: "/account",
  },
];

const Sidebar = ({ selectedNav }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Menu
      theme="light"
      mode="inline"
      selectedKeys={[location.pathname]}
      items={navs.map((nav) => ({
        key: nav.path,
        icon: nav.icon,
        label: nav.name,
        onClick: () => {
          navigate(nav.path);
          console.log(nav.path)
        },
      }))}
    />
  );
};

export default Sidebar;

import { ClockCircleOutlined, UserOutlined, CalendarOutlined, AppstoreOutlined } from '@ant-design/icons';
import  React from 'react';

import { useNavigate } from 'react-router-dom';

import {  Menu } from 'antd';

const navs = [
    {
        index: 1,
        name: 'Dashboard',
        icon: <AppstoreOutlined />,
        path:'/'
    },
    {
        index: 2,
        name: 'Clients',
        icon: <UserOutlined />,
        path:'/clients'
    },
    {
        index: 3,
        name: 'Reservations',
        icon: <ClockCircleOutlined />,
        path:'/reservations'
    },
    {
        index: 4,
        name: 'Calendar',
        icon: <CalendarOutlined />,
        path:'/calendar'
    }
]
  

  const Sidebar = ({ selectedNav }) => {

    const navigate = useNavigate()
  
    return (
        <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={[1]}
        items={navs.map(
          (nav) => ({
            key: String(nav.index + 1),
            icon: nav.icon,
            label: nav.name,
            onClick: () => {
              navigate(nav.path)
            }
          }),
        )}
      />
    );
  };
  
  export default Sidebar;
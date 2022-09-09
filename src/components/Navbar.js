import React from "react";
import { PageHeader, Button } from 'antd';

const Navbar = () => {
  return (
    <PageHeader
    title="Salon Prauge Admin"
    extra={[
        <Button key="2">Login</Button>,
        <Button key="1" type="primary">
          Signup
        </Button>,
      ]}
  />
  );
};

export default Navbar;

import React from "react";

//antd components
import { PageHeader, Button } from 'antd';

import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <PageHeader
    title="Salon Prauge Admin"
    extra={[
        (
        <Link to="/login">
            <Button key="2">Login</Button>
        </Link>)
        ,
        (<Link to="/signup">
            <Button key="1" type="primary">Signup</Button>
        </Link>)
      ]}
  />
  );
};

export default Navbar;

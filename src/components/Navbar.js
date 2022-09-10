import { React } from "react";

import { Link, useNavigate } from "react-router-dom";

//antd components
import { PageHeader, Button } from 'antd';

import { useSelector, useDispatch } from "react-redux";

import { logout, reset } from "../features/auth/authSlice";

const Navbar = () => {
    const navigate = useNavigate()
    const dispacth = useDispatch()

    const { user } = useSelector((state) => state.auth)

    const onLogout = () => {
        dispacth(logout())
        dispacth(reset())
        navigate('/')
    }

    return (
        <PageHeader
            title="Salon Prauge Admin"
            extra={user ? [
                (<Button key="3" onClick={onLogout}>Logout</Button>)
                
            ] : [
                (
                    <Link to="/login" key="login">
                        <Button key="2">Login</Button>
                    </Link>)
                    ,
                    (<Link to="/signup" key="signup">
                        <Button key="1" type="primary">Signup</Button>
                    </Link>)
            ]}
            style={{background:"#fff"}}
    />
    );
};

export default Navbar;

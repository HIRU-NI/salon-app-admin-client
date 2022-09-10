import {React, useEffect} from 'react'

//redux
import { useSelector, useDispatch } from 'react-redux';

//api functions 
import { login, reset } from '../../features/auth/authSlice';

//router
import { useNavigate } from 'react-router-dom';

//alerts
import { toast } from 'react-toastify';

//antd components
import { Button, Form, Input, message, Typography, Spin } from 'antd';

//styles
import "../../assests/styles/signup.css"

const {Title} = Typography

const Login = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isLoading, isError, isSuccess } = useSelector(
        (state) => state.auth
    ) 

    useEffect(() => {
      if(isError) {
        toast.error(message)
      }
      if(isSuccess || user) {
        navigate('/')
      }

      dispatch(reset())
    }, [user, isError, isSuccess, dispatch, navigate])
    

    const onFinish = (values) => {
        const userData = {
            email: values.email,
            password: values.password
        }
        dispatch(login(userData))
    };

    return (
        <Form
        className='signup_main'
        name="basic"
        labelCol={{
            span: 8,
        }}
        wrapperCol={{
            span: 16,
        }}
        initialValues={{
            remember: true,
        }}
        onFinish={onFinish}
        >
            <Title level={2} className="signup_titile">Signup</Title>
            <Form.Item
                label="Email"
                name="email"
                rules={[
                    {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                    },
                    {
                    required: true,
                    message: 'Please input your E-mail!',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
                rules={[
                {
                    required: true,
                    message: 'Please input your password!',
                },
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                wrapperCol={{
                offset: 8,
                span: 16,
                }}
            >
                <Spin spinning={isLoading}>
                    <Button type="primary" htmlType="submit">
                        Login
                    </Button>
                </Spin>
            </Form.Item>
        </Form>
    
  )
}

export default Login

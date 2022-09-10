import {React, useEffect} from 'react'

//redux
import { useSelector, useDispatch } from 'react-redux';

//api functions 
import { signup, reset } from '../../features/auth/authSlice';

//router
import { useNavigate } from 'react-router-dom';

//alerts
import { toast } from 'react-toastify';

//antd components
import { Button, Form, Input,  Typography, Spin } from 'antd';

//styles
import "../../assests/styles/signup.css"

const {Title} = Typography

const Signup = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    ) 

    useEffect(() => {
      if(isError) {
        if(message.email !== '') toast.error(message.email)
        if(message.password !== '') toast.error(message.password)
      }
      if(isSuccess || user) {
        navigate('/')
      }

      dispatch(reset())
    }, [user, isError, isSuccess, dispatch, navigate, message])
    

    const onFinish = (values) => {
        const userData = {
            email: values.email,
            firstName: values.first,
            lastName: values.last,
            password: values.password
        }
        
        dispatch(signup(userData))
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
            label="First Name"
            name="first"
            rules={[
            {
                required: true,
                message: 'Please input your first name!',
                
            },
            ]}
        >
            <Input />
        </Form.Item>
        <Form.Item
            label="Last Name"
            name="last"
            rules={[
            {
                required: true,
                message: 'Please input your last name!',
                
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
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
            {
                required: true,
                message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
                validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
            }),
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
                    Submit
                </Button>
            </Spin>
        </Form.Item>
        </Form>
    
  )
}

export default Signup

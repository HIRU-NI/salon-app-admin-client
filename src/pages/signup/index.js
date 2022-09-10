import {React} from 'react'

//antd components
import { Button, Form, Input, Typography } from 'antd';

//styles
import "../../assests/styles/signup.css"

const {Title} = Typography

const Signup = () => {

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
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
            <Button type="primary" htmlType="submit">
            Submit
            </Button>
        </Form.Item>
        </Form>
    
  )
}

export default Signup

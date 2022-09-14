//antd components
import { Button, Modal, Form, Input } from 'antd';

import React, { useState } from 'react';

//redux
import { useDispatch } from 'react-redux';

//api functions 
import {  createClient } from '../../../features/clients/clientSlice';

const CreateClient = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm();

  const dispatch = useDispatch()

  const onFinish = (values) => {
    dispatch(createClient({
      email: values.email,
      firstName: values.firstname,
      lastName: values.lastname,
      phone: values.phone
    }))
    setIsModalOpen(false);
    form.resetFields()
    
  }

  const showModal = () => {
    setIsModalOpen(true);
    form.resetFields()
  };

  const handleOk = () => {
    form.submit()
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields()
  };

  return (
    <div style={{marginBottom: "20px"}}>
      <Button type="primary" onClick={showModal}>
        Add New Client
      </Button>
      <Modal title="Add New Client" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form
            onFinish={onFinish}
            form={form}
            name="create-client"
            labelCol={{
                span: 6,
            }}
            wrapperCol={{
                span: 16,
            }}
            initialValues={{
                remember: true,
            }}
            //   onFinish={onFinish}
            //   onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
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
                name="firstname"
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
                name="lastname"
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
                label="Phone"
                name="phone"
                rules={[
                {
                    required: true,
                    message: 'Please input your phone!',
                },
                {
                    max: 10,
                    message: "invalid phone number!"
                },
                {
                    min: 10,
                    message: "invalid phone number!"
                }
                ]}
            >
                <Input maxLength={10}/>
            </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CreateClient;
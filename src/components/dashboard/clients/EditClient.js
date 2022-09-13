//antd components
import { Button, Modal, Form, Input } from 'antd';

import React, { useState } from 'react';

//redux
import { useSelector, useDispatch } from 'react-redux';

//api functions 
import {  createClient } from '../../../features/clients/clientSlice';

//alerts
import { toast } from 'react-toastify';

const EditClient = ( {client} ) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm();

  const dispatch = useDispatch()

  const {  isSuccess } = useSelector(
    (state) => state.client
) 

  const onFinish = (values) => {
    dispatch(createClient({
      email: values.email,
      firstName: values.firstname,
      lastName: values.lastname,
      phone: values.phone
    }))
    if(isSuccess) {
      setIsModalOpen(false);
      form.resetFields()
      toast.success("User added successfully")
    }
    
  }

  const showModal = () => {
    console.log(client)
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
    <div>
      <Button type="dashed" onClick={showModal}>
        Edit
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
                <Input defaultValue={client.email}/>
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
                <Input defaultValue={client.firstName}/>
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
                <Input defaultValue={client.lastName}/>
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
                <Input maxLength={10} defaultValue={client.phone}/>
            </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EditClient;
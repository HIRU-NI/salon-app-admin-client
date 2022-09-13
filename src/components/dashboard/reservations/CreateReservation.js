//antd components
import { Button, Modal, Form, Input } from 'antd';

import React, { useState, useEffect } from 'react';

//redux
import { useSelector, useDispatch } from 'react-redux';

//api functions 
import { reset, createClient } from '../../../features/clients/clientSlice';

//alerts
import { toast } from 'react-toastify';

const CreateReservation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm();

  const dispatch = useDispatch()

  const { user,  isError, isSuccess, message } = useSelector(
    (state) => state.auth
) 
useEffect(() => {
    if(isError) {
      if(message.email !== '') toast.error(message.error)
      if(message.password !== '') toast.error(message.error)
    }
    if(isSuccess || user) {
      //navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, dispatch, message])

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
        Add New Reservation
      </Button>
      <Modal title="Add New Reservation" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
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

export default CreateReservation;
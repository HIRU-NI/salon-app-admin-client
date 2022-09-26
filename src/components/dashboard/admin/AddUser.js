//antd components
import { Button, Modal, Form, Input } from "antd";

import React, { useState } from "react";

//redux
import { useDispatch } from "react-redux";
import { addUser, updateUser } from "../../../features/admins/adminSlice";

const AddUser = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm();

  const dispatch = useDispatch();

  let initialValues;

  if (user) {
    initialValues = {
      email: user.email,
      firstname: user.firstName,
      lastname: user.lastName,
    };
  }

  const onFinish = (values) => {
    if (user) {
      dispatch(
        updateUser({
          id: user.id,
          user: {
            email: values.email,
            firstName: values.firstname,
            lastName: values.lastname,
          },
        })
      );
    } else {
      dispatch(
        addUser({
          email: values.email,
          firstName: values.firstname,
          lastName: values.lastname,
        })
      );
    }
    setIsModalOpen(false);
  };

  const showModal = () => {
    if (!user) form.resetFields();
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <Button type={user ? "dashed" : "primary"} onClick={showModal}>
        {user ? "Edit" : "Add New User"}
      </Button>
      <Modal
        title={user ? "Update User" : "Add New User"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          onFinish={onFinish}
          validateTrigger="onBlur"
          form={form}
          name="add-user"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={initialValues}
          //   onFinish={onFinish}
          //   onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
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
                message: "Please input your first name!",
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
                message: "Please input your last name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddUser;

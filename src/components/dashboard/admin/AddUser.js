//antd components
import { Button, Modal, Form, Input } from "antd";

import React, { useState } from "react";

//redux
import { useDispatch } from "react-redux";
import {
  addUser,
  resetPassword,
} from "../../../features/admins/adminSlice";
import { updateUser } from "../../../features/auth/authSlice";

const AddUser = ({ user, isReset }) => {
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
    if (isReset) {
      dispatch(
        resetPassword({
          id: user.id,
          password: values.password,
        })
      );
    } else if (user) {
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
    if (!user || isReset) form.resetFields();
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
      <Button type={!user || isReset? "primary" : "dashed"} onClick={showModal}>
        {isReset ? "Reset Password" : user ? "Edit" : "Add New User"}
      </Button>
      <Modal
        title={isReset ? "Reset Password" : user ? "Edit" : "Add New User"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          autoCorrect="off"
          onFinish={onFinish}
          validateTrigger={isReset ? "onChange" : "onBlur"}
          form={form}
          name="add-user"
          labelCol={{
            span: isReset ? 8 : 6,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={initialValues}
          autoComplete="off"
        >
          {!isReset ? (
            <>
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
            </>
          ) : (
            <>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The two passwords that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
            </>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default AddUser;

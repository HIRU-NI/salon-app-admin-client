import { React, useEffect } from "react";

//redux
import { useSelector, useDispatch } from "react-redux";

//api functions
import { reset, updateUser } from "../../features/auth/authSlice";

//router
import { useNavigate } from "react-router-dom";

//alerts
import { toast } from "react-toastify";

//antd components
import { Button, Form, Input, Spin } from "antd";

//styles
import "../../assests/styles/signup.css";

const Account = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const [form] = Form.useForm();
  let initialValues;
  if (user)
    initialValues = {
      email: user.email,
      firstname: user.firstName,
      lastname: user.lastName,
    };
  useEffect(() => {
    if (isError) toast.error(message);
    if (!user) navigate("/login");

    return () => {
      dispatch(reset());
    };
  }, [user, isError, isSuccess, dispatch, navigate, message]);

  const onFinish = (values) => {
    const userData = {
      id: user.id,
      user: {
        email: values.email,
        firstName: values.firstname,
        lastName: values.lastname,
      },
    };
    dispatch(updateUser(userData));
  };

  return (
    <Form
      form={form}
      className="signup_main"
      name="basic"
      validateTrigger="onBlur"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={initialValues}
      onFinish={onFinish}
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

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Spin spinning={isLoading}>
          <Button type="primary" htmlType="submit">
            Save Changes
          </Button>
        </Spin>
      </Form.Item>
    </Form>
  );
};

export default Account;

//antd components
import { Table, Space } from "antd";

import { React, useEffect } from "react";

import { useNavigate } from "react-router-dom";

//app components
import AddUser from "../../components/dashboard/admin/AddUser";

//redux
import { useSelector, useDispatch } from "react-redux";

import { getAllAdmins, reset } from "../../features/admins/adminSlice";
import { toast } from "react-toastify";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <div>{text}</div>,
    sorter: (a, b) => a.name.localeCompare(b.name)
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <AddUser user={record}/>
        <AddUser user={record} isReset />
      </Space>
    ),
  },
];

const Admins = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isError:isUserError ,  message: userMessage  } = useSelector((state) => state.auth);
  const { admins, isError, message } = useSelector((state) => state.admin);

  const getAdminData = () => {
    const adminData = admins.map((admin, index) => {
      return {
        key: index,
        name: `${admin.firstName} ${admin.lastName}`,
        email: admin.email,
        phone: admin.phone,
        id: admin._id,
        firstName: admin.firstName,
        lastName: admin.lastName
      };
    });

    return adminData;
  };

  useEffect(() => {
    if (isError) toast.error(message.error);
    if (isUserError) toast.error(userMessage.error);
    if (!user) navigate("/login");

    dispatch(getAllAdmins());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch, isError, message, isUserError, userMessage]);

  return (
    <>
      <AddUser />
      <Table columns={columns} dataSource={getAdminData()} />
    </>
  );
};

export default Admins;

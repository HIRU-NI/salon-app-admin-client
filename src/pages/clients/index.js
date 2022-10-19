//antd components
import { Space, Table, Input } from "antd";

//app components
import CreateClient from "../../components/dashboard/clients/CreateClient";
import DeleteClient from "../../components/dashboard/clients/DeleteClient";
import EditClient from "../../components/dashboard/clients/EditClient";

import { React, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

//redux
import { useSelector, useDispatch } from "react-redux";
import { getPage, reset } from "../../features/clients/clientSlice";
import { toast } from "react-toastify";

//search box
const { Search } = Input;

const DEFAULT_SORT = "createdAt"

const Clients = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState("");

  const { user } = useSelector((state) => state.auth);
  const { currentPageClients, isError, message, count } = useSelector(
    (state) => state.client
  );

  const [currentPage, setcurrentPage] = useState(0);
  const [sortby, setsortBy] = useState(DEFAULT_SORT);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <div>{text}</div>,
      sorter: (_, __) => {
        if (sortby !== "firstName") setsortBy("firstName");
        else setsortBy(DEFAULT_SORT)
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <EditClient
            client={currentPageClients.find(
              (client) => client._id === record.id
            )}
          />
          <DeleteClient clientID={record.id} />
        </Space>
      ),
    },
  ];

  const onSearch = (value) => {
    setSearchValue(value);
  };

  const onPageChange = (page, _) => {
    setcurrentPage(page - 1);
  };

  const getClientData = () => {
    let clientData = currentPageClients.map((client, index) => {
      return {
        key: index,
        name: `${client.firstName} ${client.lastName}`,
        email: client.email,
        phone: client.phone,
        id: client._id,
      };
    });

    if (searchValue !== "") {
      clientData = clientData.filter(
        (client) =>
          client.email.includes(searchValue) ||
          client.name.includes(searchValue)
      );
    }

    return clientData;
  };

  useEffect(() => {
    if (isError) toast.error(message);
    if (!user) navigate("/login");

    dispatch(getPage({ page: currentPage, sortby }));

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch, isError, message, currentPage, count, sortby]);

  return (
    <>
      <CreateClient />
      <Search
        allowClear
        style={{ marginBottom: "20px" }}
        placeholder="Search by name or email"
        onSearch={onSearch}
      />
      <Table
        columns={columns}
        dataSource={getClientData()}
        pagination={{
          current: currentPage + 1,
          onChange: onPageChange,
          total: count,
        }}
      />
    </>
  );
};

export default Clients;

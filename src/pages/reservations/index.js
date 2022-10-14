//antd components
import { Space, Table, Input, Tag } from "antd";

//app components
import CreateReservation from "../../components/dashboard/reservations/CreateReservation";
import DeleteReservation from "../../components/dashboard/reservations/DeleteReservation";

import { React, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

//redux
import { useSelector, useDispatch } from "react-redux";

import {
  getAllClients,
  reset as resetClients,
} from "../../features/clients/clientSlice";
import {
  getAllStylists,
  reset as resetStylists,
} from "../../features/stylists/stylistSlice";
import {
  getAllServices,
  reset as resetServices,
} from "../../features/services/serviceSlice";
import {
  getPage,
  resetPage,
} from "../../features/reservations/reservationSlice";
import { toast } from "react-toastify";
import moment from "moment";

//search box
const { Search } = Input;

const columns = [
  {
    title: "Client",
    dataIndex: "client",
    key: "client_name",
    responsive: ["md"],
    render: (text) => <div>{text}</div>,
    sorter: (a, b) => a.client.localeCompare(b.client),
  },
  {
    title: "Service",
    dataIndex: "service",
    key: "service_name",
  },
  {
    title: "Stylist",
    dataIndex: "stylist",
    key: "stylist_name",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    render: (value) => {
      return moment(value).format("DD/MM/YYYY");
    },
    sorter: (a, b) =>
      moment(a.date).startOf("day").unix() -
      moment(b.date).startOf("day").unix(),
  },
  {
    title: "Time",
    dataIndex: "date",
    key: "date",
    render: (value) => {
      return moment(value).format("h:mm A");
    },
  },
  {
    title: "Status",
    dataIndex: "isComplete",
    key: "isComplete",
    render: (value) => {
      return (
        <Tag color={value ? "green" : "cyan"}>
          {value ? "Completed" : "Scheduled"}
        </Tag>
      );
    },
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <CreateReservation reservation={record} />
        <DeleteReservation reservationID={record.id} />
      </Space>
    ),
  },
];

const Reservations = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState("");

  const { user } = useSelector((state) => state.auth);
  const { clients } = useSelector((state) => state.client);
  const { services } = useSelector((state) => state.service);
  const { stylists } = useSelector((state) => state.stylist);
  const { currentPageReservations, count, isError, message } = useSelector(
    (state) => state.reservation
  );

  const [currentPage, setcurrentPage] = useState(0);

  const onSearch = (value) => {
    setSearchValue(value);
  };

  const onPageChange = (page, _) => {
    setcurrentPage(page - 1);
  };

  useEffect(() => {
    if (isError) toast.error(message);
    if (!user) navigate("/login");

    dispatch(getAllClients());
    dispatch(getAllStylists());
    dispatch(getAllServices());
    dispatch(getPage(currentPage));
    return () => {
      dispatch(resetPage());
      dispatch(resetClients());
      dispatch(resetStylists());
      dispatch(resetServices());
    };
  }, [user, navigate, isError, message, dispatch, count, currentPage]);

  const getreservationData = () => {
    let reservationData = currentPageReservations.map((reservation, index) => {
      let client;
      let service;
      let stylist;

      client =
        clients.find((client) => client._id === reservation.client) || "";
      service =
        services.find((service) => service._id === reservation.service) || "";
      stylist =
        stylists.find((stylist) => stylist._id === reservation.stylist) || "";
      return {
        key: index,
        client: `${client.firstName} ${client.lastName}`,
        client_id: client._id,
        service: service.name,
        service_id: service._id,
        stylist: stylist.name,
        stylist_id: stylist._id,
        date: reservation.date,
        id: reservation._id,
        isComplete: reservation.isComplete,
      };
    });

    if (searchValue !== "") {
      reservationData = reservationData.filter(
        (reservation) =>
          reservation.client.includes(searchValue) ||
          reservation.stylist.includes(searchValue) ||
          reservation.service.includes(searchValue)
      );
    }

    return JSON.parse(JSON.stringify(reservationData));
  };
  return (
    <>
      <CreateReservation />
      <Search
        allowClear
        style={{ marginBottom: "20px" }}
        placeholder="Search by client, stylist or service"
        onSearch={onSearch}
      />
      <Table
        columns={columns}
        dataSource={getreservationData()}
        pagination={{
          total: count,
          onChange: onPageChange,
          current: currentPage,
        }}
      />
    </>
  );
};

export default Reservations;

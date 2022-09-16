import { React, useEffect } from "react";

import { useNavigate } from "react-router-dom";

//redux
import { useSelector, useDispatch } from "react-redux";

import { Col, Row, Card } from "antd";

import { Pie, Bar } from "@ant-design/plots";
import {
  getAllReservations,
  reset,
} from "../../features/reservations/reservationSlice";
import { toast } from "react-toastify";

const getPieChartConfiguration = (reservations) => {
  const pieChartData = [
    {
      type: "Scheduled",
      value: reservations.filter(
        (reservation) => reservation.isComplete === false
      ).length,
    },
    {
      type: "Completed",
      value: reservations.filter(
        (reservation) => reservation.isComplete === true
      ).length,
    },
  ];

  const configPie = {
    appendPadding: 10,
    data: pieChartData,
    angleField: "value",
    colorField: "type",
    radius: 0.9,
    label: {
      type: "inner",
      offset: "-30%",
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: "center",
      },
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
  };

  return configPie;
};
const dataBar = [
  {
    stylist: "stylist 1",
    value: 1,
  },
  {
    stylist: "stylist 2",
    value: 4,
  },
  {
    stylist: "stylist 3",
    value: 5,
  },
  {
    stylist: "stylist 4",
    value: 2,
  },
  {
    stylist: "stylist 5",
    value: 8,
  },
];

const configBar = {
  data: dataBar,
  xField: "value",
  yField: "stylist",
  seriesField: "stylist",
  legend: {
    position: "top-left",
  },
};

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { reservations, isError, message } = useSelector(
    (state) => state.reservation
  );

  useEffect(() => {
    if (isError) toast.error(message);
    if (!user) navigate("/login");

    if (user) dispatch(getAllReservations());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch, isError, message]);

  return (
    <div>
      <Row gutter={16}>
        <Col span={12}>
          <Card title="Reservation Status">
            <Pie {...getPieChartConfiguration(reservations)} />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Stylist Allocations">
            <Bar {...configBar} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home;

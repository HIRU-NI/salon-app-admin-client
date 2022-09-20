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
import moment from "moment";
import { getAllStylists } from "../../features/stylists/stylistSlice";

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

const getBarChartConfiguration = (reservations, stylists) => {
  let stylistsToday = reservations.filter(
    (res) => moment(res.date).isSame(moment(), "days")
  )

  stylistsToday = stylistsToday.map(res => res.stylist)
  
  const barChartData = stylistsToday.map((stylist) => {
    const currentStylist = stylists.find((stlst) => stlst._id === stylist);
    const reservationsToday = reservations.filter(
      (res) =>
        moment(res.date).isSame(moment(), "days") && res.stylist === stylist
    );
    return {
      stylist: currentStylist ? currentStylist.name : "",
      value: reservationsToday.length,
    };
  });

  const configBar = {
    data: barChartData,
    xField: "value",
    yField: "stylist",
    seriesField: "stylist",
    legend: {
      position: "top-left",
    },
    meta: {
      value: {
        values: [0,8]
      }
    }
  };

  return configBar;
};

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { stylists } = useSelector((state) => state.stylist);
  const { reservations, isError, message } = useSelector(
    (state) => state.reservation
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (!user) navigate("/login");

    if (user) {
      dispatch(getAllReservations())
      dispatch(getAllStylists())
    }

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
            <Bar {...getBarChartConfiguration(reservations, stylists)} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home;

import { React, useEffect } from "react";

import { useNavigate } from "react-router-dom";

//redux
import { useSelector, useDispatch } from "react-redux";

import { Col, Row, Card, Table } from "antd";

import { Pie } from "@ant-design/plots";
import {
  getAllReservations,
  reset,
} from "../../features/reservations/reservationSlice";
import { toast } from "react-toastify";
import { getAllStylists } from "../../features/stylists/stylistSlice";
import {
  getCurrentWeekAllocations,
  getStatusSummary,
} from "../../features/summary/summarySlice";

const getPieChartConfiguration = (status) => {
  const pieChartData = [
    {
      type: "Scheduled",
      value: status.scheduled,
    },
    {
      type: "Completed",
      value: status.completed,
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
// const barChartData = stylistsThisWeek.map((stylist) => {
//   //   const currentStylist = stylists.find((stlst) => stlst._id === stylist);
//   //   const reservationsThisWeek = reservations.filter(
//   //     (res) =>
//   //       moment(res.date).isSame(moment(), "week") && res.stylist === stylist
//   //   );
//   //   return {
//   //     day:
//   //     stylist: currentStylist ? currentStylist.name : "",
//   //     value: reservationsThisWeek.length,
//   //   };
//   // });

//   var startOfWeek = moment().startOf("week");
//   var endOfWeek = moment().endOf("week");

//   var daysOfWeek = [];
//   var day = startOfWeek;

//   while (day <= endOfWeek) {
//     daysOfWeek.push(day.toDate());
//     day = day.clone().add(1, "d");
//   }

//   let barChartData = [];

//   stylists.forEach((stylist) => {
//     daysOfWeek.forEach((day) => {
//       barChartData.push({
//         stylist: stylist.name,
//         day: moment(day).format("dddd"),
//         count: reservations.filter(
//           (res) =>
//             moment(res.date).isSame(day, "date") && stylist._id === res.stylist
//         ).length,
//       });
//     });
//   });

//   const configBar = {
//     data: barChartData,
//     isGroup: true,
//     xField: "day",
//     yField: "count",
//     seriesField: "stylist",
//     color: ["#1ca9e6", "#f88c24"],
//     label: {
//       position: "middle",

//       layout: [
//         {
//           type: "interval-adjust-position",
//         },
//         {
//           type: "interval-hide-overlap",
//         },
//         {
//           type: "adjust-color",
//         },
//       ],
//     },
//   };

//   return configBar;
// };

const columns = [
  {
    title: "Stylist",
    dataIndex: "stylist",
    key: "stylist",
  },
  {
    title: "Sunday",
    dataIndex: "sunday",
    key: "sunday",
  },
  {
    title: "Monday",
    dataIndex: "monday",
    key: "monday",
  },
  {
    title: "Tuesday",
    dataIndex: "tuesday",
    key: "tuesday",
  },
  {
    title: "Wednesday",
    dataIndex: "wednesday",
    key: "wednesday",
  },
  {
    title: "Thursday",
    dataIndex: "thursday",
    key: "thursday",
  },
  {
    title: "Friday",
    dataIndex: "friday",
    key: "friday",
  },
  {
    title: "Saturday",
    dataIndex: "saturday",
    key: "saturday",
  },
];

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { allocations, status, isError, message } = useSelector(
    (state) => state.summary
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (!user) navigate("/login");

    if (user) {
      dispatch(getCurrentWeekAllocations());
      dispatch(getStatusSummary());
      dispatch(getAllReservations());
      dispatch(getAllStylists());
    }

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch, isError, message]);

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card title="Reservation Status">
            <Pie {...getPieChartConfiguration(status)} />
          </Card>
        </Col>
        <Col span={24}>
          <Card title="Stylist Allocations">
            {/* <Column {...getBarChartConfiguration(reservations, stylists)} /> */}
            <Table columns={columns} dataSource={allocations} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home;

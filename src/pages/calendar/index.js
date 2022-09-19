import { Badge, Calendar, Card } from "antd";
import { React, useEffect } from "react";

import { useNavigate } from "react-router-dom";

//redux
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  getAllReservations,
  reset,
} from "../../features/reservations/reservationSlice";
import moment from "moment";
import { getAllServices, reset as resetServices } from "../../features/services/serviceSlice";

const getListData = (value, reservations, services) => {
  let listData;

  listData = reservations.map((reservation) => {
    const service = services.find(
      (service) => service._id === reservation.service
    );
    if (moment(reservation.date).isSame(value, "day") && service) {
      return {
        content:  service.name,
        type: reservation.isComplete ? "green" : "cyan",
      };
    }
    return null
  });
  return listData || [];
};

const ReservationsCalendar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { services } = useSelector((state) => state.service);
  const { reservations, isError, message } = useSelector(
    (state) => state.reservation
  );

  useEffect(() => {
    if (isError) toast.error(message);
    if (!user) navigate("/login");

    dispatch(getAllReservations());
    dispatch(getAllServices())

    return () => {
      dispatch(reset());
      dispatch(resetServices())
    };
  }, [user, navigate, isError, message, dispatch]);

  const dateCellRender = (value) => {
    const listData = getListData(value, reservations, services);
    
    return (
      <>
        {listData.map((item) => (
          item ? <Badge key={item.content} color={item.type} text={item.content} /> : <></>
        ))}
      </>
    );
  };


  return (
    <Card>
      <Calendar dateCellRender={dateCellRender} />
    </Card>
  );
};

export default ReservationsCalendar;

import { Badge, Calendar, Card, Popover } from "antd";
import { React, useEffect } from "react";

import { useNavigate } from "react-router-dom";

//redux
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  getAllReservations,
  reset,
  updateReservation,
} from "../../features/reservations/reservationSlice";
import moment from "moment";
import {
  getAllServices,
  reset as resetServices,
} from "../../features/services/serviceSlice";
import {
  getAllClients,
  reset as resetClients,
} from "../../features/clients/clientSlice";

//drag n drop
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

//styles
import "../../assests/styles/calendar.css";

const getListData = (value, reservations, services, clients) => {
  let listData;

  listData = reservations.map((reservation) => {
    const service = services.find(
      (service) => service._id === reservation.service
    );
    if (moment(reservation.date).isSame(value, "day") && service) {
      return {
        content: service.name,
        type: reservation.isComplete ? "green" : "cyan",
        id: reservation._id,
        date: moment(reservation.date).format("DD/MM/YY, hh:mm A"),
        client: reservation.client,
      };
    }
    return null;
  });
  return listData || [];
};

const ReservationsCalendar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { clients } = useSelector((state) => state.client);
  const { services } = useSelector((state) => state.service);
  const { reservations, isError, message } = useSelector(
    (state) => state.reservation
  );

  useEffect(() => {
    if (isError) toast.error(message);
    if (!user) navigate("/login");

    dispatch(getAllReservations());
    dispatch(getAllServices());
    dispatch(getAllClients());

    return () => {
      dispatch(reset());
      dispatch(resetServices());
      dispatch(resetClients());
    };
  }, [user, navigate, isError, message, dispatch]);

  const dateCellRender = (value) => {
    const listData = getListData(value, reservations, services, clients);
    return (
      <Droppable
        droppableId={value.toString()}
        key={value.toString()}
        index={value.toString()}
      >
        {(provided, snapshot) => {
          return (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              key={value.toString()}
              className={`droppable-main ${
                snapshot.isDraggingOver ? "is-dragging-over" : ""
              }`}
              style={{ height: "100%" }}
            >
              {/* <div>Hello</div> */}
              {listData
                .filter((data) => data != null)
                .map((item, index) => {
                  return (
                    <Draggable
                      draggableId={item.id}
                      index={index + 1}
                      key={item.id}
                    >
                      {(provided, snapshot) => {
                        let content = <></>;
                        const client = clients.find(
                          (client) => client._id === item.client
                        );

                        content = (
                          <>
                            <p>
                              {client
                                ? client.firstName + " " + client.lastName
                                : ""}
                            </p>
                            <p>{item.date}</p>
                          </>
                        );
                        return (
                          <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <Popover
                              content={content}
                              title="Reservation Details"
                            >
                              <Badge
                                key={index}
                                color={item.type}
                                text={
                                  <span
                                    style={{
                                      color: snapshot.isDragging
                                        ? "#ffffff"
                                        : "",
                                    }}
                                  >
                                    {item.content}
                                  </span>
                                }
                                className={
                                  snapshot.isDragging ? "is-dragging" : ""
                                }
                              />
                            </Popover>
                          </div>
                        );
                      }}
                    </Draggable>
                  );
                })}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    );
  };

  const onDragStart = (result) => {};

  const onDragUpdate = () => {};

  const onDragEnd = (result) => {
    const { destination, draggableId, source } = result;

    const reservation = reservations.find(
      (reservation) => reservation._id === draggableId
    );

    if (!destination) return;

    if (destination.droppableId === source.droppableId) {
      return;
    }

    if (moment(destination.droppableId) < moment()) {
      toast.warning("Cannot move to previous dates");
      return;
    }

    const thisDate = moment(destination.droppableId)
    
    if (
      reservations.find(
        (res) =>
        moment(res.date).isSame(moment(reservation.date).set({D:thisDate.date()}), 'minutes') &&
        res.stylist === reservation.stylist && res._id !== reservation._id
      )
    ) {
      toast.error("Stylist is occupied in the given timeslot");
      return;
    }

    dispatch(
      updateReservation({
        id: reservation._id,
        reservation: {
          client: reservation.client,
          service: reservation.service,
          stylist: reservation.stylist,
          date: moment(destination.droppableId).set({
            h: moment(reservation.date).hour(),
            m: moment(reservation.date).minute(),
          }),
          isComplete: reservation.isComplete,
        },
      })
    );
  };

  return (
    <Card>
      <DragDropContext
        onDragStart={onDragStart}
        onDragUpdate={onDragUpdate}
        onDragEnd={onDragEnd}
      >
        <Calendar dateCellRender={dateCellRender} />
      </DragDropContext>
    </Card>
  );
};

export default ReservationsCalendar;

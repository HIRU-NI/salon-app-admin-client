import { Badge, Calendar, Card } from "antd";
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

//drag n drop
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const getListData = (value, reservations, services) => {
  let listData;

  listData = reservations.map((reservation) => {
    const service = services.find(
      (service) => service._id === reservation.service
    );
    if (moment(reservation.date).isSame(value, "day") && service) {
      return {
        content: service.name,
        type: reservation.isComplete ? "green" : "cyan",
        id: reservation._id
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
  const { services } = useSelector((state) => state.service);
  const { reservations, isError, message } = useSelector(
    (state) => state.reservation
  );

  useEffect(() => {
    if (isError) toast.error(message);
    if (!user) navigate("/login");

    dispatch(getAllReservations());
    dispatch(getAllServices());

    return () => {
      dispatch(reset());
      dispatch(resetServices());
    };
  }, [user, navigate, isError, message, dispatch]);

  const dateCellRender = (value) => {
    const listData = getListData(value, reservations, services);

    return (
      <Droppable droppableId={value.toString()} key={value.toString()} index={value.toString()}>
        {(provided) => {
          let index = 0;
          return (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              key={value.toString()}
            >
              {listData.filter(data => data != null).map((item) => {
                if (item) {
                 
                  index++;
                  return (
                    <Draggable
                      draggableId={item.id}
                      index={index+1}
                      key={item.id}
                    >
                      {(provided) => {
                        return (
                          <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <Badge
                              key={index}
                              color={item.type}
                              text={item.content}
                            />
                          </div>
                        );
                      }}
                    </Draggable>
                  );
                }
                return (<></>)
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
    const { destination, draggableId, source} = result

    const reservation = reservations.find(reservation => reservation._id === draggableId)

    console.log(destination)

    if (
      destination.droppableId === source.droppableId 
    ) {
      return;
    }
    

    dispatch(updateReservation({
      id: reservation._id,
      reservation: {
        client: reservation.client,
        service: reservation.service,
        stylist: reservation.stylist,
        date: moment(destination.droppableId),
        isComplete: reservation.isComplete,
      },
    }))
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

//antd components
import { Button, Modal, Form, Select, DatePicker } from "antd";

import React, { useState } from "react";

//redux
import { useSelector, useDispatch } from "react-redux";

//api functions
import {
  createReservation,
  updateReservation,
} from "../../../features/reservations/reservationSlice";

import moment from "moment";
import { toast } from "react-toastify";

const { Option } = Select;

const getDisabledHours = (hours) => {
  let disabledHours = hours.filter((hour) => {
    if (hour < 8 || hour > 17) return hour;
    return null;
  });

  disabledHours.push(0);

  return disabledHours || [];
};

//disable dates before today
const disabledDate = (current) => {
  return current && current <= moment().endOf("day");
};

//disable non-working hours
const disabledTime = (now) => ({
  disabledHours: () => getDisabledHours([...Array(24).keys()]),
});

const CreateReservation = ({ reservation }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const { stylists } = useSelector((state) => state.stylist);
  const { services } = useSelector((state) => state.service);
  const { clients } = useSelector((state) => state.client);
  const { reservations } = useSelector((state) => state.reservation);

  const initialValues = reservation
    ? {
        client: reservation.client_id,
        stylist: reservation.stylist_id,
        service: reservation.service_id,
        date: moment(reservation.date),
        isComplete: reservation.isComplete ? "completed" : "scheduled",
      }
    : {};

  const onFinish = async (values) => {
    if (!reservation) {
      dispatch(
        createReservation({
          client: values.client,
          service: values.service,
          stylist: values.stylist,
          date: values.date,
        })
      );
      form.resetFields();
    } else {
      dispatch(
        updateReservation({
          id: reservation.id,
          reservation: {
            client: values.client,
            service: values.service,
            stylist: values.stylist,
            date: values.date,
            isComplete: values.isComplete === "completed" ? true : false,
          },
        })
      );
    }

    setIsModalOpen(false);
    //form.resetFields()
  };

  const showModal = () => {
    setIsModalOpen(true);
    //form.resetFields()
  };

  //chek availablility of the stylist on selected time/date
  const checkAvailablility = (date, stylist) => {
    let availabilityMessage;
    let existingReservations;
    if (reservation)
      existingReservations = reservations.filter(
        (res) =>
          moment(res.date).isSame(date, "minutes") &&
          res.stylist === stylist &&
          reservation.id !== res._id
      );
    else
      existingReservations = reservations.filter(
        (res) =>
          moment(res.date).isSame(date, "minutes") && res.stylist === stylist
      );

    //checks whether the time slot is available for the given stylist
    if (existingReservations.length > 0)
      availabilityMessage =
        "The selected stylist is not available during the given time slot";

    //checks whether the stylist is available on given date
    if (
      reservations.filter(
        (res) =>
          res.stylist === stylist && moment(res.date).diff(date, "days") === 0
      ).length >= 8
    ) {
      //creating a new reservation
      if (!reservation)
        availabilityMessage =
          "The selected stylist is not available on the given date";
      //updating an existing reservation
      else if (moment(reservation.date).diff(date, "days") !== 0)
        availabilityMessage =
          "The selected stylist is not available on the given date";
    }

    return availabilityMessage;
  };

  const handleOk = () => {
    const availabilityMessage = checkAvailablility(
      moment(form.getFieldValue("date")),
      form.getFieldValue("stylist")
    );
    if (!availabilityMessage) {
      form.submit();
    } else {
      toast.error(availabilityMessage);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  return (
    <div style={{ marginBottom: !reservation ? "20px" : "" }}>
      <Button type={reservation ? "dashed" : "primary"} onClick={showModal}>
        {reservation ? "Edit" : "Add New Reservation"}
      </Button>
      <Modal
        title={"Add New Reservation"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          initialValues={reservation ? initialValues : null}
          validateTrigger="onBlur"
          onFinish={onFinish}
          form={form}
          name="create-client"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 16,
          }}
          autoComplete="off"
        >
          <Form.Item
            label="Service"
            name="service"
            rules={[
              {
                required: true,
                message: "Please select a service!",
              },
            ]}
          >
            <Select
              showSearch
              placeholder="Select a service"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
            >
              {services.map((service) => {
                return (
                  <Option value={service._id} key={service._id}>
                    {service.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            label="Client"
            name="client"
            rules={[
              {
                required: true,
                message: "Please select a client!",
              },
            ]}
          >
            <Select
              showSearch
              placeholder="Select a client"
              optionFilterProp="children"
            >
              {clients.map((client) => {
                return (
                  <Option value={client._id} key={client._id}>
                    {client.firstName} {client.lastName}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            label="Stylist"
            name="stylist"
            rules={[
              {
                required: true,
                message: "Please select a stylist!",
              },
            ]}
          >
            <Select
              showSearch
              placeholder="Select a stylist"
              optionFilterProp="children"
            >
              {stylists.map((stylist) => {
                return (
                  <Option value={stylist._id} key={stylist._id}>
                    {stylist.name}
                  </Option>
                );
              })}
            </Select>
            {/* {availabilityMessage ? <Tag color="volcano" style={{marginTop: "10px"}}>{availabilityMessage}</Tag> : <></>} */}
          </Form.Item>
          <Form.Item
            label="Date & Time"
            name="date"
            rules={[
              {
                required: true,
                message: "Please select a date and time!",
              },
            ]}
          >
            <DatePicker
              showTime={{
                defaultValue: moment("08", "HH"),
                format: "HH",
                hideDisabledOptions: true,
              }}
              format="YYYY-MM-DD HH:mm"
              disabledDate={disabledDate}
              disabledTime={disabledTime}
              showNow={false}
            />
          </Form.Item>
          {reservation ? (
            <Form.Item label="Status" name="isComplete">
              <Select
                placeholder="Update status"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().includes(input.toLowerCase())
                }
              >
                <Option value="completed" key="completed">
                  Completed
                </Option>
                <Option value="scheduled" key="scheduled">
                  Scheduled
                </Option>
              </Select>
            </Form.Item>
          ) : (
            <></>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default CreateReservation;

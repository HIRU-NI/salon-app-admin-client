//antd components
import { Button, Modal, Form, Select, DatePicker  } from 'antd';

import React, { useState } from 'react';

//redux
import { useSelector, useDispatch } from 'react-redux';

//api functions 
import {  createReservation, updateReservation } from '../../../features/reservations/reservationSlice';

import moment from 'moment';


const { Option } = Select;

const CreateReservation = ({reservation}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm();

  const dispatch = useDispatch()

  const { stylists } = useSelector(state => state.stylist)
  const { services } = useSelector(state => state.service)
  const { clients} = useSelector(state => state.client)


    const initialValues = reservation ? {
      client : reservation.client_id,
      stylist: reservation.stylist_id,
      service: reservation.service_id,
      date: moment(reservation.date)
    } : {}


  const onFinish = async (values) => {
    if(!reservation) {
      dispatch(createReservation({
        client: values.client,
        service: values.service,
        stylist: values.stylist,
        date: values.date
      }))
    }
    else {
      dispatch(updateReservation({
        id: reservation.id,
        reservation: {
          client: values.client,
          service: values.service,
          stylist: values.stylist,
          date: values.date
        }
      }))
    }

    setIsModalOpen(false);
    form.resetFields()
  }

  const showModal = () => {
    setIsModalOpen(true);
    form.resetFields()
  };

  const handleOk = () => {
    form.submit()
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields()
  };

  return (
    <div style={{marginBottom: !reservation? "20px": ""}}>
      <Button type={reservation? "dashed" : "primary"} onClick={showModal}>
        {reservation ? "Edit" : "Add New Reservation"}
      </Button>
      <Modal title="Add New Reservation" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form
            initialValues={reservation ? initialValues : null}
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
                    message: 'Please select a service!',
                    },
                ]}
            >
              <Select
                showSearch
                placeholder="Select a service"
                optionFilterProp="children"
                  
                filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
              >
                {services.map(service => {
                  return (
                    <Option value={service._id} key={service._id}>{service.name}</Option>
                  )
                })}
              </Select>
            </Form.Item>
            <Form.Item
                label="Client"
                name="client"
                rules={[
                    {
                    required: true,
                    message: 'Please select a client!',
                    },
                ]}
            >
              <Select
                showSearch
                placeholder="Select a client"
                optionFilterProp="children"
                  
                filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
              >
                {clients.map(client => {
                  return (
                    <Option value={client._id} key={client._id}>{client.firstName} {client.lastName}</Option>
                  )
                })}
              </Select>
            </Form.Item>
            <Form.Item
                label="Stylist"
                name="stylist"
                rules={[
                    {
                    required: true,
                    message: 'Please select a stylist!',
                    },
                ]}
            >
              <Select
                showSearch
                placeholder="Select a stylist"
                optionFilterProp="children"
                  
                filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
              >
                {stylists.map(stylist => {
                  return (
                    <Option value={stylist._id} key={stylist._id}>{stylist.name}</Option>
                  )
                })}
              </Select>
            </Form.Item>
            <Form.Item
                label="Date & Time"
                name="date"
                rules={[
                {
                    required: true,
                    message: 'Please select a date and time!',
                },
                ]}
            >
                <DatePicker showTime />
            </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CreateReservation;
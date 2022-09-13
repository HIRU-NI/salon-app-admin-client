//antd components
import { Space, Table, Button } from 'antd';

//app components
import CreateReservation from '../../components/dashboard/reservations/CreateReservation';
import DeleteClient from '../../components/dashboard/clients/DeleteClient';


import {React, useEffect} from 'react';

import { useNavigate } from 'react-router-dom';

//redux
import { useSelector, useDispatch } from 'react-redux';

import { getAllClients } from '../../features/clients/clientSlice';
import { getAllStylists } from '../../features/stylists/stylistSlice';
import { getAllServices } from '../../features/services/serviceSlice';
import { getAllReservations } from '../../features/reservations/reservationSlice';

const columns = [
  {
    title: 'Client',
    dataIndex: 'client',
    key: 'client_name',
    render: (text) => <div>{text}</div>,
  },
  {
    title: 'Service',
    dataIndex: 'service',
    key: 'service_name',
  },
  {
    title: 'Stylist',
    dataIndex: 'stylist',
    key: 'stylist_name',
  },
  {
    title: 'Date & time',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Button type="dashed">Edit</Button>
        <DeleteClient />
      </Space>
    ),
  },
];

const Reservations = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector( state => state.auth)
  const { clients, isError,  message } = useSelector(state => state.client)
  const { services } = useSelector(state => state.service)
  const { stylists } = useSelector(state => state.stylist)
  const { reservations } = useSelector(state => state.reservation)

  

  const getreservationData = () => {
    
    const reservationData = reservations.map((reservation, index) => {
      const client = clients.filter(client => client._id === reservation.client)
      const service = services.filter(service => service._id === reservation.service)
      const stylist = stylists.filter(stylist => stylist._id === reservation.stylist)
      return {
        key: index,
        client: `${client[0].firstName} ${client[0].lastName}`,
        service: service[0].name,
        stylist: stylist[0].name,
        date: reservation.date,
        id: reservation._id 
      }
    })

    return reservationData
  }

  useEffect(() => {
    if(isError) console.log(message)
    if(!user) navigate('/login')

    dispatch(getAllClients())
    dispatch(getAllStylists())
    dispatch(getAllServices())
    dispatch(getAllReservations())

  }, [user, navigate, dispatch, isError, message])

  return (
    <>
      <CreateReservation/>
      <Table columns={columns} dataSource={getreservationData()} />
    </>
  )
}

export default Reservations;
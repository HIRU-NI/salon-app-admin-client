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

const columns = [
  {
    title: 'Client',
    dataIndex: 'name',
    key: 'client_name',
    render: (text) => <div>{text}</div>,
  },
  {
    title: 'Service',
    dataIndex: 'name',
    key: 'service_name',
  },
  {
    title: 'Stylist',
    dataIndex: 'phone',
    key: 'stylist_name',
  },
  {
    title: 'Date & time',
    dataIndex: 'phone',
    key: 'phone',
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

  const getClientData = () => {
    const clientData = clients.map((client, index) => {
      return {
        key: index,
        name: `${client.firstName} ${client.lastName}`,
        email: client.email,
        phone: client.phone,
        id: client._id 
      }
    })

    return clientData
  }

  useEffect(() => {
    if(isError) console.log(message)
    if(!user) navigate('/login')

    dispatch(getAllClients())
  }, [user, navigate, dispatch, isError, message])

  return (
    <>
      <CreateReservation />
      <Table columns={columns} dataSource={getClientData()} />
    </>
  )
}

export default Reservations;
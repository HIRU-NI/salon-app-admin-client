//antd components
import { Space, Table } from 'antd';

//app components
import CreateClient from '../../components/dashboard/clients/CreateClient';
import DeleteClient from '../../components/dashboard/clients/DeleteClient';
import EditClient from '../../components/dashboard/clients/EditClient';


import {React, useEffect} from 'react';

import { useNavigate } from 'react-router-dom';

//redux
import { useSelector, useDispatch } from 'react-redux';

import { getAllClients, reset } from '../../features/clients/clientSlice';


const Clients = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector( state => state.auth)
  const { clients, isError,  message } = useSelector(state => state.client)

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <div>{text}</div>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <EditClient client={clients.find(client => client._id === record.id)}/>
          <DeleteClient clientID={record.id}/>
        </Space>
      ),
    },
  ];
  

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

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, dispatch, isError, message])

  return (
    <>
      <CreateClient />
      <Table columns={columns} dataSource={getClientData()} />
    </>
  )
}

export default Clients;
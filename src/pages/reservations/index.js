//antd components
import { Space, Table } from 'antd';

//app components
import CreateReservation from '../../components/dashboard/reservations/CreateReservation';
import DeleteReservation from '../../components/dashboard/reservations/DeleteReservation';


import {React, useEffect} from 'react';

import { useNavigate } from 'react-router-dom';

//redux
import { useSelector, useDispatch } from 'react-redux';

import { getAllClients, reset as resetClients } from '../../features/clients/clientSlice';
import { getAllStylists, reset as resetStylists } from '../../features/stylists/stylistSlice';
import { getAllServices, reset as resetServices } from '../../features/services/serviceSlice';
import { getAllReservations, reset as resetReservations } from '../../features/reservations/reservationSlice';
import { toast } from 'react-toastify';

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
        <CreateReservation reservation={record}/>
        <DeleteReservation reservationID={record.id}/>
      </Space>
    ),
  },
];

const Reservations = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const { user } = useSelector( state => state.auth)
  const { clients} = useSelector(state => state.client)
  const { services } = useSelector(state => state.service)
  const { stylists } = useSelector(state => state.stylist)
  const { reservations , isError,  message } = useSelector(state => state.reservation)

  

  useEffect(() => {
    if(isError) toast.error(message)
    if(!user) navigate('/login')
    
    dispatch(getAllClients())
    dispatch(getAllStylists())
    dispatch(getAllServices())
    dispatch(getAllReservations())

    console.log("here")

    return () => {
      dispatch(resetReservations())
      dispatch(resetClients())
      dispatch(resetStylists())
      dispatch(resetServices())
    }

   

  }, [user, navigate, isError, message, dispatch])

  const getreservationData =  () => {
    
    const reservationData = reservations.map( (reservation, index) => {

      
      let client
      let service
      let stylist 

       client =  clients.find(client => client._id === reservation.client) || ''
       service =  services.find(service => service._id === reservation.service) || ''
       stylist =  stylists.find(stylist => stylist._id === reservation.stylist) || ''
      return {
        key: index,
        client: `${client.firstName} ${client.lastName}`,
        service: service.name,
        stylist: stylist.name,
        date: reservation.date,
        id: reservation._id 
      }
    })
    
    return JSON.parse(JSON.stringify(reservationData))
  }
  return (
    <>
      <CreateReservation/>
      <Table columns={columns} dataSource={getreservationData()}  />
    </>
  )
}

export default Reservations;
//antd components
import { Space, Table, Button } from 'antd';

//app components
// import CreateClient from '../../components/dashboard/clients/CreateClient';
import DeleteClient from '../../components/dashboard/clients/DeleteClient';


import {React, useEffect} from 'react';

import { useNavigate } from 'react-router-dom';

//redux
import { useSelector, useDispatch } from 'react-redux';

import { getAllAdmins, reset } from '../../features/admins/adminSlice';

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
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Button type="dashed">Edit</Button>
        <DeleteClient clientID={record.id}/>
      </Space>
    ),
  },
];

const Admins = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector( state => state.auth)
  const { admins, isError,  message } = useSelector(state => state.admin)

  const getAdminData = () => {
    const adminData = admins.map((admin, index) => {
      return {
        key: index,
        name: `${admin.firstName} ${admin.lastName}`,
        email: admin.email,
        phone: admin.phone,
        id: admin._id 
      }
    })

    return adminData
  }

  useEffect(() => {
    if(isError) console.log(message)
    if(!user) navigate('/login')

    dispatch(getAllAdmins())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, dispatch, isError, message])

  return (
    <>
      {/* <CreateClient /> */}
      <Table columns={columns} dataSource={getAdminData()} />
    </>
  )
}

export default Admins;
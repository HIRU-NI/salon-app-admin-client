//antd components
import { Button, Modal } from 'antd';

import React, { useState, useEffect } from 'react';

//redux
import { useSelector, useDispatch } from 'react-redux';

//api functions 
import { reset, deleteClient } from '../../../features/clients/clientSlice';

//alerts
import { toast } from 'react-toastify';

//icons
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal


const DeleteClient = ({clientID}) => {
  const dispatch = useDispatch()

  const { user,  isError, isSuccess, message } = useSelector(
    (state) => state.auth
    ) 

    const showDeleteConfirm = () => {
        confirm({
            title: 'Are you sure delete this client?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
      
            onOk() {
            dispatch(deleteClient(clientID))
            toast.success("User deleted successfully")

          },
      
          onCancel() {
            console.log('Cancel');
          },
        });
      };
    useEffect(() => {
    if(isError) {
      if(message.email !== '') toast.error(message.error)
      if(message.password !== '') toast.error(message.error)
    }
    if(isSuccess || user) {
      //navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, dispatch, message])

  return (
    <div>
      <Button onClick={showDeleteConfirm} type="dashed">
      Delete
    </Button>
    </div>
  );
};

export default DeleteClient;
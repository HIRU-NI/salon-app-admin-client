//antd components
import { Button, Modal } from 'antd';

import React from 'react';

//redux
import { useSelector, useDispatch } from 'react-redux';

//api functions 
import {  deleteClient, getAllClients } from '../../../features/clients/clientSlice';

//alerts
import { toast } from 'react-toastify';

//icons
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal


const DeleteClient = ({clientID}) => {
  const dispatch = useDispatch()

  const {  isSuccess } = useSelector(
    (state) => state.client
    ) 

    const showDeleteConfirm = () => {
        confirm({
            title: 'Are you sure delete this client?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
      
            onOk() {
            console.log(clientID)
            dispatch(deleteClient(clientID))
            if(isSuccess) {
              toast.success("User deleted successfully")
              dispatch(getAllClients())
            }

          },
      
          onCancel() {
            console.log('Cancel');
          },
        });
      };

  return (
    <div>
      <Button onClick={showDeleteConfirm} type="dashed">
      Delete
    </Button>
    </div>
  );
};

export default DeleteClient;
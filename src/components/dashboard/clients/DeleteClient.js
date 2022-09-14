//antd components
import { Button, Modal } from 'antd';

import React from 'react';

//redux
import {  useDispatch } from 'react-redux';

//api functions 
import {  deleteClient } from '../../../features/clients/clientSlice';

//icons
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal


const DeleteClient = ({clientID}) => {
  const dispatch = useDispatch()


    const showDeleteConfirm = () => {
        confirm({
            title: 'Are you sure delete this client?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
      
            async onOk() {
            console.log(clientID)
            dispatch(deleteClient(clientID))
      

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
//antd components
import { Button, Modal } from 'antd';

import {React } from 'react';

//redux
import {  useDispatch } from 'react-redux';

//api functions 
import {  deleteReservation } from '../../../features/reservations/reservationSlice';

//alerts
import { toast } from 'react-toastify';

//icons
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal


const DeleteClient = ({reservationID}) => {
    const dispatch = useDispatch()

    const showDeleteConfirm = () => {
        confirm({
            title: 'Are you sure delete this reservation?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
      
            onOk() {
                dispatch(deleteReservation(reservationID))
                toast.success("Reservation deleted successfully")
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
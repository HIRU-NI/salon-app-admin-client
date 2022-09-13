//antd components
import { Button, Modal } from 'antd';

import {React } from 'react';

//redux
import {  useDispatch, useSelector } from 'react-redux';

//api functions 
import {  deleteReservation, reset } from '../../../features/reservations/reservationSlice';

//alerts
import { toast } from 'react-toastify';

//icons
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal


const DeleteClient = ({reservationID}) => {
    const dispatch = useDispatch()

    const { isSuccess } = useSelector(state => state.reservation)

    const showDeleteConfirm = () => {
        confirm({
            title: 'Are you sure delete this reservation?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
      
            onOk() {
                const resp = dispatch(deleteReservation(reservationID))
                console.log(resp)
                if(isSuccess) {
                    toast.success("User deleted successfully")
                    dispatch(reset())
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
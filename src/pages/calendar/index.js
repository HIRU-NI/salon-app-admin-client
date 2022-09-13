import { Badge, Calendar } from 'antd';
import React from 'react';

const getListData = (value) => {
  let listData;

  switch (value.date()) {
    case 8:
      listData = [
        {
          type: 'warning',
          content: 'Hairstyle',
        },
        {
          type: 'success',
          content: 'Hairstyle',
        },
      ];
      break;

    case 10:
      listData = [
        {
          type: 'warning',
          content: 'Hairstyle',
        },
        {
          type: 'success',
          content: 'Hairstyle',
        },
        {
          type: 'error',
          content: 'Hairstyle',
        },
      ];
      break;

    case 15:
      listData = [
        {
          type: 'warning',
          content: 'Haircut',
        },
        {
          type: 'success',
          content: 'Haircut',
        },
        {
          type: 'error',
          content: 'Haircut',
        },
        {
          type: 'error',
          content: 'Haircut',
        },
        {
          type: 'error',
          content: 'Haircut',
        },
        {
          type: 'error',
          content: 'Haircut',
        },
      ];
      break;

    default:
  }

  return listData || [];
};

const getMonthData = (value) => {
  if (value.month() === 8) {
    return 1394;
  }
};

const ReservationsCalendar = () => {
  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <>
        {listData.map((item) => (
          
            <Badge key={item.content} status={item.type} text={item.content} />
         
        ))}
      </>
    );
  };

  return <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} />;
};

export default ReservationsCalendar;
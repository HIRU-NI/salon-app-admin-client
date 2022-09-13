import { React, useEffect} from 'react';

import { useNavigate } from 'react-router-dom';

//redux
import { useSelector } from 'react-redux';

import { Col, Row, Card } from 'antd';

import { Pie, Bar } from '@ant-design/plots';

const dataPie = [
    {
      type: 'Completed',
      value: 80,
    },
    {
      type: 'Pending',
      value: 20,
    },
  ];
  const dataBar = [
    {
        stylist: 'stylist 1',
        value: 1,
    },
    {
        stylist: 'stylist 2',
        value: 4,
    },
    {
        stylist: 'stylist 3',
        value: 5,
    },
    {
        stylist: 'stylist 4',
        value: 2,
    },
    {
        stylist: 'stylist 5',
        value: 8,
    },
  ];

  const configPie = {
    appendPadding: 10,
    data: dataPie,
    angleField: 'value',
    colorField: 'type',
    radius: 0.9,
    label: {
      type: 'inner',
      offset: '-30%',
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: 'center',
      },
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
  };
  const configBar = {
    data: dataBar,
    xField: 'value',
    yField: 'stylist',
    seriesField: 'stylist',
    legend: {
      position: 'top-left',
    },
  };

const Home = () => {

    const navigate = useNavigate()

    const { user } = useSelector( state => state.auth)

    useEffect(() => {
      if(!user) navigate('/login')
    }, [user, navigate])
    
    
    return (
        <div>
            <Row gutter={16}>
                <Col span={12}>
                    <Card
                       
                        title="Reservation Status"
                    >
                        <Pie {...configPie}/>
                    </Card>  
                </Col>
                <Col span={12}>
                    <Card
                       
                       title="Stylist Allocations"
                    >
                        <Bar {...configBar}/>
                   </Card>  
                   
                </Col>
    </Row>
            
        </div>
    )
}

export default Home;
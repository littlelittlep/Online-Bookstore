import React from 'react';
import { Button, Space, Card, Row, Col, Avatar, } from 'antd';
import { IeSquareFilled } from '@ant-design/icons';
import Orderlist from '../components/OrderLists.jsx'
const App = () => (
    // 外层购物车卡片
    <Card title="已完成订单" style={{ background: "#D6D6D8", }}>
        <Orderlist />
    </Card>
);
export default App;
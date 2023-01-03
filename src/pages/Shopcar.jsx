import React from 'react';
import { Button, Space, Card, Row, Col, Avatar, } from 'antd';
import { IeSquareFilled } from '@ant-design/icons';
import ShopcarList from '../components/ShopcarList.jsx'
const App = () => (
    // 外层购物车卡片
    <Card title="购物车" style={{ background: "#D6D6D8", }}>
        <ShopcarList />
    </Card>
);
export default App;
import React, { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, Row,Space,Col,Card,Menu, Avatar, List, message,Divider} 
from 'antd';
import VirtualList from 'rc-virtual-list';
const fakeDataUrl =
  'https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo';
const ContainerHeight = 400;
const { Meta } = Card;
const style = {
    background: '#fff',
    padding: '7px 0',
    textAlign:'center'
  };
const gridStyle= {
    width: '50%',
    textAlign: 'center',
    height:20,
    verticalAlign:'middle'
};
const items = [
    {
        label: '所有书籍',
    },
    {
        label: '分类书籍',
    },
    {
        label: '个人中心',
    },
];
const App = () => {
    const [data, setData] = useState([]);
    const appendData = () => {
        fetch(fakeDataUrl)
          .then((res) => res.json())
          .then((body) => {
            setData(data.concat(body.results));
            message.success(`${body.results.length} more items loaded!`);
          });
      };
      useEffect(() => {
        appendData();
      }, []);
      const onScroll = (e) => {
        if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === ContainerHeight) {
          appendData();
        }
      };
      return(
       <Row >
        <Col flex={500}>
            <div style={{
                height: 250}}>
                <h4 fontWeifht="bold">用户信息</h4>
            </div>
            <div style={{
                height: 300}}>
                <h4 fontWeifht="bold">物流详情</h4>
                <List style={{
                height: 300}}>
                <VirtualList
                    data={data}
                    height={250}
                    itemHeight={47}
                    itemKey="email"
                    onScroll={onScroll}
                >
                    {(item) => (
                    <List.Item key={item.email} >
                        <List.Item.Meta
                        avatar={<Avatar shape="square" size={64} src={item.picture.large} />}
                        title={<a href="https://ant.design">{item.name.last}</a>}
                        description={item.email}
                        />
                        <Button>确认收货</Button>
                    </List.Item>
                    )}
                </VirtualList>
                </List>
            </div>
        </Col>
        <Col  flex={1} style={{marginTop:30}}>
            <Row style={{height:15}}></Row>
                <Row>
                    <Card
                        hoverable="true"
                        style={{
                        height:350,
                        width: 280,
                        marginLeft:20
                        }}
                        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"  />}
                    >
                    </Card>
            </Row>
            <div style={{width:280,marginLeft:20}}>
            <Card >
                <Card.Grid style={gridStyle}>我的发票</Card.Grid>
                <Card.Grid style={gridStyle}>我的积分</Card.Grid>
                <Card.Grid style={gridStyle}>我的足迹</Card.Grid>
                <Card.Grid style={gridStyle}>我的收藏</Card.Grid>
                <Card.Grid style={gridStyle}>买过店铺</Card.Grid>
                <Card.Grid style={gridStyle}>收藏店铺</Card.Grid>
                {/* <Card.Grid style={gridStyle}>退款维权</Card.Grid>
                <Card.Grid style={gridStyle}>退款维权</Card.Grid> */}
            </Card>
            </div>
        </Col>
    </Row>
    );
}

export default App;
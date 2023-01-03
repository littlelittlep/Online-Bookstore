import React, { useEffect, useState } from 'react';
import { Button, Row, Space, Col, Card, Descriptions, Table, Popover, message, Input } from 'antd';
import { UserInfoApi, UpdateUserInfoApi, MyAddressApi, DeleteAddrApi, AddAddrApi } from '../request/api';
import Qs from 'qs'

const fakeDataUrl =
  'https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo';
const ContainerHeight = 400;
const { Meta } = Card;

export default function App() {
  // 点击新增地址弹出popover输入新地址
  const [popoverOpen, setpopoverOpen] = useState(false);
  const handleOpenChange = (newOpen) => {
    setpopoverOpen(newOpen);
  };
  const [newAddr, setnewAddr] = useState("")
  const popoverContent = (
    <div>
      <Input placeholder="请输入新增地址" onChange={(e) => setnewAddr(e.target.value)} />
      <br /><br />
      <Space size={30}>
        <Button onClick={() => setpopoverOpen(false)}>取消</Button>
        <Button type="primary" onClick={() => {
          AddAddrApi(Qs.stringify({
            MemberID: localStorage.getItem("username"),
            Address: newAddr
          })).then(res => {
            if (res === 1) {
              message.success("添加地址成功！2s后页面将自动更新！");
              setTimeout(() => {
                window.location.reload();
              }, 2000);
            } else {
              message.error("添加失败");
            }

          })
        }}>确认</Button>
      </Space>
    </div>
  );
  //地址相关
  const [addr, setaddr] = useState([])
  const columns = [
    {
      title: '收货人',
      dataIndex: 'MemberID',
      key: 'MemberID',
    },
    {
      title: '收货地址',
      dataIndex: 'Address',
      key: 'Address',
    },
    {
      title: '是否为默认地址',
      key: 'isDefault',
      align: 'center',
      dataIndex: 'isDefault',
    },
    {
      // title: <Button type="primary" style={{ fontWeight: "bolder" }} onClick={}>新增地址</Button>,
      title: <Popover content={popoverContent} trigger="click" open={popoverOpen} onOpenChange={handleOpenChange}>
        <Button type="primary">新增地址</Button>
      </Popover>,
      key: 'action',
      align: 'center',
      render: (item) => (
        <Space size="middle">
          <Button type="link">设为默认</Button>
          <Button type="link" onClick={() => {
            DeleteAddrApi(Qs.stringify({
              MemberID: localStorage.getItem("username"),
              Address: item["Address"]
            })).then(res => {
              message.success("删除地址成功！2s后页面将自动更新！");
              setTimeout(() => {
                window.location.reload();
              }, 2000);
            })
          }}>删除地址</Button>
        </Space>
      ),
    },
  ];
  //余额
  const [money, setmoney] = useState(0)
  const charge = () => {
    UpdateUserInfoApi(Qs.stringify({
      MemberID: localStorage.getItem("username"),
      addBalance: 100
    })).then(res => {
      message.success("充值100元成功！2s后页面将自动更新！");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    })
  }
  const [flag, setflag] = useState(true)

  useEffect(() => {
    if (flag) {
      setflag(false);
      UserInfoApi(Qs.stringify({
        MemberID: localStorage.getItem("username"),
      })).then(res => {
        setmoney(res);
      })
      MyAddressApi(Qs.stringify({
        MemberID: localStorage.getItem("username"),
      })).then(res => {
        setaddr(res);
      })
    }
  })
  return (
    <Row style={{ marginLeft: 100 }}>
      <Col>
        <Card>
          <div style={{
            height: 250, width: 800
          }}>
            <Descriptions title="用户信息" layout="horizontal">
              <Descriptions.Item label="用户名">有钱人</Descriptions.Item>
              <Descriptions.Item label="联系方式">159763XXXXX</Descriptions.Item>
              <Descriptions.Item label="默认地址">江苏省南京市梅园快递中心</Descriptions.Item>
              <Descriptions.Item label="余额">{money}</Descriptions.Item>
            </Descriptions>
            <Button onClick={charge}>余额充值</Button>
          </div>
        </Card>
      </Col>
      <Col>
        {/* <Row style={{ marginTop: 10 }}></Row> */}
        <Row>
          <Card
            hoverable="true"
            style={{
              height: 300,
              width: 200,
              marginLeft: 20,
              marginRight: 0
            }}
            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
          >
          </Card>
        </Row>
      </Col>
      <Row>
        {/* <Card style={{marginTop:20,height: 250,width:980}}> */}
        <Table columns={columns} dataSource={addr} scroll={{ y: 200, }} style={{ marginTop: 20, height: 250, width: 1070 }} />
        {/* </Card> */}
      </Row>
    </Row>
  );
}
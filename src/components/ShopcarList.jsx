import React, { useEffect, useState } from 'react';
import { Button, Card, Row, Col, Avatar, InputNumber, Form, Modal, Space, Select, message } from 'antd';
import { OneBookApi, GetCartsApi, PurchaseApi, MyAddressApi, RemoveFromCartApi } from '../request/api';
import Qs from 'qs'

export default function App() {
    // 涉及弹出bookinfo对话框逻辑start
    const [open, setOpen] = useState(false);
    const [singleBookInfo, setsingleBookInfo] = useState([])
    const showInfo = (BookID) => {
        //获取单本书的详细数据
        OneBookApi(Qs.stringify({
            BookID: BookID
        })).then(res => {
            setsingleBookInfo(res[0])
        })
        //显示弹出框
        setOpen(true);
    };
    const handleOk = () => {
        setOpen(false);
    };
    const handleCancel = () => {
        setOpen(false);
    };
    // 涉及弹出bookinfo对话框逻辑end
    //地址相关
    const [addr, setaddr] = useState("")
    const [selectedItems, setSelectedItems] = useState([]);
    const handleChange = (value) => {
        setSelectedItems(value);
    };
    //支付
    const clickOrder = (OrderID, BookID, OrderNote) => {
        if (selectedItems == "") message.warning("请选择收货地址！")
        PurchaseApi(Qs.stringify({
            OrderID: OrderID,
            BookID: BookID,
            OrderNote: OrderNote,
            Address: selectedItems,
            MemberID: localStorage.getItem("username")
        })).then(res => {
            if (res === 0) message.warning("库存不够，请联系管理员进货")
            else if (res === 1) message.error("余额不足，请及时进行账户充值")
            else if (res === 2) {
                message.success("支付成功！2s后页面将自动更新！");
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            }
        })
    }
    //移除购物车
    const removeCart = (OrderID) => {
        RemoveFromCartApi(Qs.stringify({
            OrderID: OrderID
        })).then(res => {
            message.success("移除购物车成功！2s后页面将自动更新！");
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        })
    }

    //涉及我的购物车数据获取
    const [flag, setflag] = useState(true)
    const [cartData, setcartData] = useState([])
    useEffect(() => {
        if (flag) {
            setflag(false);
            //调用后端获取图书的接口
            GetCartsApi(Qs.stringify({
                MemberID: localStorage.getItem("username")
            })).then(res => {
                setcartData(res);
            })
            MyAddressApi(Qs.stringify({
                MemberID: localStorage.getItem("username")
            })).then(res => {
                let tmp = [];
                res.forEach(function (item) {
                    tmp.push({ value: item["Address"], label: item["Address"] })
                })
                setaddr(tmp);
            })
        }
    })

    return (
        <>
            <Space direction="vertical" wrap>
                {cartData.map((item, index) => (
                    <>
                        <Card key={item.OrderID} hoverable="true" style={{ marginBottom: 20, width: 1200 }}>
                            <Row style={{ height: 100, backgroundColor: "" }}>
                                {/* 商品图片 */}
                                <Col flex={1}>
                                    <Avatar shape="square" size={100}
                                        alt="example"
                                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                        style={{ marginRight: 5 }} />
                                </Col>
                                {/* 中间名字以及三个图标 */}
                                <Col >
                                    <div style={{ marginLeft: 10, marginTop: -10 }}>
                                        <p style={{ fontFamily: "微软雅黑", fontWeight: "bold" }}>{item.BookName}</p>
                                        <p>{item.BookAuthor}</p>
                                        {/* <p>{item.OrderTime}</p> */}
                                    </div>
                                    <div style={{ height: 10 }}>
                                        <Button type="link" onClick={() => showInfo(item.BookID)}>详情</Button>
                                    </div>
                                </Col>
                                {/* 购买时间 */}
                                <Col flex={300}>
                                    <div style={{ paddingLeft: 100, marginTop: -8 }}>
                                        <p>购买时间：{item.OrderTime}</p>
                                        <p>ISBN：{item.BookID}</p>
                                        {/* <p>备注：{item.OrderNote}</p> */}
                                    </div>
                                </Col>
                                {/* 地址选择 */}
                                <Col flex={200}>
                                    <Select
                                        style={{ width: 120 }}
                                        onChange={handleChange}
                                        options={addr}
                                    />
                                </Col>
                                {/* 单价 */}
                                <Col flex={1}>
                                    <h4>单价：￥{item.BookPrice}</h4>
                                    <Button style={{ marginTop: 2 }} onClick={() => removeCart(item.OrderID)}>删除</Button>
                                </Col>
                                {/* 支付按钮和数量输入框 */}
                                <Col flex={1}>
                                    <Form style={{ marginTop: 15, marginLeft: 20 }}>
                                        <Row>
                                            <InputNumber disabled size="middle" defaultValue={item.OrderNum} /></Row>
                                        <Row>
                                            <Button style={{ marginTop: 15, marginLeft: 10 }} type="primary"
                                                onClick={() => clickOrder(item.OrderID, item.BookID, item.OrderNote)}>支付</Button>
                                        </Row>
                                    </Form>
                                </Col>
                                <Col flex={100} justify="right">
                                </Col>
                                {/* 总额 */}
                                <Col flex={1}>
                                    <h4>总额：￥{item.TotalPrice}</h4>
                                </Col>
                            </Row>
                        </Card>
                        <Modal
                            open={open}
                            title="书籍详情"
                            onOk={handleOk}
                            onCancel={handleCancel}
                        >
                            <p>ISBN：{singleBookInfo["BookID"]}</p>
                            <p>书名：{singleBookInfo["BookName"]}</p>
                            <p>作者：{singleBookInfo["BookAuthor"]}</p>
                            <p>类别：{singleBookInfo["ClassName"]}</p>
                            <p>折扣数量：{singleBookInfo["DiscountNum"]}</p>
                            <p>折扣力度：{singleBookInfo["DiscountRate"]}</p>
                            <p>价格：{singleBookInfo["BookPrice"]}</p>
                            <p>销量：{singleBookInfo["BookSoldNum"]}</p>
                            <p>余量：{singleBookInfo["BookRemainNum"]}</p>
                            <p>上架时间：{singleBookInfo["BookShelfTime"]}</p>
                            <p>出版时间：{singleBookInfo["BookReleaseTime"]}</p>
                            <p>售卖状态：{singleBookInfo["BookActive"] ? "销售中" : "停售"}</p>
                            <p>简介：{singleBookInfo["BookNote"]}</p>
                        </Modal>
                    </>
                ))}
            </Space>
        </>
    )

}
import React, { useEffect, useState } from 'react';
import { Button, Space, Modal, Card, Tag, Popover, InputNumber, message } from 'antd';
import { OneBookApi, AddToCartApi, CertainClassBooksApi } from '../request/api';
import { FilePdfOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import Qs from 'qs'
const { Meta } = Card;

const items = [
    {
        label: '计算机科学',
        key: '9',
        icon: <FilePdfOutlined />,
    },
    {
        label: '哲学',
        key: '2',
        icon: <FilePdfOutlined />,
    },
    {
        label: '文学',
        key: '3',
        icon: <FilePdfOutlined />,
    },
    {
        label: '自然科学',
        key: '4',
        icon: <FilePdfOutlined />,
    },
];

export default function App() {
    const [messageApi, contextHolder] = message.useMessage();

    const [current, setCurrent] = useState('9');
    const onClick = (e) => {
        setCurrent(e.key);
        //更新展示的图书
        //调用后端获取图书的接口
        CertainClassBooksApi(Qs.stringify({
            ClassID: e.key
        })).then(res => {
            let temp = res;
            let a = [];
            let b = [];
            let c = [];
            let d = [];
            let e = [];
            temp.forEach((item, index) => {
                a.push(item["BookName"]);
                b.push(item["BookPrice"]);
                c.push(item["BookAuthor"]);
                d.push(item["ClassName"]);
                e.push(item["BookID"]);
            })
            setbookName(a);
            setprice(b);
            setauthor(c);
            setclasses(d);
            setbookID(e);
        })
    };

    const [tmpBookID, settmpBookID] = useState("")//供添加至购物车逻辑使用

    const [bookID, setbookID] = useState([])
    const [bookName, setbookName] = useState([])
    const [price, setprice] = useState([])
    const [author, setauthor] = useState([])
    const [classes, setclasses] = useState([])
    const [flagg, setflagg] = useState(true)

    useEffect(() => {
        if (flagg) {
            setflagg(false);
            //调用后端获取图书的接口
            CertainClassBooksApi(Qs.stringify({
                ClassID: current
            })).then(res => {
                let temp = res;
                let a = [];
                let b = [];
                let c = [];
                let d = [];
                let e = [];
                temp.forEach((item, index) => {
                    a.push(item["BookName"]);
                    b.push(item["BookPrice"]);
                    c.push(item["BookAuthor"]);
                    d.push(item["ClassName"]);
                    e.push(item["BookID"]);
                })
                setbookName(a);
                setprice(b);
                setauthor(c);
                setclasses(d);
                setbookID(e);
            })
        }
    });
    // 涉及弹出bookinfo对话框逻辑start
    const [open, setOpen] = useState(false);
    const [singleBookInfo, setsingleBookInfo] = useState([])
    const showInfo = (index) => {
        //获取单本书的详细数据
        OneBookApi(Qs.stringify({
            BookID: bookID[index]
        })).then(res => {
            setsingleBookInfo(res[0])
        })
        //显示弹出框
        setOpen(true);
    };
    const handleCancel = () => {
        setOpen(false);
    };
    // 涉及弹出bookinfo对话框逻辑end
    //InputNumber中的值
    const [purchaseNum, setpurchaseNum] = useState(1);
    //添加至购物车
    const addToCart = (BookID) => {
        AddToCartApi(Qs.stringify({
            BookID: tmpBookID,
            MemberID: localStorage.getItem("username"),
            OrderNum: purchaseNum
        })).then(res => {
            //提示支付成功
            message.success('添加成功，您还需要在 个人中心->购物车 中支付订单，本次订单共计' + res + '元');
        })
    }
    // 点击购物车弹出popover选择购买数量
    const [popoverOpen, setpopoverOpen] = useState(false);
    const handleOpenChange = (newOpen) => {
        setpopoverOpen(newOpen);
    };
    const popoverContent = (
        <div>
            <span>购买数量：</span><InputNumber size="large" min={1} defaultValue={1} onChange={(value) => setpurchaseNum(value)} />
            <br /><br />
            <Space size={30}>
                <Button onClick={() => setpopoverOpen(false)}>取消</Button>
                <Button type="primary" onClick={addToCart}>确认</Button>
            </Space>
        </div>
    );
    const [popoverOpen1, setpopoverOpen1] = useState(false);
    const handleOpenChange1 = (newOpen) => {
        setpopoverOpen1(newOpen);
    };
    const popoverContent1 = (
        <div>
            <span>购买数量：</span><InputNumber size="large" min={1} defaultValue={1} onChange={(value) => setpurchaseNum(value)} />
            <br /><br />
            <Space size={30}>
                <Button onClick={() => setpopoverOpen1(false)}>取消</Button>
                <Button type="primary" onClick={addToCart}>确认</Button>
            </Space>
        </div>
    );
    return (
        <>
            <div>
                <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
            </div>
            <Space size={[16, 16]} wrap >
                {bookName.map((_, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <Card hoverable={true}
                        style={{
                            width: 240,
                        }}
                        cover={
                            <img
                                alt="example"
                                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                            />
                        }
                        actions={[
                            <Popover content={popoverContent} trigger="click" open={popoverOpen} onOpenChange={handleOpenChange}>
                                <Button type="link" onClick={() => settmpBookID(bookID[index])}>+购物车</Button>
                            </Popover>
                            ,
                            <Button type="link" onClick={() => showInfo(index)}>详情</Button>,
                        ]}
                    >
                        <Meta
                            avatar={<div>
                                <span><b>{bookName[index]}</b></span>
                                <p>{author[index]}</p>
                            </div>}
                            title={<div>
                                <Tag color="magenta">{"" + classes[index]}</Tag>
                            </div>}
                            description={"" + price[index] + "元"}
                        />
                    </Card>
                ))}
            </Space>
            <Modal
                open={open}
                title="书籍详情"
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        返回
                    </Button>,
                    <Popover content={popoverContent1} trigger="click" open={popoverOpen1} onOpenChange={handleOpenChange1}>
                        <Button type="primary" onClick={() => settmpBookID(singleBookInfo["BookID"])}>添加至购物车</Button>
                    </Popover>
                ]}
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
    )
}
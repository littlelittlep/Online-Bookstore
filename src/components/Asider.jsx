import React, { useEffect, useState } from "react";
import { Menu } from 'antd';
import {
    AppstoreAddOutlined, SolutionOutlined, BookOutlined,
    CaretDownOutlined, UserOutlined, ShoppingCartOutlined,
    TransactionOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation } from "react-router-dom";


const items = [[
    {
        key: '1',
        icon: <BookOutlined />,
        label: '所有书籍',
    },
    {
        key: '2',
        icon: <AppstoreAddOutlined />,
        label: '分类书籍',
    },
    {
        key: '3',
        icon: <UserOutlined />,
        label: '个人中心',
        children: [
            {
                key: '4',
                icon: <ShoppingCartOutlined />,
                label: '购物车',
            },
            {
                key: '5',
                icon: <TransactionOutlined />,
                label: '我的订单',
            },
            {
                key: '6',
                icon: <SolutionOutlined />,
                label: '基本信息',
            },
        ]
    },
], [

]]


export default function Asider() {
    // const location = useLocation()
    const navigate = useNavigate()
    const auth = localStorage.getItem("auth");//获取用户类型，登录时已经本地存储 
    // let temp = items[auth][0].key
    // const [defaultkey, setdefaultkey] = useState(temp)
    // // setdefaultkey(temp)

    // useEffect(() => {
    //     let path = location.pathname
    //     path = path.slice(1, path.length)
    //     console.log(path)
    //     setdefaultkey(path)
    // }, [])
    // console.log(defaultkey)

    // const onClick = (e) => {
    //     // console.log(e.key)
    //     setdefaultkey(e.key)
    //     navigate('/' + e.key)
    // };
    const clickMenu = (e) => {
        console.log(e.key);
        if (e.key == 1) {
            navigate('/books')
        } else if (e.key == 2) {
            navigate('/book-classification')
        } else if (e.key == 4) {
            navigate('/order')
        } else if (e.key == 5) {
            navigate('/shopcar')
        } else if (e.key == 6) {
            navigate('/center')
        }
    }
    return (
        <Menu
            onClick={clickMenu}
            style={{
                width: 185,
                minHeight: 600
            }}
            className="aside"
            mode="inline"
            theme="dark"
            items={items[auth]}//0学生1教师2教务处
        // items={items[0]}//调试用
        />
    );
}
import React from 'react';
import { AppstoreAddOutlined, SolutionOutlined, BookOutlined, CaretDownOutlined, UserOutlined, ShoppingCartOutlined, TransactionOutlined } from '@ant-design/icons';
import { Layout, Menu, theme, Dropdown, Space, Divider, message } from 'antd';
import logoImg from '../assets/pic1.jpg';
import avatar from '../assets/defaultAvatar.png'
import { useNavigate } from 'react-router-dom'
import './less/Home.less'
import Books from './Books.jsx'
const { Header, Content, Sider } = Layout;

const items2 = [
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
]
const App = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const navigate = useNavigate()
    const logout = () => {
        localStorage.clear()            //清除数据
        message.success('退出成功，即将返回登录页')
        setTimeout(() => { navigate('/login') }, 500)
    }
    const itemDropdown = (
        <Menu
            items={[
                {
                    label: (
                        '修改资料'
                    ),
                },
                {
                    type: Divider
                },
                {
                    label: (
                        <span onClick={logout}>退出登录</span>
                    )

                },
            ]}
        />
    )
    const username = localStorage.getItem("username")
    const clickMenu = (e) => {
        console.log(e.key);
        if (e.key == 1) {
            navigate('/')
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
        <Layout>
            <header>
                <div className="logo">
                    <img src={logoImg} alt="" style={{ width: 150, height: 50 }} className="logoimg" />
                </div>
                <div className="right">
                    <Dropdown overlay={itemDropdown}>
                        <a onClick={e => e.preventDefault()}>
                            <Space>
                                <img src={avatar} alt="" style={{ height: 50 }} className="avatar" />
                                <span>{username}</span>
                                <CaretDownOutlined />
                            </Space>
                        </a>
                    </Dropdown>
                </div>
            </header>
            <Layout>
                <Sider
                    width={200}
                    style={{
                        background: colorBgContainer,
                    }}
                >
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{
                            height: '100%',
                            borderRight: 0,
                        }}
                        items={items2}
                        onClick={clickMenu}
                    />
                </Sider>
                <Layout
                    style={{
                        padding: '0 24px 24px',
                    }}
                >
                    <Content
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                            background: colorBgContainer,
                        }}
                    >
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};
export default App;
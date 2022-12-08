import React from 'react';
import { AppstoreAddOutlined, SolutionOutlined, BookOutlined, CaretDownOutlined, UserOutlined, ShoppingCartOutlined, TransactionOutlined } from '@ant-design/icons';
import { Layout, Menu, theme, Dropdown, Space, Divider, message } from 'antd';
import logoImg from '../assets/pic1.jpg';
import avatar from '../assets/defaultAvatar.png'
import { useNavigate } from 'react-router-dom'
import '../pages/less/Home.less'
import Books from '../pages/Books.jsx'
const { Header, Content, Sider } = Layout;

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

        </Layout>
    );
};
export default App;
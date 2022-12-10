import React from 'react';
import { AppstoreAddOutlined, SolutionOutlined, BookOutlined, CaretDownOutlined, UserOutlined, ShoppingCartOutlined, TransactionOutlined } from '@ant-design/icons';
import { Layout, Menu, theme, Dropdown, Space, Divider, message } from 'antd';
import logoImg from '../assets/logoko.png';
import avatar from '../assets/defaultAvatar.png'
import { useNavigate } from 'react-router-dom'
import '../pages/less/Home.less'
import Books from '../pages/Books.jsx'
import CenterForm from '../pages/Center'
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
    const modify=()=>{

        //message.success('退出成功，即将返回登录页')
        setTimeout(() => { navigate('/center') }, 500)
    }
    const itemDropdown = (
        <Menu
            items={[
                {
                    label: (
                        <span onClick={modify}>修改资料</span>
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
                    <img src={logoImg} alt=""  className="logoimg" />
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
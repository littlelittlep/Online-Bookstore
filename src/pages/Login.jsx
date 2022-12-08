import { React, useState } from 'react'
import Qs from 'qs'
import { Form, Input, Button, message } from 'antd';
import { LockOutlined, PhoneOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom'
import './less/login.less'

import { LoginApi } from '../request/api';

const logoImg = "http://coseu-nanjing.oss-cn-nanjing.aliyuncs.com/ses/logo.png"
export default function Login() {
    const navigate = useNavigate()
    const onFinish = (values) => {
        console.log(values.username);
        console.log(values.password);
        LoginApi(Qs.stringify({
            MemberID: values.username,
            Password: values.password,
        })).then(res => {
            //判断哪种类型
            //  手机号不存在->提示信息
            //  手机号存在但密码错误->提示错误
            //  成功->路由跳转
            if (res == "1") {
                message.success("登录成功！")
                localStorage.setItem("username", values.username)
                localStorage.setItem("auth", 0)//undone,鉴权
                //注册成功，跳转到首页
                setTimeout(() => {
                    navigate("/");
                }, 500)
            } else if (res == "0") {
                message.warning("用户不存在！请输入正确的手机号！")
            } else {
                message.error("密码错误！")
            }
        })
    };

    return (
        <div className="login">
            <div className="model">
                <div className='login_box'>
                    <img src={logoImg} alt="" />

                    <Form
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <Form.Item
                            name="username"

                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input placeholder="请输入手机号" prefix={<PhoneOutlined />} size='large' />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="请输入密码" size='large' />
                        </Form.Item>

                        <Form.Item>
                            <Link to="/register">还没账户？立即注册</Link>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" block size='large'>
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
}
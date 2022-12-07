import { React, useState } from 'react'
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom'
import './less/login.less'

import { LoginApi } from '../request/api';

const logoImg = "http://coseu-nanjing.oss-cn-nanjing.aliyuncs.com/ses/logo.png"
export default function Login() {

    const onFinish = (values) => {
        console.log(values.username);
        console.log(values.password);
        LoginApi({
            userId: values.username,
            userPassword: values.password,
        }).then(res => {
            // console.log(values.username);
            // console.log(res)

            // if (res.errorCode === 0) {
            //     message.success(res.message)
            //     //存储数据
            //     // localStorage.setItem('avatar', res.data.avatar)
            //     // localStorage.setItem('cms-token', res.data['cms-token'])
            //     // localStorage.setItem('editable', res.data.editable)
            //     localStorage.setItem('userId', res.data.userId)
            //     localStorage.setItem('userName', res.data.userName)
            //     let userType = res.data.userType
            //     if (userType === "学生") {
            //         localStorage.setItem('auth', 0)
            //     }
            //     if (userType === "教师") {
            //         localStorage.setItem('auth', 1)
            //     }
            //     if(userType === "教务处") {
            //         localStorage.setItem('auth', 2)
            //     }
            //     setTimeout(() => {
            //         if (userType === "学生")
            //             navigate('/list')
            //         if (userType === "教师")
            //             navigate('/teacher/list')
            //         if(userType === "教务处")
            //             navigate('/jwc/list')
            //     }, 500)
            // } else {
            //     message.error(res.message)
            // }
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
                            <Input placeholder="请输入用户名" prefix={<UserOutlined className="site-form-item-icon" />} size='large' />
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
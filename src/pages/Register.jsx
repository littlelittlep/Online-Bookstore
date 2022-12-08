import { React, useState } from 'react'
import Qs from 'qs'
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined, PhoneOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom'
import './less/login.less'
import { RegisterApi } from '../request/api';

const logoImg = "http://coseu-nanjing.oss-cn-nanjing.aliyuncs.com/ses/logo.png"
export default function Register() {

    const navigate = useNavigate()
    const onFinish = (values) => {
        // console.log('Success:', values);

        RegisterApi(Qs.stringify({
            MemberName: values.username,
            MemberID: values.phone,
            Password: values.password,
        })).then(res => {
            console.log(res)
            if (res == "1") {
                message.success("注册成功！")
                //注册成功，跳转到登录界面
                setTimeout(() => {
                    navigate("/login");
                }, 800)
            } else {
                //手机号已经存在
                message.error("手机号已经存在！")
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
                            rules={[{ required: true, message: '请输入用户名' }]}
                        >
                            <Input placeholder="请输入用户名" prefix={<UserOutlined className="site-form-item-icon" />} size='large' />
                        </Form.Item>

                        <Form.Item
                            name="phone"
                            rules={[{ required: true, message: '请输入手机号' }]}
                        >
                            <Input placeholder="请输入手机号" prefix={<PhoneOutlined />} size='large' />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: '请输入密码' }]}
                        >
                            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="请输入密码" size='large' />
                        </Form.Item>

                        <Form.Item
                            name="confirm"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: '请再次确认密码',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('请输入相同密码'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="请再次确认密码" size='large' />
                        </Form.Item>

                        <Form.Item>
                            <Link to="/login">已有账号？立即登录</Link>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" block size='large'>
                                注册
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
}
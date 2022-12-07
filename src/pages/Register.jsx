// import React from 'react'
// import { Form, Input, Button, message } from 'antd';
// import { UserOutlined, LockOutlined } from '@ant-design/icons';
// import { Link, useNavigate } from 'react-router-dom'
// import './less/login.less'
// import { RegisterApi } from '../request/api';

// const logoImg = "http://coseu-nanjing.oss-cn-nanjing.aliyuncs.com/ses/logo.png"
// export default function Register() {

//     const navigate = useNavigate()

//     const onFinish = (values) => {
//         console.log('Success:', values);
        
//         RegisterApi({
//             userName: values.username,
//             userPassword: values.password,
//             userType: '学生',
//             userId: values.username,
//             studentClass: '711201'
//         }).then(res => {
//             console.log(res)
//             if(res.errCode === 0){
//                 message.success(res.message);
//                 navigate('/login')
//             }else{
//                 message.error(res.message)
//             }
            
//         })
//     };


//     return (
//         <div className="login">
//             <div className="model">
//                 <div className='login_box'>
//                     <img src={logoImg} alt="" />
//                     <Form
//                         name="basic"
//                         initialValues={{ remember: true }}
//                         onFinish={onFinish}
//                         autoComplete="off"
//                     >
//                         <Form.Item
//                             name="username"

//                             rules={[{ required: true, message: '请输入用户名' }]}
//                         >
//                             <Input placeholder="请输入用户名" prefix={<UserOutlined className="site-form-item-icon" />} size='large' />
//                         </Form.Item>

//                         <Form.Item
//                             name="password"
//                             rules={[{ required: true, message: '请输入密码' }]}
//                         >
//                             <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="请输入密码" size='large' />
//                         </Form.Item>

//                         <Form.Item
//                             name="confirm"
//                             dependencies={['password']}
//                             hasFeedback
//                             rules={[
//                                 {
//                                     required: true,
//                                     message: '请再次确认密码',
//                                 },
//                                 ({ getFieldValue }) => ({
//                                     validator(_, value) {
//                                         if (!value || getFieldValue('password') === value) {
//                                             return Promise.resolve();
//                                         }
//                                         return Promise.reject(new Error('请输入相同密码'));
//                                     },
//                                 }),
//                             ]}
//                         >
//                             <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="请再次确认密码" size='large' />
//                         </Form.Item>

//                         <Form.Item>
//                             <Link to="/login">已有账号？立即登录</Link>
//                         </Form.Item>
//                         <Form.Item>
//                             <Button type="primary" htmlType="submit" block size='large'>
//                                 注册
//                             </Button>
//                         </Form.Item>
//                     </Form>
//                 </div>
//             </div>
//         </div>
//     )
// }
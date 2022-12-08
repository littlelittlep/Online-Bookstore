import React from 'react';
import { Button, Space, Avatar, Card } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
const { Meta } = Card;

const bookName = ["数据库原理", "计算机网络", "数据结构", "算法设计", "编译原理", "操作系统", "程序设计基础", "大数据处理", "云计算", "数据挖掘"]
const App = () => (
    <Space size={[16, 16]} wrap >
        {new Array(10).fill(null).map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Card
                style={{
                    width: 290,
                }}
                cover={
                    <img
                        alt="example"
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    />
                }
                actions={[
                    <SettingOutlined key="setting" />,
                    <EditOutlined key="edit" />,
                    <EllipsisOutlined key="ellipsis" />,
                ]}
            >
                <Meta
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                    title={bookName[index]}
                    description="This is the description"
                />
            </Card>
        ))}
    </Space>
);
export default App;
import React from 'react';
import { Button, Space, Avatar, Card } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined, DownloadOutlined} from '@ant-design/icons';
const { Meta } = Card;
const bookName = ["数据库原理","操作系统"]
const App = () => (
    <Space size={[16, 16]} wrap >
        {bookName.map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Card hoverable={true}
                style={{
                    width: 200,
                }}
                cover={
                    <img
                        alt="example"
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    />
                }
                actions={[
                    <Button type="link">购物车</Button>,
                    <Button type="link">详情</Button>,
                ]}
            >
                <Meta
                    // avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                    title={bookName[index]}
                    description="价格"
                />
            </Card>
        ))}
    </Space>
);
export default App;
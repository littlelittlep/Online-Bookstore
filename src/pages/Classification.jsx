import React,{useState} from 'react';
import { Button,Card,Space} from 'antd';
import { AppstoreOutlined,FilePdfOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
const {Meta} = Card;
const items = [
  {
    label: '计算机类',
    key: '1',
    icon: <FilePdfOutlined />,
  },
  {
    label: '哲学类',
    key: '2',
    icon: <FilePdfOutlined />,
  },
  {
    label: '文史类',
    key: '3',
    icon: <FilePdfOutlined />,
  },
  {
    label: '自然科学',
    key: '4',
    icon: <FilePdfOutlined />,
  },
];
const bookList=[{name:"数据库原理",price:"2"},{name:"数据库原理",price:"2"},{name:"数据库原理",price:"2"},{name:"数据库原理",price:"2"},{name:"数据库原理",price:"2"},{name:"数据库原理",price:"2"},{name:"数据库原理",price:"2"},{name:"数据库原理",price:"2"},{name:"数据库原理",price:"2"}];
const App = () => {
    const [current, setCurrent] = useState('mail');
    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };
    return (
        <div>
        <div>
            <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
        </div>
        <Space size={[16,16]} wrap style={{marginTop:20}}>
            {bookList.map((item, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <Card key={item.name} hoverable={true}
                    style={{
                        width: 220,
                        marginRight:5,
                        marginLeft:5,
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
                    <p style={{height:10,marginTop:-20}}>{item.name}</p>
                    <p style={{height:10}}>价格：￥{item.price}</p>
                </Card>
            ))}
        </Space>
        </div>
    )
};
export default App;
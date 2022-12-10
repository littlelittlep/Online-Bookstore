import React from 'react';
import { Button, Space,Card,Row,Col,Avatar, } from 'antd';
import { IeSquareFilled } from '@ant-design/icons';
const order = ["数据库原理","操作系统","hahha"];
const App = () => (
    order.map((_, index) =>(
            <Card hoverable="true" style={{marginBottom:20}}>
                <Row style={{height:100,backgroundColor:""}}>
                    {/* 商品图片 */}
                    <Col flex={1}>
                    <Avatar shape="square" size={100}
                            alt="example"
                            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                            style={{marginRight:5}}/>
                    </Col>
                    {/* 中间名字以及三个图标 */}
                    <Col>
                       <div style={{height:82,fontFamily:"微软雅黑",fontWeight:"bold"  }}>
                           物品名字
                       </div>
                       <div style={{height:10}}>
                           <span title="支持信用卡支付" >
                               <img src="//assets.alicdn.com/sys/common/icon/trade/xcard.png" style={{height:14}}></img>
                           </span>
                           <span  title="卖家承诺7天退换"  style={{marginLeft:3}} >
                               <img src="//img.alicdn.com/tps/i3/T1Vyl6FCBlXXaSQP_X-16-16.png" style={{height:15}}></img>
                           </span>
                           <span  title="卖家承诺如实描述"  style={{marginLeft:3}} hover>
                               <img src="//img.alicdn.com/tps/i4/T1BCidFrNlXXaSQP_X-16-16.png" style={{height:15}}></img>
                           </span>
                       </div>
                    </Col>
                    <Col flex={100} justify="right">
                    </Col>
                    <Col flex={1} justify="right">hhh
                    </Col>
                </Row>
            </Card>
    ))
    );
    export default App;
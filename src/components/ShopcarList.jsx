import React from 'react';
import { Button,Card,Row,Col,Avatar,InputNumber,Form} from 'antd';
const order = [{ID:"1",name:"数据库原理",price:"28"},{ID:"2",name:"操作系统",price:""}];
const clickOrder=(value)=>{
    console.log("666")
};
// const onChange = (value) => {
//     console.log('changed', value);
//     num=this.value;
//   };
const App = () => (
    order.map((item,index) =>(
        // items.map(item=>(
            <Card key={item.name} hoverable="true" style={{marginBottom:20}}>
                <Row style={{height:100,backgroundColor:""}}>
                    {/* 商品图片 */}
                    <Col flex={1}>
                    <Avatar shape="square" size={100}
                            alt="example"
                            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                            style={{marginRight:5}}/>
                    </Col>
                    {/* 中间名字以及三个图标 */}
                    <Col >
                       <div style={{height:65,fontFamily:"微软雅黑",fontWeight:"bold"  }}>
                            <h4>{item.name}</h4>
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
                    <Col flex={500}>
                    </Col>
                    <Col flex={1}>
                        <h4>单价：￥{item.price}</h4>
                    </Col>
                    <Col flex={1}>
                            <Form style={{marginTop:15,marginLeft:20}}>
                                <Row>
                                <InputNumber size="middle" min={1} max={100000} defaultValue={1}/></Row>
                                <Row>
                                <Button style={{marginTop:15,marginLeft:10}} onclick={clickOrder(item.ID)}>下单</Button></Row>
                            </Form>
                    </Col>
                    <Col flex={100} justify="right">
                    </Col>
                    <Col flex={1}>
                        <h4>总额：￥{item.price}</h4>
                    </Col>
                </Row>
            </Card>
    ))
    );
    export default App;
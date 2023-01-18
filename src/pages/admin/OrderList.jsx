import React, { useEffect, useState,useRef }  from 'react';
import { Table,Button,message } from 'antd';
import {GetAllOrdersApi,DeleteOrderApi} from '../../request/api';
import { InfoCircleFilled } from '@ant-design/icons';
import Qs from 'qs'
export default function App() {
    //表格数据
    const [tableData,setTableData]=useState();
    const columns = [
        {
            title: '订单ID',
            dataIndex: 'OrderID',
            key: 'OrderID',
            width: '9%',
        },
        {
            title: '书籍ID',
            dataIndex: 'BookID',
            key: 'BookID',
            width: '15%'
        },
        {
            title: '用户ID',
            dataIndex: 'MemberID',
            key: 'MemberID',
            width: '8%'
        },
        {
            title: '数量',
            dataIndex: 'OrderNum',
            key: 'OrderNumber',
            width: '8%',
        },
        {
            title: '下单时间',
            dataIndex: 'OrderTime',
            key: 'OrderTime',
            width: '15%',
        },
        {
            title: '状态',
            dataIndex: 'OrderState',
            key: 'OrderState',
            width: '8%',
        },
        {
            title: '总价',
            dataIndex: 'TotalPrice',
            key: 'TotalPrice',
            width: '8%',
        },
        {
            title: '备注',
            dataIndex: 'OrderNote',
            key: 'OrderNote',
            width: '15%'
        },
        {
            title: '地址',
            dataIndex: 'Address',
            key: 'Address',
            width: '8%'
        },
        {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            width: 150,
            render: (text,record) =>{
                return (<a onClick={()=>handleDelete(record.OrderID)}> 删除订单 </a>)
            },
        },
    ];
    //删除订单的函数
    const handleDelete=(orderid)=>{
        DeleteOrderApi(Qs.stringify({
            OrderID:orderid
        })).then(()=>{
            message.success("订单取消成功！");
            const newData = tableData.filter((item) => item.OrderID !== orderid);
            setTableData(newData);
        })
    }
    //加载页面时返回表格数据
    useEffect(()=>{
        GetAllOrdersApi().then(res => {
            if(res){
                setTableData(res);
            }
        })
    },[]);
    return (    
        <>
            <Table
            columns={columns}
            dataSource={tableData}
            scroll={{
                x: 1000,
            }}
        />
        </>
    )
}
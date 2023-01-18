import React, { useEffect, useState,useRef }  from 'react';
import { Table,Button,message } from 'antd';
import {GetAllUsersApi} from '../../request/api';
const columns = [
    {
        title: '用户ID',
        dataIndex: 'MemberID',
        key: 'MemberID',
    },
    {
        title: '密码',
        dataIndex: 'Password',
        key: 'Password',
    },
    {
        title: '用户名',
        dataIndex: 'MemberName',
        key: 'MemberName',
    },
    {
        title: '账户余额',
        dataIndex: 'Balance',
        key: 'Balance',
    },
    {
        title: '是否为管理员',
        dataIndex: 'IsManager',
        key: 'IsManager',  
        render: (text,record,index) =>[
            record.IsManager?<span>是</span>:<span>否</span>
        ],
    }
];
export default function App() {
    const [tableData,setTableData]=useState();
    useEffect(()=>{
        //返回表格数据
        GetAllUsersApi().then(res => {
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
            }}>
            </Table>
        </>
    )
}
import React from 'react';
import { Table } from 'antd';
const columns = [
    {
        title: 'ISBN',
        dataIndex: 'BookID',
        key: 'BookID',
    },
    {
        title: '书名',
        dataIndex: 'BookName',
        key: 'BookName',
    },
    {
        title: '作者',
        dataIndex: 'BookAuthor',
        key: 'BookAuthor',
    },
    {
        title: '类别',
        dataIndex: 'ClassName',
        key: 'ClassName',
    },
    {
        title: '单价',
        dataIndex: 'BookPrice',
        key: 'BookPrice',
    },
    {
        title: '销售量',
        dataIndex: 'BookSoldNum',
        key: 'BookSoldNum',
    },
    {
        title: '库存',
        dataIndex: 'BookRemainNum',
        key: 'BookRemainNum',
    },
    {
        title: '上架时间',
        dataIndex: 'BookShelfTime',
        key: 'BookShelfTime',
    },
    {
        title: '出版时间',
        dataIndex: 'BookReleaseTime',
        key: 'BookReleaseTime',
    },
    {
        title: '状态',
        dataIndex: 'BookActive',
        key: 'BookActive',
    },
    {
        title: '简介',
        dataIndex: 'BookNote',
        key: 'BookNote',
    },
    {
        title: '操作',
        key: 'operation',
        fixed: 'right',
        width: 100,
        render: () => <a>删除</a>,
    },
];
const data = [
    {
        BookID: "ISBN 978-...",
        BookName: "数据库系统教程",
        BookAuthor: "王能斌",
        ClassName: "计算机",
        BookPrice: "34",
        BookSoldNum: "500",
        BookRemainNum: "205",
        BookShelfTime: "2014-2",
        BookReleaseTime: "2008-5",
        BookActive: "1",
        BookNote: "good"
    },
    {
        BookID: "ISBN 979-...",
        BookName: "数据仓库",
        BookAuthor: "徐立臻",
        ClassName: "计算机",
        BookPrice: "34",
        BookSoldNum: "500",
        BookRemainNum: "205",
        BookShelfTime: "2014-2",
        BookReleaseTime: "2008-5",
        BookActive: "1",
        BookNote: "good"
    },
];
const App = () => (
    <Table
        columns={columns}
        dataSource={data}
        scroll={{
            x: 1300,
        }}
    />
);
export default App;
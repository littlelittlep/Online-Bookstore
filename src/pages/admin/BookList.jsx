import React, { useEffect, useState, useRef, useContext } from 'react';
import { Table, Button, message, Modal, Input, Form, Col, Row, Switch, Space, Popover } from 'antd';
import { AllBooksApi, AddBookApi, DeleteBookApi, UpdateRemainApi } from '../../request/api';
import Qs from 'qs'

const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
    console.log("toggle " + record[dataIndex])
  };
  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log('保存失败', errInfo);
    }
  };
  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} 不为空.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};

//表单布局
const layout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 17,
  },
};
export default function App() {
  //表格数据
  const [tableData, setTableData] = useState();
  //modal状态
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  //表格列
  const defaultColumns = [
    {
      title: 'ISBN',
      dataIndex: 'BookID',
      key: 'BookID',
      width: '7%',
    },
    {
      title: '书名',
      dataIndex: 'BookName',
      key: 'BookName',
      width: '13%'
    },
    {
      title: '作者',
      dataIndex: 'BookAuthor',
      key: 'BookAuthor',
      width: '8%'
    },
    {
      title: '类别',
      dataIndex: 'ClassName',
      key: 'ClassName',
      width: '8%',
    },
    {
      title: '单价',
      dataIndex: 'BookPrice',
      width: '5%',
      key: 'BookPrice',
    },
    {
      title: '销售量',
      dataIndex: 'BookSoldNum',
      key: 'BookSoldNum',
      width: '8%'
    },
    {
      title: '库存',
      dataIndex: 'BookRemainNum',
      key: 'BookRemainNum',
      width: '8%',
      editable: true,
    },
    {
      title: '上架时间',
      dataIndex: 'BookShelfTime',
      key: 'BookShelfTime',
      width: '10%'
    },
    {
      title: '出版时间',
      dataIndex: 'BookReleaseTime',
      key: 'BookReleaseTime',
      width: '10%'
    },
    {
      title: '状态',
      dataIndex: 'BookActive',
      key: 'BookActive',
      width: '6%'
    },
    {
      title: '简介',
      dataIndex: 'BookNote',
      key: 'BookNote',
      width: '8%'
    },
    {
      title: '操作',
      key: 'operation',
      fixed: 'right',
      width: '8%',
      render: (text, record) => {
        return (<Space>
          <a onClick={() => handleDelete(record.BookID)}>删除</a>
          {/* <Popover
                  title={content(record.BookID,record.BookRemainNum)}
                  icon={false}
                  trigger="click"
                  open={open}
              >
                  <a >增加库存</a>
              </Popover> */}
          {/* <a onClick={()=>addRemain(record.BookID,record.BookRemainNum,record.BookRemainNum)}>增加库存</a> */}
        </Space>
        )
      },
    },
  ];
  const handleSave = (row) => {
    const newData = [...tableData];
    const index = newData.findIndex((item) => row.BookID === item.BookID);
    const item = newData[index];
    item.BookRemainNum = parseInt(item.BookRemainNum) + parseInt(row.BookRemainNum);
    item.BookRemainNum = item.BookRemainNum.toString();
    newData.splice(index, 1, {
      ...item,
      // ...row,
    });
    setTableData(newData);
    UpdateRemainApi(Qs.stringify({
      BookID: row.BookID,
      AddNumber: row.BookRemainNum
    })).then(() => {
      message.success('库存添加成功!');
    })
  };
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave
      }),
    };
  });

  //删除图书
  const handleDelete = (bookid) => {
    DeleteBookApi(Qs.stringify({
      BookID: bookid
    })).then(() => {
      message.success("删除图书成功！");
      const newData = tableData.filter((item) => item.BookID !== bookid);
      setTableData(newData);
    })
  }
  //添加图书按钮 表单设置可见
  const dealAdd = () => {
    setVisible(true);
  }
  //填写表单添加图书
  const addBook = (values) => {
    AddBookApi(Qs.stringify({
      BookID: values.BookID,
      BookName: values.BookName,
      BookAuthor: values.BookAuthor,
      ClassID: values.ClassID,
      BookPrice: values.BookPrice,
      BookSoldNum: values.BookSoldNum,
      BookRemainNum: values.BookRemainNum,
      BookShelfTime: values.BookShelfTime,
      BookReleaseTime: values.BookReleaseTime,
      BookActive: values.BookActive === "close" ? true : false,
      BookPicture: values.BookPicture,
      BookNote: values.BookNote
    })).then(() => {
      message.success("图书添加成功！页面2秒后将自动更新！");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    })
    setVisible(false);
    form.resetFields();
  }
  //关闭表单
  const close = () => {
    setVisible(false);
    form.resetFields();
  }
  //加载图书表格数据
  useEffect(() => {
    AllBooksApi().then(res => {
      if (res) {
        setTableData(res);
      }
    })
  }, []);
  return (
    <>
      <Button type="primary" style={{ margin: 5 }} onClick={dealAdd}> 增加图书 </Button>
      <Table
        columns={columns}
        dataSource={tableData}
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        scroll={{
          x: 1000,
        }}
      />
      <Modal title="添加书籍"
        visible={visible}
        onCancel={close}
        footer={null}
      >
        <Form   {...layout}
          name="添加书籍"
          initialValues={{
            remember: true,
          }}
          form={form}
          onFinish={addBook}
        // onFinishFailed={close}
        >
          <Form.Item
            label="书籍ID"
            name="BookID"
            rules={[
              {
                required: true,
                message: '请输入书籍ID',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="书名"
            name="BookName"
            rules={[
              {
                required: true,
                message: '请输入书籍名字',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="作者"
            name="BookAuthor"
            rules={[
              {
                required: true,
                message: '请输入书籍作者',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="类别"
            name="ClassID"
            rules={[
              {
                required: true,
                message: '请输入书籍类别',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="单价"
            name="BookPrice"
            rules={[
              {
                required: true,
                message: '请输入书籍单价',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="卖出数量"
            name="BookSoldNum"
            rules={[
              {
                required: true,
                message: '请输入书籍卖出的数量',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="库存"
            name="BookRemainNum"
            rules={[
              {
                required: true,
                message: '请输入书籍库存',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="上架时间"
            name="BookShelfTime"
            rules={[
              {
                required: true,
                message: '请输入书籍上架时间',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="发行时间"
            name="BookReleaseTime"
            rules={[
              {
                required: true,
                message: '请输入书籍发行的时间',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="书籍状态"
            name="BookActive"
            valuePropName="checked"
            initialValue="close"
          >
            <Switch />
          </Form.Item>
          <Form.Item
            label="封面"
            name="BookPicture"
            rules={[
              {
                required: true,
                message: '请上传书籍的封面',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='备注'
            name="BookNote"
          >
            <Input />
          </Form.Item>
          <Form.Item >
            <Row >
              <Col style={{ margin: '0% 40% 0% 40%' }}>
                <Button type="primary" htmlType="submit">
                  确认
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
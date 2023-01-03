import request from './request'

// 注册
export const RegisterApi = (params) => request.post('/register', params)
// 登录
export const LoginApi = (params) => request.post('/login', params)
//查询所有图书
export const AllBooksApi = (params) => request.post('/inventory/allBooks', params)
//查询单本书的详细数据
export const OneBookApi = (params) => request.post('/inventory/oneBook', params)
//添加至购物车
export const AddToCartApi = (params) => request.post('/order/addToCart', params)
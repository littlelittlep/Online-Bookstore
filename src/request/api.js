import request from './request'

// 注册
export const RegisterApi = (params) => request.post('/register', params)
// 登录
export const LoginApi = (params) => request.post('/login', params)
//查询所有图书
export const AllBooksApi = (params) => request.post('/inventory/allBooks', params)
//查询某类图书
export const CertainClassBooksApi = (params) => request.post('/inventory/certainClassBooks', params)
//查询单本书的详细数据
export const OneBookApi = (params) => request.post('/inventory/oneBook', params)
//添加至购物车
export const AddToCartApi = (params) => request.post('/order/addToCart', params)
//查询我的购物车
export const GetCartsApi = (params) => request.post('/order/getCarts', params)
//支付
export const PurchaseApi = (params) => request.post('/order/purchase', params)
//查询我的订单
export const MyOrdersApi = (params) => request.post('/order/myOrders', params)
//取消订单
export const CancelOrderApi = (params) => request.post('/order/cancelOrder', params)
//移除购物车
export const RemoveFromCartApi = (params) => request.post('/order/removeFromCart', params)
//查询我的所有地址
export const MyAddressApi = (params) => request.post('/myAddress', params)
//删除地址
export const DeleteAddrApi = (params) => request.post('/deleteAddr', params)
//增加地址
export const AddAddrApi = (params) => request.post('/addAddr', params)
//查询用户余额
export const UserInfoApi = (params) => request.post('/userInfo', params)
//余额充值
export const UpdateUserInfoApi = (params) => request.post('/updateUserInfo', params)
import Login from '../pages/Login'
import Register from '../pages/Register'
import Home from "../pages/Home"
import Classification from "../pages/Classification"
import Order from "../pages/Order"
import Shopcar from "../pages/Shopcar"
import Center from "../pages/Center"
import UserList from "../pages/UserList"
import BookList from "../pages/BookList"
import OrderList from "../pages/OrderList"


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const BaseRouter = () => (
    <Router>
        <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/register' element={<Register />}></Route>
            <Route path='/book-classification' element={<Classification />}></Route>
            <Route path='/order' element={<Order />}></Route>
            <Route path='/shopcar' element={<Shopcar />}></Route>
            <Route path='/center' element={<Center />}></Route>
            <Route path='/admin'>
                <Route path='/admin/user-list' element={<UserList />} />
                <Route path='/admin/book-list' element={<BookList />} />
                <Route path='/admin/order-list' element={<OrderList />} />
            </Route>
        </Routes>
    </Router>
)

export default BaseRouter
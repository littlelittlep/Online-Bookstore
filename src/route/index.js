import Login from '../pages/Login'
import Register from '../pages/Register'
import Home from "../pages/Home"
import Classification from "../pages/Classification"
import Order from "../pages/Order"
import Shopcar from "../pages/Shopcar"
import Center from "../pages/Center"
import UserList from "../pages/admin/UserList"
import BookList from "../pages/admin/BookList"
import OrderList from "../pages/admin/OrderList"
import Books from "../pages/Books"
import App from '../App.jsx'


// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// const BaseRouter = () => (
//     <Router>
//         <Routes>
//             <Route path='/' element={<Home />}></Route>
//             <Route path='/login' element={<Login />}></Route>
//             <Route path='/register' element={<Register />}></Route>
//             <Route path='/book-classification' element={<Classification />}></Route>
//             <Route path='/order' element={<Order />}></Route>
//             <Route path='/shopcar' element={<Shopcar />}></Route>
//             <Route path='/center' element={<Center />}></Route>
//             <Route path='/admin'>
//                 <Route path='/admin/user-list' element={<UserList />} />
//                 <Route path='/admin/book-list' element={<BookList />} />
//                 <Route path='/admin/order-list' element={<OrderList />} />
//             </Route>
//         </Routes>
//     </Router>
// )

// export default BaseRouter


import * as React from "react";
import * as ReactDOM from "react-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import RouterProvider from "react-router-dom";


const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "books",
                element: <Books />,
            },
            {
                path: "book-classification",
                element: <Classification />,
            },
            {
                path: "order",
                element: <Order />,
            },
            {
                path: "shopcar",
                element: <Shopcar />,
            },
            {
                path: "center",
                element: <Center />,
            },
        ],
    },
    {
        path: "/admin",
        element: <App />,
        children: [
            {
                path: "user-list",
                element: <UserList />,
            },
            {
                path: "book-list",
                element: <BookList />,
            },
            {
                path: "order-list",
                element: <OrderList />,
            },
        ],
    }
])


ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);

export default router
// export default class routers extends React.Component { router }
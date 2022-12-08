// import React from "react";
// import './assets/base.less'
// // import Header from "./components/Header";

// export default function App() {
//     return (
//         <div id="app">
//             {/* <Header />

//             <footer>Respect Copyright © seu</footer> */}
//         </div>
//     )
// }
import React from "react";
import './assets/base.less'
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Asider from "./components/Asider";

export default function App() {
    return (
        <div id="app">
            <Header />
            <div className="container">
                <Asider />
                <div className="container_box">
                    <div className="container_content">
                        <Outlet />
                    </div>
                </div>
            </div>
            <footer>Respect Copyright © seu</footer>
        </div>

    )
}
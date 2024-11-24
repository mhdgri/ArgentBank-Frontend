import React from "react";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { Outlet } from "react-router";
import "./assets/css/main.css";

const App = () => {
    return (
        
        <body>
            <NavBar />
            <Outlet />
            <Footer />
        </body>
    );
};

export default App;

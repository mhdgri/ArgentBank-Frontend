import React from "react";
import { Outlet } from "react-router";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import "./assets/css/main.css";

const App = () => {

    return (
        <>
            <NavBar />
            <Outlet />
            <Footer />
        </>
    );
};

export default App;

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { fetchProfile } from "./store/authSlice";
import useAuth from "./hooks/useAuth";

import "./assets/css/main.css";

const App = () => {
    const dispatch = useDispatch();
    const { isAuthenticated, user, token } = useAuth();

    useEffect(() => {
        if (isAuthenticated && token && !user) {
            dispatch(fetchProfile());
        }
    }, [isAuthenticated, token, user, dispatch]);

    return (
        <>
            <NavBar />
            <Outlet />
            <Footer />
        </>
    );
};

export default App;

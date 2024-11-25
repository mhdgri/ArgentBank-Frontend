import React, { useEffect } from "react";
import { Navigate } from "react-router";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";

const SignOut = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(logout());
    }, [dispatch]);

    return <Navigate to="/" />;
};

export default SignOut;

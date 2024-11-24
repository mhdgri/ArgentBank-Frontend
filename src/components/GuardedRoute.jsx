import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const GuardedRoute = ({ children }) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to="/sign-in" />;
    }

    return children;
};

export default GuardedRoute;
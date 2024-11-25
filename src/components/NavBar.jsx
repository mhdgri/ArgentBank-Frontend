import React from "react";
import { NavLink } from "react-router";
import useAuth from "../hooks/useAuth";

import Logo from "../assets/img/argentBankLogo.png";

const AuthenticatedLinks = ({ user }) => {
    return (
        <div>
            <NavLink className="main-nav-item" to="/user">
                <i className="fa fa-user-circle"></i>
                {user.userName}
            </NavLink>

            <NavLink className="main-nav-item" to="/sign-out">
                <i className="fa fa-sign-out"></i>
                Sign Out
            </NavLink>
        </div>
    );
};

const NavBar = () => {
    const { isAuthenticated, user } = useAuth();

    return (
        <nav className="main-nav">
            <NavLink className="main-nav-logo" to="/" end>
                <img className="main-nav-logo-image" src={Logo} alt="Argent Bank Logo" />
                <h1 className="sr-only">Argent Bank</h1>
            </NavLink>
            <div>
                {isAuthenticated && user ? (
                    <AuthenticatedLinks user={user} />
                ) : (
                    <NavLink className="main-nav-item" to="/sign-in">
                        <i className="fa fa-user-circle"></i>
                        Sign In
                    </NavLink>
                )}
            </div>
        </nav>
    );
};

export default NavBar;

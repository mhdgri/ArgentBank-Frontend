import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import { login } from "../store/authSlice";
import InputWrapper from "../components/InputWrapper";
import ErrorMessage from "../components/ErrorMessage";


const SignInPage = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, password } = e.target.elements;
        const rememberMe = e.target.elements["remember-me"];
        
      try {
            const resultAction = await dispatch(login({ email: username.value, password: password.value, rememberMe: rememberMe.checked }));
            if (login.fulfilled.match(resultAction)) {
                navigate("/user");
            } else {
                setErrorMessage(resultAction.payload || "Failed to sign in");
            }
        } catch (err) {
            setErrorMessage("Failed to sign in");
        }
    };

    return (
        <main className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <InputWrapper label="Username" type="text" id="username" />
                    <InputWrapper label="Password" type="password" id="password" />

                    <ErrorMessage message={errorMessage} />

                    <div className="input-remember">
                        <input type="checkbox" id="remember-me" />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    <button className="sign-in-button">Sign In</button>
                </form>
            </section>
        </main>
    );
};

export default SignInPage;

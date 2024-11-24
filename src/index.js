import React from "react";
import ReactDOM from "react-dom/client";
import AppLayout from "./AppLayout";
import { BrowserRouter, Routes, Route } from "react-router";
import SignInPage from "./pages/SignIn";
import MainPage from "./pages/Main";
import UserPage from "./pages/User";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<AppLayout />}>
                <Route index element={<MainPage />} />
                <Route path="sign-in" element={<SignInPage />} />
                <Route path="user" element={<UserPage />} />
            </Route>
        </Routes>
    </BrowserRouter>
);

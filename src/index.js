import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { Provider } from "react-redux";

import AppLayout from "./AppLayout";
import SignInPage from "./pages/SignIn";
import MainPage from "./pages/Main";
import UserPage from "./pages/User";
import GuardedRoute from "./components/GuardedRoute";
import { store } from "./store/index";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <Routes>
                <Route path="/" element={<AppLayout />}>
                    <Route index element={<MainPage />} />
                    <Route path="sign-in" element={<SignInPage />} />

                    <Route
                        path="user"
                        element={
                            <GuardedRoute>
                                <UserPage />
                            </GuardedRoute>
                        }
                    />
                </Route>
            </Routes>
        </Provider>
    </BrowserRouter>
);

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import AppLayout from "./AppLayout";
import SignInPage from "./pages/SignIn";
import MainPage from "./pages/Main";
import UserPage from "./pages/User";
import GuardedRoute from "./components/GuardedRoute";
import { store, persistor } from "./store/index";
import "font-awesome/css/font-awesome.min.css";
import SignOut from "./pages/SignOut";

const root = ReactDOM.createRoot(document.getElementById("root"));

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<AppLayout />}>
                <Route index element={<MainPage />} />
                <Route path="sign-in" element={<SignInPage />} />

                <Route path="sign-out" element={<SignOut />} />

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
    );
};

root.render(
    <BrowserRouter>
        <Provider store={store}>
            {/* 
                Utilise le composant PersistGate pour attendre que le store soit prêt avant de faire le rendu l'application.
            */}
            <PersistGate persistor={persistor}>
                <AppRoutes />
            </PersistGate>
        </Provider>
    </BrowserRouter>
);

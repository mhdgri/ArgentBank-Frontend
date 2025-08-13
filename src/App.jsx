import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar/index";
import Footer from "./components/Footer/index";
import "./assets/css/main.css";
import React, { useEffect } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import { useDispatch } from "react-redux";
import { checkAuthStatus } from "./redux/authSlice";

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

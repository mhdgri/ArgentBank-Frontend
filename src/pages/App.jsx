import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "../assets/css/main.css"
import Home from "./Home"
import Login from "./Login"
import Profile from "./Profile"
import Footer from "../components/footer"
import Navbar from "../components/navbar"


function App() {

  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>

      <Footer />
    </Router>
  )
}

export default App

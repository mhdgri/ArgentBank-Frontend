import React, { useState } from "react";
import InputField from "../../components/InputField";
import { useNavigate } from "react-router-dom";
import Profile from "../Profile";

function Login() {
  const navigate = useNavigate()
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/Profile')
  }
  console.log(handleSubmit)

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit} >
          <InputField 
            label="Username"
            id="username"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value) }
           />
          <InputField
            label="Password"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value) }
          />
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button
            type="submit"
            className="sign-in-button"
          >
            Sign In
          </button>
        </form>
      </section>
    </main>
  );
}

export default Login;
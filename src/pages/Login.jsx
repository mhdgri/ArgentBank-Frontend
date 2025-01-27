import { useState } from "react";
import InputField from "../components/InputField";
import RememberMeCheckBox from "../components/RememberMeCheckBox";

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
    
  const handleSubmit = (e) => {
    e.preventDefault()

    console.log('Username:', username);
    console.log('Password:', password);
    console.log('RememberMe:', rememberMe);
  }


    return (
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <InputField 
              label="username"
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <InputField 
              label="password"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <RememberMeCheckBox
              type="checkbox"
              id="remember-me"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <button type="submit" className="sign-in-button">
              Sign In
            </button>
          </form>
        </section>
      </main>
    );
  }

  export default Login
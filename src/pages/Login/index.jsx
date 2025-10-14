import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/main.css";
import InputField from "../../components/InputField";
import RememberMeCheckBox from "../../components/RememberMeCheckBox";
import { useSelector, useDispatch } from "react-redux";
import { clearError, loginUser } from "../../redux/authSlice";

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isLoading, error, isAuthenticated } = useSelector((state) => state.auth)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!email || !password) {
      return 
    }

    dispatch(loginUser({ email, password}))
  };

  const handleCloseError = () => {
    dispatch(clearError())
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile');
    }
  }, [isAuthenticated, navigate]);

  return (
    <main className="main bg-dark" style={{padding: "50px 0 300px 0"}}>
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon" />
        <h1>Sign In</h1>
        {error && (
          <div style={{
            color: "#721c24",
            marginBottom: "1rem",
            textAlign: "center",
            padding: "12px 16px",
            backgroundColor: '#f8d7da',
            border: "1px solid #f5c6cb",
            borderRadius: "4px",
            positionAbsolute: "relative"
          }}>
            {error}
            <button
              onClick={handleCloseError}
              style={{
                position: "absolute",
                right: "8px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                fontSize: "18px",
                cursor: "pointer",
                color: "#721c24" 
              }}
            >
              X
            </button>
          </div>

        )
        }
        <form onSubmit={handleSubmit}>
          <InputField
            label="Username"
            id="username"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            label="Password"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <RememberMeCheckBox
            label="Remember me"
            id="remember-me"
            type="checkbox"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />
          <button type="submit" className="sign-in-button" disabled={isLoading || !email || !password}>
            {isLoading ? 'Connexion...' : 'Sign In'}
          </button>
        </form>
        {isAuthenticated && (
          <p style={{ color: 'green', marginTop: '1rem' }}>
            Connexion réussie ! 🎉
          </p>
        )}
      </section>
    </main>
  );
}
export default Login;
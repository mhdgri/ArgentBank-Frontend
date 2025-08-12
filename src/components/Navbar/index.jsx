import { Link } from "react-router-dom";
import "../../assets/css/main.css";
import argentBank from "../../assets/img/argentBankLogo.png"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/authSlice"

function Navbar() {
  const navigate = useNavigate()

  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleSignOut = () => {
    dispatch(logout());
    console.log('Clic sur déconnexion !');

    navigate('/');
  };

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={argentBank}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {isAuthenticated ? (
          <>
            <Link className="main-nav-item" to="/profile">
              <i className="fa fa-user-circle"></i>
              User
            </Link>
            <button 
              className="main-nav-item"
              onClick={handleSignOut}
              style={{
                background: 'none',
                border: 'none',
                color: '#2c3e50',
                fontWeight: 'bold',
                cursor: 'pointer',
                textDecoration: 'none',
                marginRight: '0.5rem'
              }}
              onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
              onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
            >
              <i className="fa fa-sign-out"></i>
              Sign Out
            </button>
          </>
        ) : (
          <Link className="main-nav-item" to="/login">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;


import { Link } from "react-router-dom"
import "../../assets/css/main.css"

function Navbar() {
  return (
    <div>
        <nav className="main-nav">
            <Link className="main-nav-logo" to="/">
                <img
                    className="main-nav-logo-image"
                    src="/assets/img/argentBankLogo.png"
                    alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
        <div>
          <Link className="main-nav-item" to="/login">
            <i className="fa fa-user-circle"></i> Sign In
          </Link>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
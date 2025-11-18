import { Link, useNavigate } from "react-router-dom";
import { URL } from "@/shared/constants/URL";
import { isAuthenticated, logout, getUser } from "@/shared/utils/auth";
import "./Header.css";

function Header() {
  const navigate = useNavigate();
  const isLoggedIn = isAuthenticated();
  const user = getUser();

  const handleLogout = () => {
    logout();
    navigate(URL.LOGIN);
  };

  const handleLogin = () => {
    navigate(URL.LOGIN);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to={URL.HOME}>
            <h1>React Template</h1>
          </Link>
        </div>

        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to={URL.HOME} className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to={URL.ABOUT} className="nav-link">
                About
              </Link>
            </li>
          </ul>
        </nav>

        <div className="auth-section">
          {isLoggedIn ? (
            <div className="user-info">
              <span className="user-name">
                {user?.name || user?.username}
              </span>
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </div>
          ) : (
            <button onClick={handleLogin} className="login-button">
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
